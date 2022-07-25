import { getExtension } from "../utils/commandLineHelper";
import { languageType } from "../utils/helpers/utilExtensionTypeQuestions";
import { errorMessage } from "../utils/errorMessage";

export async function extensionChecker(fileName: string) {
  try {
    // helper function; returns a number representing the extension or if its a dir
    let extension = getExtension(fileName);

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
    process.exit()
    //return -1;
  }
}
