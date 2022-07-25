import { commands, pkgData } from "./data";
import { BasePackage } from '../../BasePackage.js';

export class Native extends BasePackage{
    
    constructor(fName: string) {
        super(commands(fName), pkgData);
    }
    
}


