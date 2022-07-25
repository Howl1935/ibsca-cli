import { commands, pkgData } from "./data";
import { BasePackage } from "../../BasePackage.js";

export class Checkov extends BasePackage {
  constructor(fName: string) {
    super(commands(fName), pkgData);
  }
}
