/** Abstract class representing the base form of tested languages */
export abstract class BasePackage {
  commands: any;
  data: any;
  constructor(commands: any, data: any) {
    this.commands = commands;
    this.data = data;
  }
  

}
