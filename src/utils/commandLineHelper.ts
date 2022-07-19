import { extensionType } from '../utils/helpers/utilExtensionType';

export function getExtension(fileName: string) {
    let extension: string | undefined = '';
    let extType: number = -1;
    // get the extension of file, or '.', or error
    if (fileName === '.') {
        // user wants to try and check the entire file
        extType = extensionType(fileName);
    } else {
        // get the extension of the fileName
        extension = fileName.split('.').pop();
        // If fileName contains '.' and ___ .  isn't blank and . ____ isn't blank
        if (fileName.indexOf('.') !== -1 && fileName.split('.')[0] !== '' && fileName.split('.')[1] !== '') {
            if(extension){
                extType = extensionType(extension);
            }
        }
    }
    return extType;
}

