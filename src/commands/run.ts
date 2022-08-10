import type { Arguments, CommandBuilder } from "yargs";
import { languageClassCreator } from '../utils/parseValidate/languageClassCreator';
import { makeMess, cleanMess } from '../utils/cli/repoDownload'
import { classChecker } from "../utils/parseValidate/classChecker";
import {
  red,
  white,
  blue,
  yellow,
  green,
} from "../utils/cli/textColors";
import{ extensionChecker } from "../utils/parseValidate/extensionChecker";
type Options = {
  fileName: string;
  local: boolean ;
};

 export const command: string = "run <fileName>";
 export const aliases: string = "r";

 export const desc: string = "Usage: Validate, Secure, and Lint given file. Use . to try directory search.";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({local : {
      type: "boolean", alias: "l", description: "Run checks against customized local config file. (When possible).", default: false
    }})
    .positional("fileName", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName, local } = argv;
  const validate = 'validate';
  const lint = 'lint';
  const secure = 'secure';
  let validate_status: number | null = 0;
  let lint_status: number | null = 0;
  let secure_status: number | null = 0;


  const extension = await extensionChecker(fileName)
 
  // creates a language class based on extension
  const languageClass = languageClassCreator(extension, fileName, local);
  blue("\n\nInializing Ibsca... ")

  // run through checks
  if(languageClass){
    // download git folder containing all config/custom policies unless isLocal flag was raised
    !local && makeMess();    

    if(classChecker(languageClass, fileName, validate)){
      validate_status = await languageClass.validate();
         console.log(' \n')
      
    }
    if(classChecker(languageClass, fileName, lint)){
      lint_status = await languageClass.lint();
      console.log(' \n')
    }
    if(classChecker(languageClass, fileName, secure)){
      secure_status = await languageClass.secure();
      console.log(' \n')
    }
  }
  cleanMess();
  if(validate_status === 0 && lint_status === 0 && secure_status === 0){
    process.exit(0);
  }else{
    process.exit(1);
  }
};




