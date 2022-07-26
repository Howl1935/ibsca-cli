/**
 * Given an extension, return a number representing the file type.
 * @param extension 
 * @returns A number representing the file type
 */
import { languages } from '../../languages/languages'
// function to check extension type
export function getExtension(extension: string) {

    let extArr: string[] = []
    languages.forEach((ext) => {
        extArr.push(ext.extension)
    })

    return extArr.indexOf(extension)
}

