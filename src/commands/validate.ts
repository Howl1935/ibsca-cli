import type { Arguments, CommandBuilder } from "yargs";
import { makeMess, cleanMess } from "../utils/cli/repoDownload";
import { extensionChecker } from "../utils/parseValidate/extensionChecker";
import { languageClassCreator } from "../utils/parseValidate/languageClassCreator";
import { classChecker } from "../utils/parseValidate/classChecker";

type Options = {
  fileName: string;
  local: boolean ;
};

// details for yargs run command
export const command: string = "validate <fileName>";
export const aliases: string = "v";
export const desc: string = "Runs Ibotta custom checks against current file.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({local : {
      type: "boolean", alias: "l", description: "Run checks against customized local config file. (When possible).", default: false
    }})
    .positional("fileName", { type: "string", demandOption: true });
    

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName, local } = argv;
  const vls = "validate";
  const extension = await extensionChecker(fileName)

  // creates a language class based on extension
  const languageClass = languageClassCreator(extension, fileName, local);
  if (languageClass) {
    // pull checks from github
    !local && makeMess();
    //validate that packages are installed.
    if(classChecker(languageClass, fileName, extension, vls)){
      await languageClass.validate();
    }
    // remove cloned github repo
    cleanMess();
    process.exit(0);
  }
};
