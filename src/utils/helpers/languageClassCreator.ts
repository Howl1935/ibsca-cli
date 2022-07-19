/** Given a numerical tag (tags language type being processed), and a fileName; creates a new class for the specific language.
* Returns null if no language exists. 
* @param extTyp: number representing language being selected
* @param fileName file name being checked
* @returns an initialized class representing language to be tested
*/

//import class for language
import { Terraform } from '../../languages/terraform/Terraform';
import { fileType } from './utilExtensionTypeQuestions';

export  function languageClassCreator(extType:number, fileName:string): Terraform | null{
    switch(extType){
        case 0:{
            // fileName is '.' so we need to query user to find out what language they are looking for
            // Since we get a extension value from fileType() we can recursively call the current function 
            // to get valid class.
            const result = fileType();
            const res = 1;
            return languageClassCreator(res, fileName);
            
            
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

