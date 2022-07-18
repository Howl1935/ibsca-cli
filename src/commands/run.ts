import type { Arguments, CommandBuilder } from "yargs";

//import ora from 'ora';

type Options = {
  fileName: string;
};

export const command: string = "run <filename>";
export const desc: string = "Usage: Validate, Secure, and Lint given file.";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      
    })
    .positional("<fileName>", { type: "string", demandOption: true });


export const handler =  async (argv: Arguments<Options>): Promise<void> => {



const {promisify} = require('util');
const {exec} = require('child_process');
const execAsync = promisify(exec);
var bubbles = "";
//const spinner = ora('Loading unicorns').start();
const sequentialExecution :any = async (...commands : any) => {
  if (commands.length === 0) {
    return 0;
  }
  const {stderr, stdout} = await execAsync(commands.shift());
  // if (stderr) {
  //   throw stderr;
  // }
     console.log(`${stdout}`);
     bubbles = stdout;

     //console.error(`stderr: ${stderr}`);
  return sequentialExecution(...commands);
}

// // Will execute the commands in series
await sequentialExecution(
  "git clone https://github.com/Howl1935/customChecks.git","checkov --config-file ./customChecks/config/config.yml", "rm -rf customChecks"
//mkdir -p temp;git clone https://github.com/Howl1935/customChecks.git temp;
//checkov --config-file ./temp/config/config.yml;
);


//spinner.stop();
//const { exec } = require("child_process");


//  exec("git clone https://github.com/Howl1935/customChecks.git", (error: { message: any; }, stdout: any, stderr: any)  =>  {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);

//     console.error(`stderr: ${stderr}`);
        
    
// });


//process.stdout.write("done yet?");


// await exec("checkov --config-file ./config.yml;cd ../..;rm -r customChecks", (error: { message: any; }, stdout: any, stderr: any)  =>  {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

process.stdout.write(bubbles);
//process.exit(0);
};


