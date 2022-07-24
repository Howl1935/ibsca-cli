import {
  red,
  white,
  green,
  blue,
  yellow,
} from "../utils/helpers/utilTextColors";
import { getExtension } from "../utils/commandLineHelper";
import { languageType } from "../utils/helpers/utilExtensionTypeQuestions";
import { languageClassCreator } from "../utils/helpers/languageClassCreator";
import { errorMessage } from "../utils/errorMessage";
export async function checkHelper(fileName: string, vls: string) {
try {
    let languageClass = null;

    // helper function; returns a number representing the extension or if its a dir
    let extension = getExtension(fileName);
  
    // if extension is valid; run checks
    if (extension !== -1) {
      // if extension returns 0, the user input . to check directory, not specific file
      // Query user to find out what type of file they are checking
      if (extension === 0) {
        extension = await languageType();
        if (extension === -1) {
          throw new Error('sorry, please try a specific file.')
        }
      }
      // creates a language class based on extension
      languageClass = languageClassCreator(extension, fileName);
  
      if (languageClass) {
        // if command was a directory check, validate that check can be run.
        if (extension === 0 && !languageClass.directoryCheck(vls)) {
    
          throw new Error(            "Unable to run directory check for this language.  Try a specific file instead."
          )
        }
        // if command was a file check, validate that check can be run
        if (extension !== 0 && !languageClass.fileExists("./" + fileName)) {
          errorMessage("File does not exist.");
          return null;
        }
      } else {
        throw new Error('Oh no!')
      }
    } else {
        throw new Error('Invalid extension')
    }
  
    return languageClass;
} catch (error) {
    //console.error(error);
    
}
}
