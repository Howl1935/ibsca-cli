import { tflint, tflintData } from './data'
import { BasePackage } from '../../BasePackage.js';

export class Tflint extends BasePackage{
    
    constructor(fName: string) {
        super(tflint(fName), tflintData);
    }
    
}


