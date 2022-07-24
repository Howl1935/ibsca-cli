import { BaseLanguage } from "../BaseClass.js";

import { Package } from './somePackage/Package'

export class PackageClass extends BaseLanguage {
  constructor(fileName: string) {
    const packages = {
      validate: new Package(fileName),
      lint: null,
      secure: null,
    };
    super(fileName, packages);
  }
}
