/**
 * Given an extension, return a number representing the file type.
 * @param extension 
 * @returns A number representing the file type
 */

// function to check extension type
export function extensionType(extension:string){
    switch(extension){
        case 'tf':{
            return 0;
        }
        // here we can implement future extensions
        default: {
            return -1;
        }
    }}

