import type { Arguments, CommandBuilder } from "yargs";
import { languageClassCreator } from '../utils/parseValidate/languageClassCreator';
import { makeMess, cleanMess } from '../utils/cli/repoDownload'
import { classChecker } from "../utils/parseValidate/classChecker";
import ora = require('ora')
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


  const extension = await extensionChecker(fileName)
 
  // creates a language class based on extension
  const languageClass = languageClassCreator(extension, fileName, local);

  // run through checks
  if(languageClass){
    // download git folder containing all config/custom policies unless isLocal flag was raised
    !local && makeMess();    

    if(classChecker(languageClass, fileName, extension, validate)){
      await languageClass.validate();
         console.log(' \n')
      
    }
    if(classChecker(languageClass, fileName, extension, lint)){
      await languageClass.lint();
      console.log(' \n')
    }
    if(classChecker(languageClass, fileName, extension, secure)){
      await languageClass.secure();
      console.log(' \n')
    }
  
  }

  cleanMess();
  process.exit()
};




