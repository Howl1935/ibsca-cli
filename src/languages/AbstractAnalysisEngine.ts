#!/usr/bin/env node
import spawn from "cross-spawn";
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
import {
  red,
  white,
  blue,
  yellow,
} from "../utils/cli/textColors";

/** Abstract class representing the base form of tested languages */
export abstract class AbstractAnalysisEngine {
  fileName: string;
  pkgData: any;
  //abstract getCommandList(check:string): any;
  // abstract editConfig(fileName:string): any;

  constructor(fileName: string, packages: any) {
    this.fileName = fileName;
    this.pkgData = packages;
  }

  async validate() {
    const vls = "validate";
    const { configType, pkg } = this.pkgData[vls].data;
    const validate = this.pkgData[vls].commands;

    if (this.pkgData[vls]) {
      // check if there is a config to edit, otherwise this is a direct command line run.
      if (configType !== '') {
        this.editConfig(vls);
      }
      blue(
        `🗼 Validating ${this.fileName} with ${pkg}. It will take a while, please wait...`
      );
      for (let i = 0; i < validate.length; i++) {
        const { status, stdout } = spawn.sync(
          validate[i].command,
          validate[i].args,
          { stdio: "inherit" }
        );
        if (status !== 0) {
          continue;
        }
      }
    } else {
      blue(`🗼 Validating... No plugin installed...\n`)
    }
  }
  async lint() {
    const vls = "lint";
    const { configType, pkg } = this.pkgData[vls].data;
    const lint = this.pkgData[vls].commands;

    if (this.pkgData[vls]) {
      // check if there is a config to edit, otherwise this is a direct command line run.
      if (configType !== '') {
        this.editConfig(vls);
      }
      blue(
        `🗼 Linting ${this.fileName} with ${pkg}. It will take a while, please wait...`
      );

      for (let i = 0; i < lint.length; i++) {
        const { status, stdout } = spawn.sync(lint[i].command, lint[i].args, {
          stdio: "inherit",
        });
        if (status !== 0) {
          continue;
        }
      }
    } else {
      blue(`🗼 Linting... No plugin installed...\n`)
    }
  }

  // This function is passed a list of objects which are command line commands.  We spawn synchronous processes
  // to run each of these commands sequentially.  The commands are defined within the corosponding language class.
  async secure() {
    const vls = "secure";
    const { configType, pkg } = this.pkgData[vls].data;
    const secure = this.pkgData[vls].commands;

    if (this.pkgData[vls]) {
      // check if there is a config to edit, otherwise this is a direct command line run.
      if (configType !== '') {
       this.editConfig(vls);
      }
      blue(
        `🗼 Securing ${this.fileName} with ${pkg}. It will take a while, please wait...`
      );
        console.log(secure)
      for (let i = 0; i < secure.length; i++) {
        const { status, stdout } = spawn.sync(secure[i].command, secure[i].args, {
          stdio: "inherit",
        });
        if (status !== 0) {
          continue;
        }
      }
    } else {
      blue(`🗼 Securing... No plugin installed...\n`)
    }
  }
  checkVersion(vls: string) {
    const {pkg, version, command, args, install, pkgData, installCommands, resource} = this.pkgData[vls].data;

    blue(
      `🗼 Making sure ${pkg} version ${version} is installed. Please wait...`
    );
    // check to see if package is installed on system
    const isInstalled = spawn.sync(command, args).status === 0;

    // if it is not installed, then check to see if package manager is installed on system.  If so, install package.
    // otherwise tell user to install manager
    if (!isInstalled) {
      red(`${pkg} is not installed.`);
      blue(
        `Checking to see if ${install} is installed on the system.`
      );
      const pmIsInstalled =
        spawn.sync(install, installCommands).status === 0;

      if (!pmIsInstalled) {
        red(
          `${install} is not installed; please visit ${resource} for installation options.`
        );
        return false;
      }
      const { status, stdout } = spawn.sync(
        pkgData.install,
        pkgData.installCommands,
        { stdio: "inherit" }
      );
    }
    // If in the future we want to compare against a version number, this is how we can grab that.
    const versionNumber = spawn
      .sync(command, args, { stdio: "pipe", encoding: "utf-8" })
      .stdout.replace(/(\r\n|\n|\r)/gm, "");
    if (versionNumber !== pkgData.version) {
      white(
        `${pkg} is installed however your system is using version ${versionNumber} where as it is recommended to be using version ${version}`
      );
    } else {
      white(`${pkg} version ${versionNumber} is correctly installed.`);
    }
    return true;
  }

  editConfig(vls: string) {
    const { configType } = this.pkgData[vls].data;
    if (configType === "yaml") {
      // yaml config pass needed info
      this.editYamlConfig(this.pkgData[vls].data);
    } else {
      //throw error.
    }
    return;
  }

  editYamlConfig(data: any) {
    const { configFile, configDir, dirTitle, fileTitle } = data;
    // Get current working directory
    const cwd = process.cwd();
    const configDirectory = cwd + configDir.substring(1) + configFile;
    // make sure file exists

    try {
      //load yaml file from given directory
      const doc = yaml.load(fs.readFileSync(configDirectory, "utf8"));

      // 1. if user entered '.' for fileName, then make sure config has directory and '.' set
      // 2. if user entered something different than '.' and the yaml file has 'directory' instead of 'file' settings change it.
      // 3. 'file' is set so just add the filename
      if (this.fileName === ".") {
        doc[dirTitle][0] = ".";
      } else if (this.fileName !== "." && doc[dirTitle]) {
        doc[fileTitle] = doc[dirTitle];
        delete doc[dirTitle];
        doc[fileTitle][0] = this.fileName;
      } else if (this.fileName !== ".") {
        doc[fileTitle][0] = this.fileName;
      }
      // write data to yml
      fs.writeFileSync(configDirectory, yaml.dump(doc));
    } catch (e) {
      console.log(e);
    }
  }

  fileExists(path: string): Boolean {
    return fs.existsSync(path);
  }

  directoryCheck(vls: string): Boolean {
    const { directorySearch } = this.pkgData[vls].data;
    return directorySearch;
  }
}
