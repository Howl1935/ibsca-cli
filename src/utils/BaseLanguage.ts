#!/usr/bin/env node
import spawn from 'cross-spawn'
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');


/** Abstract class representing the base form of tested languages */
export abstract class BaseLanguage {
    fileName: string;
    abstract getCommandList(check:string): any;

    constructor(fileName: string) {
        this.fileName = fileName;
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
  this.editConfig();
  const commandList = this.getCommandList('secure');
  console.log(
    `🗼 Running Secure for ${this.fileName}. It will take a while, please wait...`
  )

  for (let i = 0; i < commandList.length; i++) {
    const { status, stdout } = spawn.sync(commandList[i].command, commandList[i].args, { stdio: 'inherit' });
    if (status !== 0) {
      continue
    }

}
}

// this will add put fileName into config file to test against.  We can later configure this to accept multiple files OR do entire folder recursively
editConfig(){
// Get document, or throw exception on error
const cwd = process.cwd();
const newPath = cwd + '/customChecks/custom-policies'
try {
  
  const doc = yaml.load(fs.readFileSync(cwd + '/customChecks/config/config.yml', 'utf8'));
  // if the user is trying to check a specific file but .yml is checking a directory
  if(this.fileName !== '.' && doc.directory){
    // make changes to the yml file
    doc['file'] = doc['directory']
    delete doc.directory
    doc.file[0] = this.fileName
  }else if(this.fileName !== '.'){
    doc.file[0] = this.fileName
  }

  // switch external checks folder to cwd/customChecks/etc
  doc['external-checks-dir'] = doc['external-checks-git']
  doc['external-checks-dir'][0] = 'df'
  delete doc['external-checks-git']
  
  fs.writeFileSync(cwd + '/customChecks/config/config.yml', yaml.dump(doc));
  
} catch (e) {
  console.log(e);
}
}

checkVersion(vls : string) {
  const commandList = this.getCommandList('versions');
  // destrucure data from version object; use string passed by command ("validate", "lint", "secure")
  const data = commandList[vls];
  console.log(
    `🗼 Making sure ${data.pkg} version ${data.version} is installed. Please wait...`
  )
    // check to see if package is installed on system
    const isInstalled = spawn.sync(data.command, data.args).status === 0
    // if it is not installed, then check to see if package manager is installed on system.  If so, install package.
    // otherwise tell user to install manager
    if(!isInstalled){
      console.log(`${data.pkg} is not installed.`)
      console.log(`Checking to see if ${data.install} is installed on the system.`)
      const pmIsInstalled = spawn.sync(data.install, data.installCommands).status === 0

      if(!pmIsInstalled){
        console.log(`${data.install} is not installed; please visit ${data.resource} for installation options.`)
        return false;
      }
      const { status, stdout } = spawn.sync(data.install, data.installCommands, { stdio: 'inherit' });
    }
      // If in the future we want to compare against a version number, this is how we can grab that.
      const versionNumber = spawn.sync(data.command, data.args, { stdio: 'pipe', encoding: 'utf-8' }).stdout.replace(/(\r\n|\n|\r)/gm, "");
      if(versionNumber !== data.version){
        console.log(`${data.pkg} is installed however your system is using version ${versionNumber} where as it is recommended to be using version ${data.version}`)
      }else{
        console.log(`${data.pkg} is correctly installed.`)
      }  
    return true;
}

}