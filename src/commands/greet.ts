import type { Arguments, CommandBuilder } from "yargs";
import { extensionType } from '../utils/extensionType';
import { commandHub } from '../utils/commandHub';

import chalk from "chalk";


type Options = {
  fileName: string;
};

// details for yargs run command
export const command: string = "greet <fileName>";
export const desc: string = "Greet <fileName> with Hello";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
    })
    .positional("fileName", { type: "string", demandOption: true });

    export const handler = async (argv: Arguments<Options>): Promise<void> => {
      const { fileName } = argv;
      
      // get the extension of the fileName
      let extension: string|undefined = fileName.split('.').pop();

      // If fileName is not properly formatted to be an extension, alert user; otherwise continue
      if(fileName.indexOf('.') === -1 || fileName.split('.')[0] === '' || fileName.split('.')[1] === ''){
        // not a valid fileName => .example || example. || . 
          errorMessage();
      }else{
        let extType : number = -1;
        if(extension === undefined){
          errorMessage();
        }else{
          // Validate extension type; will return a number e.g. 0 = terraform (.tf)
          extType = extensionType(extension);
          if(extType === -1){
            errorMessage();
          }

          // pass the extension type and fileName to commandHub to create a class with the correct module
          const secureModule = commandHub(extType, fileName);
          if(secureModule){
            //secureModule.printName();
            //secureModule.getSalary();
            await secureModule.secure();
          }
        }
         
      }
       


      //var test = mydemo();
      //process.stdout.write(upper ? greeting.toUpperCase() : greeting);
      // process.stdout.write(blah ?  blah : "nothing");
      process.exit(0);
    };
    
    function errorMessage(){
      process.stdout.write(chalk.red("Not a valid extension. \n"))

    }