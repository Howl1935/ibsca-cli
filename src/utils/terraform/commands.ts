//** Make any changes to command line arguments here */

export const validateCommands = []
export const lintCommands = []
export const secureCommands = [
    {
      "command" : "npm",
      "args" : ['list', '-g', '-depth', '0']
    },
    {
      "command" : "git",
      "args" : ['clone', 'https://github.com/Howl1935/customChecks.git']
    },
    {
        "command" : "checkov",
        "args" : ['-f','--config-file', './customChecks/config/config.yml']
    },
    {
        "command" : "rm",
        "args" : ['-rf', 'customChecks']
    },

  ]

  //grep -n '.' /customChecks/config/config.yml | cut -d '-' -f1
  //sed -i '6s/.*/    password: \'new_admin_pass\'/' /tmp/config.yml
