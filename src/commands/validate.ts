import type { Arguments, CommandBuilder } from "yargs";
import { makeMess, cleanMess } from "../utils/helpers/repoDownload";
import { extensionChecker } from "../utils/extensionChecker";
import { languageClassCreator } from "../utils/helpers/languageClassCreator";
import { classChecker } from "../utils/classChecker";

type Options = {
  fileName: string;
};

// details for yargs run command
export const command: string = "validate <fileName>";
export const desc: string = "Runs Ibotta custom checks against current file.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({})
    .positional("fileName", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName } = argv;
  const vls = "validate";
  const extension = await extensionChecker(fileName)

  // creates a language class based on extension
  const languageClass = languageClassCreator(extension, fileName);
  
  if (languageClass) {
    // pull checks from github
    makeMess();
    //validate that packages are installed.
    if(classChecker(languageClass, fileName, extension, vls)){
      await languageClass.validate();
    }
    // remove cloned github repo
    cleanMess();
    process.exit(0);
  }
};
