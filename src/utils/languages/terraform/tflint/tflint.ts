export const tflint = [
    {
        "command" : "checkov",
        "args" : ['--config-file', './customChecks/config/config.yml']
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
    "version" : "2.1.15",
    "command" : "checkov",
    "args" : ['--version'],
    "install" : "brew",
    "installCommands": ['install', 'checkov'],
    "resource" : ""
  }