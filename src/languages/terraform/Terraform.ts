import { BaseLanguage } from "../BaseClass.js";
import { Native } from "./terraform/native";
import { Tflint } from "./tflint/Tflint.js";
import { Checkov } from "./checkov/Checkov.js";

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
