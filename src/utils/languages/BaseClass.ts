#!/usr/bin/env node
import spawn from 'cross-spawn'
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
import {red, white, green, blue, yellow} from '../utilTextColors';


/** Abstract class representing the base form of tested languages */
export abstract class BaseLanguage {
    fileName: string;
    importantDirs: any
    abstract getCommandList(check:string): any;
   // abstract editConfig(fileName:string): any;

    constructor(fileName: string, importantDirs : any) {
        this.fileName = fileName;
        this.importantDirs = importantDirs;
}

validate(){
  // work in progress
}
lint(){
  // work in progress
}

// This function is passed a list of objects which are command line commands.  We spawn synchronous processes
// to run each of these commands sequentially.  The commands are defined within the corosponding language class.
async secure(){
  // need to edit yaml file and add filename
  this.editConfig('secure');
  const commandList = this.getCommandList('secure');
  green(`🗼 Running Secure for ${this.fileName}. It will take a while, please wait...`);

  for (let i = 0; i < commandList.length; i++) {
    const { status, stdout } = spawn.sync(commandList[i].command, commandList[i].args, { stdio: 'inherit' });
    if (status !== 0) {
      continue
    }

}
}

checkVersion(vls : string) {
  const getPackageInfo = this.getCommandList('versions');
  const info = getPackageInfo[vls];
  green(
    `🗼 Making sure ${info.pkg} version ${info.version} is installed. Please wait...`
  )
    // check to see if package is installed on system
    const isInstalled = spawn.sync(info.command, info.args).status === 0

    // if it is not installed, then check to see if package manager is installed on system.  If so, install package.
    // otherwise tell user to install manager
    if(!isInstalled){
      red(`${info.pkg} is not installed.`)
      green(`Checking to see if ${info.install} is installed on the system.`)
      const pmIsInstalled = spawn.sync(info.install, info.installCommands).status === 0

      if(!pmIsInstalled){
        red(`${info.install} is not installed; please visit ${info.resource} for installation options.`)
        return false;
      }
      const { status, stdout } = spawn.sync(info.install, info.installCommands, { stdio: 'inherit' });
    }
      // If in the future we want to compare against a version number, this is how we can grab that.
      const versionNumber = spawn.sync(info.command, info.args, { stdio: 'pipe', encoding: 'utf-8' }).stdout.replace(/(\r\n|\n|\r)/gm, "");
      if(versionNumber !== info.version){
        white(`${info.pkg} is installed however your system is using version ${versionNumber} where as it is recommended to be using version ${info.version}`)
      }else{
        white(`${info.pkg} version ${versionNumber} is correctly installed.`)
      }  
    return true;
}

editConfig(vls : string){
  const {configType} = this.importantDirs[vls];

  if(configType === ''){
    // no config file, nothing to worry about.
    
  }else if(configType === 'yaml'){
    // yaml config pass needed info
    this.editYamlConfig(this.importantDirs[vls]);

  }else if(configType === 'hcl'){
    // hcl config pass needed info
  }else{
    //throw error.
  }
  return;
}



 editYamlConfig(importantDirs: any){
  const { configDir, dirTitle, fileTitle } = importantDirs;
  // Get current working directory
  const cwd = process.cwd();
  const configDirectory = cwd + configDir

      // make sure file exists

  try {
    //load yaml file from given directory
    const doc = yaml.load(fs.readFileSync(configDirectory, 'utf8'));

    // 1. if user entered '.' for fileName, then make sure config has directory and '.' set
    // 2. if user entered something different than '.' and the yaml file has 'directory' instead of 'file' settings change it.
    // 3. 'file' is set so just add the filename
    if(this.fileName === '.'){
      doc[dirTitle][0] = '.'
    }
    else if(this.fileName !== '.' && doc[dirTitle]){
      doc[fileTitle] = doc[dirTitle]
      delete doc[dirTitle]
      doc[fileTitle][0] = this.fileName
    }else if(this.fileName !== '.'){
      doc[fileTitle][0] = this.fileName
    }
  
    // write data to yml
     fs.writeFileSync(configDirectory, yaml.dump(doc));
    
  } catch (e) {
    console.log(e);
  }
  }

}




