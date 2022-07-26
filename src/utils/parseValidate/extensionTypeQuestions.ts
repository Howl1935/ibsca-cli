import inquirer from "inquirer";
import { languages } from '../../languages/languages'

  export async function languageType() {
     
    const res = languages.map(lang => {
      if(lang.className[0] !== '.' && lang.className[0] != undefined){
        return lang.className[0];
      }
    }).filter(e=>e !== undefined)
    res.push('Exit')
   const result =  await inquirer
  .prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which language extension are you testing folder for?',
      choices: res,
    },
  ])
  .then(answers => {
     
     return answers.language === 'Exit' ?  -1 : res.indexOf(answers.language) + 1
        
  });
  return result;
  }
