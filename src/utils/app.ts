// #! /usr/bin/env node

// // const { promisify } = require("util");
// // const { exec } = require("child_process");
// // const execAsync = promisify(exec);

// // Recursively iterate through commands
// // Create a plan; then convert it to .json, after creating ast we will need to destroy the json file
// // const sequentialExecution: any = async (...commands: string[]) => {
// //   if (commands.length === 0) {
// //     return 0;
// //   }

// //   const { stderr } = await execAsync(commands.shift());
// //   if (stderr) {
// //     throw stderr;
// //   }

// //   return sequentialExecution(...commands);
// // };

// // module.exports = {
// //   sequentialExecution

// // }
// const { promisify } = require("util");
// const { exec } = require("child_process");
// const execAsync = promisify(exec);
// class App {
//   private commandRunner: string = "ls -a";

//   constructor() {}
//   public runTerraformChecks() {
//     const sequentialExecution: any = async (...commands: string[]) => {
//       if (commands.length === 0) {
//         return 0;
//       }

//       const { stderr } = await execAsync(commands.shift());
//       if (stderr) {
//         throw stderr;
//       }
//       console.log('hi')

//       return sequentialExecution(...commands);
//     };

//     sequentialExecution(
//       "mkdir temp",
//       "cd temp",
//       "git clone https://github.com/Howl1935/customChecks.git",
//       "cd ..",
//       "rm -r temp"

//     );
//     return "sweet caroline";
//   }
// }

// modexport = App;
