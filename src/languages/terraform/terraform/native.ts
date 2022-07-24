import { native, nativeData } from './data'
import { BasePackage } from '../../BasePackage.js';

export class Native extends BasePackage{
    
    constructor(fName: string) {
        super(native(fName), nativeData);
    }
    
}


