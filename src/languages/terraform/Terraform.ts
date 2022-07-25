import { BaseLanguage } from "../BaseClass.js";
import { Native } from "./terraform/package";
import { Checkov } from './checkov/package'
import { Tflint } from './tflint/package'
export class Terraform extends BaseLanguage {
  constructor(fileName: string) {
    const packages = {
      validate: null,
      lint: new Tflint(fileName),
      secure: new Checkov(fileName),
    };
    super(fileName, packages);
  }
}
