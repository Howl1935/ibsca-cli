import { filenameParser } from "./filenameParser";
import { languageType } from "./extensionTypeQuestions";
import { errorMessage } from "../cli/errorMessage";

/** This function's purpose is to parse a given filename passed in by a user.  
 * It will firstly test the filename's validity, check if it is a directory, or if it is an extension. 
 * If it is an extension, it will return which extension.
 * All of this information is returned as a numeric value. 
 **/

export async function extensionChecker(fileName: string) {
  try {
    // helper function; returns a number representing the extension or if its a dir
    let extension = filenameParser(fileName);

    // if extension is valid; run checks
    if (extension !== -1) {
      // if extension returns 0, the user input . to check directory, not specific file
      // Query user to find out what type of file they are checking
      if (extension === 0) {
        extension = await languageType();
        if (extension === -1) {
          throw new Error("Unsupported language.");
        }
      }
    } else {
      throw new Error("Invalid extension");
    }
    return extension;

  } catch (error) {
    errorMessage((<Error>error).message);
    process.exit(1)
  }
}
