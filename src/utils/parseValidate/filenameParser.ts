import { getExtension } from './getExtension';
/**
 * Called from commands folder files.  Given a file name we return a numeric value representing what type of file is given.  The extensions are defined in /helpers/getExtension
 * @param fileName 
 * @returns number
 */
export function filenameParser(fileName: string) : number {
    let extension: string | undefined = '';
    let extType: number = -1;
    // get the extension of file, or '.', or error
    if (fileName === '.') {
        // user wants to try and check the entire folder system
        extType = getExtension(fileName);
    } else {
        // get the extension of the fileName
        extension = fileName.split('.').pop();
        // If fileName contains '.' and ___ .  isn't blank and . ____ isn't blank
        if (fileName.indexOf('.') !== -1 && fileName.split('.')[0] !== '' && fileName.split('.')[1] !== '') {
            if(extension){
                extType = getExtension(extension);
            }
        }
    }
    return extType;
}

