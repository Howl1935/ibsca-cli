
/** This is the checkov "cartridge" make any changes to how it is implemented here */

export const checkov = [
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

export const checkovData = {
    "pkg" : "Checkov",
    "version" : "2.1.45",
    "command" : "checkov",
    "args" : ['--version'],
    "install" : "brew",
    "installCommands": ['install', 'checkov'],
    "resource": "https://www.checkov.io/1.Welcome/Quick%20Start.html"
  }

   // this will add put fileName into config file to test against.  We can later configure this to accept multiple files OR do entire folder recursively

export const checkovDirs = {
  "configType" : "yaml",
  "configDir" : '/customChecks/config/config.yml',
  "dirTitle" : 'directory',
  "fileTitle" : 'file'
}


  