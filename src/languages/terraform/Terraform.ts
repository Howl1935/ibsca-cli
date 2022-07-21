import { BaseLanguage } from '../BaseClass.js';
import { commands, data } from './currentPackagesHub.js'

export class Terraform extends BaseLanguage{
    
    constructor(fileName: string) {
        super(fileName, commands, data);
    }
    
}


