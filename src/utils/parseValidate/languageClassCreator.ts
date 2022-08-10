import { languages } from '../../languages/languages'
import { AbstractAnalysisEngine } from '../../languages/AbstractAnalysisEngine';


/** Creates a new class for the specific language.
 *  The language is inferred by the number passed in, which represents a file extension.
 * Returns null if no language exists.
 * @param extTyp: number representing language being selected OR directory
 * @param fileName file name being checked
 * @param isLocal a flag representing if user wants to use local config file
 * @returns an initialized class representing language to be tested
 */


export function languageClassCreator(
  extType: number,
  fileName: string,
  isLocal: boolean
): AbstractAnalysisEngine | null {
  // creates a mapping from language name to language object
  const map = new Map();
  languages.map((e) => {
    map.set(e.className[0], e.className[1]);
  })
  // instantiates languages
  return new (map.get(languages[extType].className[0]))(fileName, isLocal)
}
