#!/usr/bin/env node
import spawn from 'cross-spawn'


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

  }}