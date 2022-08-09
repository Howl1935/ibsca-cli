import type { Arguments, CommandBuilder } from "yargs";
import { makeMess, cleanMess } from "../utils/cli/repoDownload";
import { extensionChecker } from "../utils/parseValidate/extensionChecker"
import { languageClassCreator } from "../utils/parseValidate/languageClassCreator";
import { classChecker } from "../utils/parseValidate/classChecker";
import {
  red,
  white,
  blue,
  yellow,
  green,
} from "../utils/cli/textColors";
type Options = {
  fileName: string;
  local: boolean ;
};
// details for yargs run command
export const command: string = "lint <fileName>";
export const aliases: string = "l";
export const desc: string = "Runs Ibotta custom checks against current file.  Use . to try directory search.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options( {local : {
      type: "boolean", description: "Run checks against customized local config file. (When possible).", alias: "l", default: false
    }})
    .positional("fileName", { type: "string", demandOption: true });
    

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName,local } = argv;
  const vls = "lint";
  const extension = await extensionChecker(fileName)

  // creates a language class based on extension
  const languageClass = languageClassCreator(extension, fileName, local);
  blue("\n\nInializing Ibsca... ")
  if (languageClass) {
    // pull checks from github
    !local && makeMess();
    //validate that packages are installed.
    if(classChecker(languageClass, fileName, vls)){
      await languageClass.lint();
    }
    // remove cloned github repo
    cleanMess();
    process.exit(0);
  }
};
