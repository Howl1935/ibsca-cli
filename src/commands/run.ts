import type { Arguments, CommandBuilder } from "yargs";
import { extensionType } from '../utils/helpers/utilExtensionType';
import { languageClassCreator } from '../utils/helpers/languageClassCreator';
import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import { red, white, green, blue, yellow } from '../utils/helpers/utilTextColors';
import { getExtension } from '../utils/commandLineHelper'
import { languageType } from "../utils/helpers/utilExtensionTypeQuestions";
import { genericChecks } from "./genericCheck";

//import ora from 'ora';

type Options = {
  fileName: string;
};

 export const command: string = "run <fileName>";
 export const desc: string = "Usage: Validate, Secure, and Lint given file.";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
    })
    .positional("fileName", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName } = argv;

  // helper function; returns a number representing the extension or if its a dir
  let extension = getExtension(fileName);
  let languageClass = null;

  // if extension is valid; continue
  if (extension !== -1) {
    // Use inquirer to query user of what language they are checking
    if(extension === 0){
      extension = await languageType();
      if(extension === -1){
        errorMessage('Sorry, please try a specific file.')
      }
    }
    // creates a language class based on extension    
    languageClass = languageClassCreator(extension, fileName);
    // pull checks from github
     makeMess();    
    if(languageClass && genericChecks(languageClass, {"extension":extension, "fileName":fileName}, "validate")){
  
            //validate that packages are installed.
            if (languageClass.checkVersion("validate")) {
              // if this passes we can run all checks.
              await languageClass.validate();
            } else{
              errorMessage("Secure function didn't work.");
            }
    }
    if(languageClass && genericChecks(languageClass, {"extension":extension, "fileName":fileName}, "lint")){
  
      //validate that packages are installed.
      if (languageClass.checkVersion("lint")) {
        // if this passes we can run all checks.
        await languageClass.lint();
      } else{
        errorMessage("Lint function didn't work.");
      }
}
if(languageClass && genericChecks(languageClass, {"extension":extension, "fileName":fileName}, "secure")){
  
  //validate that packages are installed.
  if (languageClass.checkVersion("secure")) {
    // if this passes we can run all checks.
    await languageClass.secure();
  } else{
    errorMessage("Secure function didn't work.");
  }
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
  //process.exit(0);
}