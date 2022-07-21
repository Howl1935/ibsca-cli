import inquirer from "inquirer";
import { extensionType } from "./utilExtensionType";


  export async function languageType() {
   const result =  await inquirer
  .prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which language extension are you testing folder for?',
      choices: ['tf', 'Unlisted'],
    },
  ])
  .then(answers => {
    //console.info('You selected:', answers.language);
    // make sure choices listed above corrolate to extensionType parser
     //console.log()
     return extensionType(answers.language)
        
  });
  return result;
  }
