import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import { red, white, green, blue, yellow } from '../utils/helpers/utilTextColors';

export  function genericChecks(languageClass: any, data: any, checkType: string): boolean{
    if (languageClass) {
        // if command was a directory check, validate that check can be run.
        if(data.extension === 0 && !languageClass.directoryCheck(checkType)){
          return errorMessage("Unable to run directory check for this package.  Try a specific file instead.")
         
        }
        // if command was a file check, validate that check can be run      
        if(data.extension !== 0 && !languageClass.fileExists('./' + data.fileName)) {
          return errorMessage("File does not exist.");
          
        }
  
      
    }
    return true;  
}
    function errorMessage(err : string):boolean {
        red(`Failed at ${err}`)
        return false;
      }