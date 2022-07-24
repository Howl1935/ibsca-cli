import { checkov, checkovData } from "./data";
import { BasePackage } from "../../BasePackage.js";

export class Checkov extends BasePackage {
  constructor(fName: string) {
    super(checkov(fName), checkovData);
  }
}
