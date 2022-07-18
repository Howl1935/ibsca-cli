let fName = 'main.tf';
export const setFileName= (fileName: string) => fName = fileName;

export const tflint = [
    {
    "command" : "mv",
    "args" : [ './customChecks/config/terraform/tflint/.tflint.hcl', '.']
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
    "args" : [ '.tflint.hcl', './customChecks/config/terraform/tflint/']
    },
  ]

// Details for each package that are used for communicating information to user.
// The program will:
// 1. check if package exists
// 2. compare its version 
// 3. if not installed, try and install with given package manager
//    if that package manager is not installed it will direct user to reference page to install.

export const tflintData = {
    "pkg" : "TFlint",
    "version" : "0.38.1",
    "command" : "tflint",
    "args" : ['--version'],
    "install" : "brew",
    "installCommands": ['install', 'tflint'],
    "resource" : "https://github.com/terraform-linters/tflint"
  }