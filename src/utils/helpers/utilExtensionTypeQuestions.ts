import inquirer from "inquirer";
// import { Answer, Choice, ProviderChoiceValue } from '../models/answer-choice'

// export async function providerQuestion(): Promise<Answer> {
//     const listOfFiles: Choice[] = [
//         {name: 'Github', value: ProviderChoiceValue.GITHUB}
//     ];
//     return inquirer.prompt([{
//         name: 'provider',
//         type: 'list',
//         message: 'Select a Git hosting provider',
//         choices: listOfFiles
//     }])
// }
export function fileType() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which language are you testing folder for?',
      choices: ['Terraform', 'Unlisted'],
    },
  ])
  .then(answers => {
    console.info('You selected:', answers.language);
    return answers.language;
    
  });}