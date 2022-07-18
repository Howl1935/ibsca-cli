import { BaseLanguage } from '../BaseClass.js';
import { validateCommands, lintCommands, secureCommands, versions, importantDirs } from './currentPackagesHub.js'

export class Terraform extends BaseLanguage{
    
    constructor(fileName: string) {
        super(fileName, importantDirs);
    }
    // This function is where we can list commands to run when this class is called upon.
    getCommandList(check: string){
        if(check === 'validate'){
            return validateCommands;
        }else if(check === 'lint'){
            return lintCommands;
        }else if(check === 'secure'){
            return secureCommands;
        }else if(check === 'versions'){
            return versions;
        }else{
            return [];
        }    
    }

    
}


