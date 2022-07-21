import type { Arguments, CommandBuilder } from "yargs";
import { extensionType } from '../utils/helpers/utilExtensionType';
import { languageClassCreator } from '../utils/helpers/languageClassCreator';
import { makeMess, cleanMess } from '../utils/helpers/repoDownload'
import {red, white, green, blue, yellow} from '../utils/helpers/utilTextColors';
type Options = {
  fileName: string;
};

// details for yargs run command
export const command: string = "validate <fileName>";
export const desc: string = "Runs Ibotta custom checks against current file.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
    })
    .positional("fileName", { type: "string", demandOption: true });

    export const handler = async (argv: Arguments<Options>): Promise<void> => {
      const { fileName } = argv;
      // // get the extension of the fileName
      // let extension: string|undefined = fileName.split('.').pop();
      // // implement this later... its the functionality for seaching an entire directory
      // if(fileName === '.'){
      //   const secureLanguageClass = languageClassCreator(0, fileName);
      // }
      // // If fileName is not properly formatted to be an extension, alert user; otherwise continue
      // else if(fileName.indexOf('.') === -1 || fileName.split('.')[0] === '' || fileName.split('.')[1] === ''){
      //   // not a valid fileName => .example || example. || . 
      //     errorMessage();
      // }else{
      //   let extType : number = -1;
      //   if(extension === undefined){
      //     errorMessage();
      //   }else{
      //     // Validate extension type; will return a number e.g. 0 = terraform (.tf)
      //     extType = extensionType(extension);
      //     if(extType === -1){
      //       errorMessage();
      //     }
      //     // check if customChecks folder exists; run command to pull from github
      //     makeMess();

      //     // pass the extension type and fileName to languageClassCreator to create a class with the correct module
      //     const secureLanguageClass = languageClassCreator(extType, fileName);
      //     if(secureLanguageClass){
      //       //validate that packages are installed.
      //       if(secureLanguageClass.checkVersion("validate")){
      //         // if this passes we can run all checks.
      //         await secureLanguageClass.validate();
      //       }else{
      //         errorMessage();
      //       }
      //     }else{
      //       errorMessage();
      //     }
      //   } 
      // }
      // //cleanMess();
      process.exit(0);
    };
    
    function errorMessage(){
      red("Not a valid extension.")

    }