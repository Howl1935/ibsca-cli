
export function commands(fName: string, configDir : string){
    return [
        {
            "command" : "tflint",
            "args" : ['--init']
        },
        {
          "command" : "tflint",
          "args" : ['--config', configDir, fName]
      },
      ]}
    
    export const pkgData = {
        pkg : "TFlint",
        version : "0.38.1",
        command : "tflint",
        args : ['--version'],
        install: "brew",
        installCommands: ['install', 'tflint'],
        resource : "https://github.com/terraform-linters/tflint",
        configType : "",
        configFile: ".tflint.hcl",
        configDir : './customChecks/terraform/tflint/config/',
        dirTitle : 'directory',
        fileTitle : 'file',
        directorySearch : true,
        fileCheck : false

      }
    
      