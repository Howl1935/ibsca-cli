import { commands, pkgData } from "./data";
import { AbstractPackagePlugin } from "../../AbstractPackagePlugin.js";

export class Package extends AbstractPackagePlugin {
  constructor(fName: string, isLocal: boolean) {
    super(commands(fName, isLocal ? './' + pkgData.configFile : pkgData.configDir + pkgData.configFile), pkgData);
  }
}
