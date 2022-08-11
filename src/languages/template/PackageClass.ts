import { AbstractAnalysisEngine } from "../AbstractAnalysisEngine.js";

import { Package } from './somePackage/Package'

export class PackageClass extends AbstractAnalysisEngine {
  constructor(fileName: string,  isLocal: boolean) {
    const packages = {
      validate: new Package(fileName, isLocal),
      lint: null,
      secure: null,
    };
    super(fileName, packages, isLocal);
  }
}
