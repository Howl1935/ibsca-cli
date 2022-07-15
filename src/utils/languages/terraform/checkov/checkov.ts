
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

  // if we want this to be generic, we should 
  // 1. check if there is a config file to edit if no return 
  // 2. Have a generic procedure for making changes
  // export function editConfig(fileName:string){
  // // Get document, or throw exception on error
  // const cwd = process.cwd();
  // const newPath = cwd + '/customChecks/custom-policies'
  // try {
    
  //   const doc = yaml.load(fs.readFileSync(cwd + '/customChecks/config/config.yml', 'utf8'));
  //   // if the user is trying to check a specific file but .yml is checking a directory
  //   if(fileName !== '.' && doc.directory){
  //     // make changes to the yml file
  //     doc['file'] = doc['directory']
  //     delete doc.directory
  //     doc.file[0] = fileName
  //   }else if(fileName !== '.'){
  //     doc.file[0] = fileName
  //   }
  
  //   // switch external checks folder to cwd/customChecks/etc
  //   // doc['external-checks-dir'] = doc['external-checks-git']
  //   // doc['external-checks-dir'][0] = 'df'
  //   // delete doc['external-checks-git']
    
  //    fs.writeFileSync(cwd + '/customChecks/config/config.yml', yaml.dump(doc));
    
  // } catch (e) {
  //   console.log(e);
  // }
  // }


export const checkovDirs = {
  "configType" : "yaml",
  "configDir" : '/customChecks/config/config.yml',
  "dirTitle" : 'directory',
  "fileTitle" : 'file'
}


  