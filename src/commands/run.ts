import type { Arguments, CommandBuilder } from "yargs";
import { extensionType } from '../utils/helpers/utilExtensionType';
import { languageClassCreator } from '../utils/helpers/languageClassCreator';
import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import { red, white, green, blue, yellow } from '../utils/helpers/utilTextColors';
import { getExtension } from '../utils/commandLineHelper'
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
    .positional("f", { type: "string", demandOption: true });


export const handler =  async (argv: Arguments<Options>): Promise<void> => {

  const { fileName } = argv;
  // helper function; returns a number representing the extension
  console.log(fileName)
  const extension = getExtension(fileName);
  let LanguageClass = null;
  // if extension is valid; run checks
  if (extension !== -1) {
    // check if customChecks folder exists; run command to pull from github
    makeMess();
    // creates a language class based upon extension
    LanguageClass = languageClassCreator(extension, fileName);
    if (LanguageClass) {
      //validate that packages are installed.
      if (LanguageClass.checkVersion("secure")) {
        // if this passes we can run all checks.
        await LanguageClass.validate();
        await LanguageClass.secure();
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