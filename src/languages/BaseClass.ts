#!/usr/bin/env node
import spawn from 'cross-spawn'
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
import {red, white, green, blue, yellow} from '../utils/helpers/utilTextColors';


/** Abstract class representing the base form of tested languages */
export abstract class BaseLanguage {
    fileName: string;
    // commands: any;
    // data: any;
    validateClass :any;
    lintClass: any;
    secureClass: any;
    //abstract getCommandList(check:string): any;
   // abstract editConfig(fileName:string): any;

    constructor(fileName: string,  packages: any) {
        this.fileName = fileName;
        // this.commands = commands;
        // this.data = data;

        this.validateClass = packages.validate;
        this.lintClass = packages.lint;
        this.secureClass = packages.secure;
}

async validate(){
  yellow("VALIDATE\n\n")
   // need to edit yaml file and add filename
   //this.editConfig('validate');
   const validateData = this.validateClass.commands;
   green(`🗼 Running Validate for ${this.fileName}. It will take a while, please wait...`);
  
   for (let i = 0; i < validateData.length; i++) {
     const { status, stdout } = spawn.sync(validateData[i].command, validateData[i].args, { stdio: 'inherit' });
     if (status !== 0) {
       continue
     }
    
 }
}
lint(){
  // work in progress
  yellow("LINT\n\n")
     // need to edit yaml file and add filename
   //this.editConfig('validate');
   const lintData = this.lintClass.commands;
   green(`🗼 Running Lint for ${this.fileName}. It will take a while, please wait...`);
  
   for (let i = 0; i < lintData.length; i++) {
     const { status, stdout } = spawn.sync(lintData[i].command, lintData[i].args, { stdio: 'inherit' });
     if (status !== 0) {
       continue
     }
    
}}

// This function is passed a list of objects which are command line commands.  We spawn synchronous processes
// to run each of these commands sequentially.  The commands are defined within the corosponding language class.
async secure(){
  yellow("SECURE\n\n")
  // need to edit yaml file and add filename
  this.editConfig('secure');
  const secureData = this.secureClass.commands;
  green(`🗼 Running Secure for ${this.fileName}. It will take a while, please wait...`);

  for (let i = 0; i < secureData.length; i++) {
    const { status, stdout } = spawn.sync(secureData[i].command, secureData[i].args, { stdio: 'inherit' });
    if (status !== 0) {
      continue
    }

}
}

checkVersion(vls : string) {
  //const getPackageInfo = this.getCommandList('data');
  let getPackageInfo = null;
  if(vls === "validate"){
    getPackageInfo = this.validateClass.data;
  }else if (vls === "lint"){
    getPackageInfo = this.lintClass.data;
  }else if (vls === "secure"){
    getPackageInfo = this.secureClass.data;
  }
  

  const info = getPackageInfo;
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
  let configType = null;
  if(vls === "validate"){
    configType = this.validateClass.data;
  }else if (vls === "lint"){
    configType = this.lintClass.data;
  }else if (vls === "secure"){
    configType = this.secureClass.data;
  }
  
  //const { configType } = this.data[vls];

  if(configType['configType'] === ''){
    // no config file, nothing to worry about.
    
  }else if(configType['configType'] === 'yaml'){
    // yaml config pass needed info
    this.editYamlConfig(configType);

  }else if(configType['configType'] === 'hcl'){
    // hcl config pass needed info
  }else{
    //throw error.
  }
  return;
}



 editYamlConfig(data: any){
  const { configDir, dirTitle, fileTitle } = data;
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

 fileExists(path : string) : Boolean {
    return fs.existsSync(path);
 }

 directoryCheck(checkType : string) : Boolean {
  let directorySearch = null;
  if(checkType === "validate"){
    directorySearch = this.validateClass.data['directorySearch'];
  }else if (checkType === "lint"){
    directorySearch = this.lintClass.data['directorySearch'];
  }else if (checkType === "secure"){
    directorySearch = this.secureClass.data['directorySearch'];
  }
  //const { directorySearch } = this.data[checkType];
  return directorySearch;
 }

}




