/**
 * This is where we can change packages used for IBSCA
 *  These are the "cartridges" where a developer can implement a new commandLine tool
 *  Simply configure settings within the package folder and import it here.  
 *  e.g. checkov is a "secure" SCA tool so import it's command line arguments, and its version data and connect.
 */
import { checkov, checkovData, checkovDirs } from "./checkov/checkov"
import { tflint, tflintData } from "./tflint/tflint"

export const validateCommands = []
export const lintCommands = tflint
export const secureCommands = checkov;

  // Details for each package that are used for communicating information to user.
  export const versions = 
  {
    validate : tflintData,
    lint : tflintData,
    secure : checkovData,   
  }
  
export const importantDirs = 
{
  validate : checkovDirs,
  lint : checkovDirs,
  secure : checkovDirs,   
}
