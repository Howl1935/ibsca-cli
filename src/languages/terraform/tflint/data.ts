
export function tflint (fName: string){
    return [
        {
        "command" : "mv",
        "args" : [ './customChecks/terraform/tflint/config/.tflint.hcl', '.']
        },
        {
            "command" : "tflint",
            "args" : ['--init']
        },
        {
          "command" : "tflint",
          "args" : [fName]
      },
      {
        "command" : "mv",
        "args" : [ '.tflint.hcl', './customChecks/terraform/tflint/config/']
        },
      ]}
    
    export const tflintData = {
        "pkg" : "TFlint",
        "version" : "0.38.1",
        "command" : "tflint",
        "args" : ['--version'],
        "install" : "brew",
        "installCommands": ['install', 'tflint'],
        "resource" : "https://github.com/terraform-linters/tflint",
        "configType" : "",
        "configDir" : '',
        "dirTitle" : 'directory',
        "fileTitle" : 'file',
        "directorySearch" : false
      }
    
      