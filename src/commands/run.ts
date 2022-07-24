import type { Arguments, CommandBuilder } from "yargs";
import { languageClassCreator } from '../utils/helpers/languageClassCreator';
import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import { classChecker } from "../utils/classChecker";
import ora = require('ora')
import{ extensionChecker } from "../utils/extensionChecker";
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
  const validate = 'validate';
  const lint = 'lint';
  const secure = 'secure';

  const extension = await extensionChecker(fileName)
 
  // creates a language class based on extension
  const languageClass = languageClassCreator(extension, fileName);


  // run through checks
  if(languageClass){
    makeMess();    
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




