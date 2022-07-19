import inquirer from "inquirer";
import { extensionType } from "./utilExtensionType";

export async function fileType() {
  const first = await goForIt();

  return 0;

}

async function goForIt(){
  const promise1 = await inquirer
  .prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which language extension are you testing folder for?',
      choices: ['tf', 'Unlisted'],
    },
  ])
  .then(answers => {
    console.info('You selected:', answers.language);
    // make sure choices listed above corrolate to extensionType parser
     console.log(extensionType(answers.language))
        
  });
}
