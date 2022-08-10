import { AbstractAnalysisEngine } from "../AbstractAnalysisEngine.js";
import { Native } from "./native/package";
import { Checkov } from './checkov/package'
import { Tflint } from './tflint/package'
export class Terraform extends AbstractAnalysisEngine {
  constructor(fileName: string, isLocal: boolean) {
    const packages = {
      validate: new Tflint(fileName, isLocal),
      lint: new Native(fileName, isLocal),
      secure: new Checkov(fileName, isLocal),
    };
    super(fileName, packages, isLocal);
  }
}
