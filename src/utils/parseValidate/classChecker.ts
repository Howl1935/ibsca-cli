import { errorMessage } from "../cli/errorMessage";

/**
 * 
 * @param languageClass An initialized language class
 * @param fileName the filename or directory to check
 * @param vls the type of check being performed (validate, lint, secure)
 * @returns 
 */
export function classChecker(
  languageClass: any,
  fileName: string,
  vls: string
) {
  try {
    if (languageClass) {
      if(languageClass.pkgData[vls] === null){
        throw new Error(`${vls} plugin not available.\n\n`);
      }
      const { pkg } = languageClass.pkgData[vls].data
      // if command was a directory check, validate that check can be run.
      if (fileName === "." && !languageClass.directoryCheck(vls)) {
        throw new Error(
          `Unable to ${vls}, directory check unavailable for ${pkg}.  Try a specific file instead.\n\n`
        );
      }
       // Confirm that given plugin can run checks on a specific file.
      if (fileName !== "." && !languageClass.fileCheck(vls)) {
        throw new Error(
          `Unable to ${vls}, specific file checking unavailable for ${pkg}.  Try a directory search instead.\n\n`
        );
      }
      // if command was a file check, validate that check can be run
      if (fileName !== "." && !languageClass.fileExists("./" + fileName)) {
        throw new Error(`Unable to ${vls}, ${fileName} not found.`);
      }
    } else {
      throw new Error("Unsupported language.\n");
    }
    return true;
  } catch (error) {
    errorMessage((<Error>error).message);
  }
}
