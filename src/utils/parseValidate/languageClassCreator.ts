/** Given a numerical tag (tags language type being processed), and a fileName; creates a new class for the specific language.
 * Returns null if no language exists.
 * @param extTyp: number representing language being selected
 * @param fileName file name being checked
 * @returns an initialized class representing language to be tested
 */

import { languages } from '../../languages/languages'
import { AbstractAnalysisEngine } from '../../languages/AbstractAnalysisEngine';

export function languageClassCreator(
  extType: number,
  fileName: string,
  isLocal: boolean
): AbstractAnalysisEngine | null {

  const map = new Map();
 languages.map((e) =>{
    map.set(e.className[0], e.className[1]) ;
  })

  return new (map.get(languages[extType].className[0]))(fileName, isLocal)

}
