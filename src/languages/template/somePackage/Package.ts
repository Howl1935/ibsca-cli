import { packageName, packageData } from "./data";
import { BasePackage } from "../../BasePackage.js";

export class Package extends BasePackage {
  constructor(fName: string) {
    super(packageName(fName), packageData);
  }
}
