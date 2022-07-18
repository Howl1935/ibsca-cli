/** Given a numerical tag (tags language type being processed), and a fileName; creates a new class for the specific language.
* Returns null if no language exists. 
* @param extTyp: number representing language being selected
* @param fileName file name being checked
* @returns an initialized class representing language to be tested
*/

//import class for language
import { Terraform } from '../../languages/terraform/Terraform';
import { fileType } from './utilExtensionTypeQuestions';

export function languageClassCreator(extType:number, fileName:string){
    switch(extType){
        case 0:{
            const response = fileType();
            return new Terraform(fileName)
        }
        //terraform
        case 1:{
            return new Terraform(fileName)
        }
        // here we can implement future extensions
        default: {
            return null;
        }
    }}

