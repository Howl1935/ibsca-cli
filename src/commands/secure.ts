import type { Arguments, CommandBuilder } from "yargs";
import { extensionType } from '../utils/helpers/utilExtensionType';
import { languageClassCreator } from '../utils/helpers/languageClassCreator';
import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import { red, white, green, blue, yellow } from '../utils/helpers/utilTextColors';
import { getExtension } from '../utils/commandLineHelper'
type Options = {
  fileName: string;
};

// details for yargs run command
export const command: string = "secure <fileName>";
export const desc: string = "Runs Ibotta custom checks against current file.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
    })
    .positional("fileName", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName } = argv;
  // helper function; returns a number representing the extension
  const extension = getExtension(fileName);
  let secureLanguageClass = null;
  // if extension is valid; run checks
  if (extension !== -1) {
    // check if customChecks folder exists; run command to pull from github
    makeMess();
    // creates a language class based upon extension
    secureLanguageClass = languageClassCreator(extension, fileName);
    if (secureLanguageClass) {
      //validate that packages are installed.
      if (secureLanguageClass.checkVersion("secure")) {
        // if this passes we can run all checks.
        await secureLanguageClass.secure();
      } else{
        errorMessage("Secure function didn't work.");
      }
    } else {
      errorMessage("Invalid version.");
    }
  } else {
    errorMessage("Extension type was invalid.");
  }
  // remove cloned github repo
  cleanMess();
  //process.exit(0);
};

function errorMessage(err : string) {
  red(`Not a valid extension. Failed at ${err}`)

}