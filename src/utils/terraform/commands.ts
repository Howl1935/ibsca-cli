//** Make any changes to command line arguments here */

export const validateCommands = []
export const lintCommands = []
export const secureCommands = [
    {
        "command" : "checkov",
        "args" : ['--config-file', './customChecks/config/config.yml']
    },
  ]

  //grep -n '.' /customChecks/config/config.yml | cut -d '-' -f1
  //sed -i '6s/.*/    password: \'new_admin_pass\'/' /tmp/config.yml


  export const versions = 
  {
    secure : {
    "pkg" : "Checkov",
    "version" : "2.1.45",
    "command" : "checkov",
    "args" : ['--version'],
    "install" : "brew",
    "installCommands": ['install', 'checkov'],
    "resource": "https://www.checkov.io/1.Welcome/Quick%20Start.html"
  },
  validate : {
    "pkg" : "TFlint",
    "version" : "2.1.15",
    "command" : "checkov",
    "args" : ['--version'],
    "install" : "brew",
    "installCommands": ['install', 'checkov'],
    "resource" : ""
  }
}
  