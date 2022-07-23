import type { Arguments, CommandBuilder } from "yargs";
import { languageClassCreator } from '../utils/helpers/languageClassCreator';
import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import { red, white, green, blue, yellow } from '../utils/helpers/utilTextColors';
import { getExtension } from '../utils/commandLineHelper'
import { languageType } from "../utils/helpers/utilExtensionTypeQuestions";

type Options = {
  fileName: string;
};
// details for yargs run command
// export const command: string = "secure <fileName>";
// export const desc: string = "Runs Ibotta custom checks against current file.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
    })
    .positional("fileName", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName } = argv;

  // helper function; returns a number representing the extension or if its a dir
  let extension = getExtension(fileName);
  let secureLanguageClass = null;

  // if extension is valid; run checks
  if (extension !== -1) {
    // Use inquirer to figure out what type of extension we are trying to search folder for
    if(extension === 0){
      extension = await languageType();
      if(extension === -1){
        errorMessage('Sorry, please try a specific file.')
      }
    }
    // creates a language class based on extension    
    secureLanguageClass = languageClassCreator(extension, fileName);
    if (secureLanguageClass) {
      // if command was a directory check, validate that check can be run.
      if(extension === 0 && !secureLanguageClass.directoryCheck()){
        errorMessage("Unable to run directory check for this language.  Try a specific file instead.")
      }
      // if command was a file check, validate that check can be run      
      if(extension !== 0 && !secureLanguageClass.fileExists('./' + fileName)) {
        errorMessage("File does not exist.");
      }

      // pull checks from github
      makeMess();      
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
  process.exit(0);

}