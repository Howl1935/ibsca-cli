import { errorMessage } from "../cli/errorMessage";

export function classChecker(
  languageClass: any,
  fileName: string,
  extension: number,
  vls: string
) {
  try {
    if (languageClass) {
      if(languageClass.pkgData[vls] === null){
        throw new Error(`${vls} plugin not available.`);

      }
      // if command was a directory check, validate that check can be run.
      if (fileName === "." && !languageClass.directoryCheck(vls)) {
        throw new Error(
          "Unable to run directory check for this package.  Try a specific file instead."
        );
      }
      // if command was a file check, validate that check can be run
      if (fileName !== "." && !languageClass.fileExists("./" + fileName)) {
        throw new Error(`${fileName} not found.`);
      }
    } else {
      throw new Error("Unsupported language.");
    }
    return true;
  } catch (error) {
    errorMessage((<Error>error).message);
  }
}
