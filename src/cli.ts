#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { red, white, green, blue, yellow } from './utils/cli/textColors';

// get current version of ibsca
// yargs.version(version)
//console.log(chalk.red("This is red..."))


const cliSpinners = require('cli-spinners');

//console.log(cliSpinners.dots);
/** Here is were all the details for Yargs CLI library is implented.
 * Visit http://yargs.js.org/ for references.
 */

yargs(hideBin(process.argv))
  // .usage('Usage: $0 <command> [options]')
  // .example('$0 run sample.tf', 'Validate, Secure, and Lint sample.tf')
  // // Details for run command
  // .command('run <file.tf>', 'Run all SCA checks (Validate, Lint, Secure) on specified file.  Currently supports terraform.')
  // .example('$0 run file.tf', 'Run sample.tf to ensure standard coding practices.')
  // // Details for validate command
  // .command('validate <file.tf>', 'Only validate infrastructure to ensure standard coding practices for Ibotta.')
  // .example('$0 validate file.tf', 'Scan file.tf to ensure standard coding practices.')
  // // Details for lint command
  // .command('lint <file.tf>', 'Only lint infrastructure to ensure standard coding practices for Ibotta.')
  // .example('$0 secure file.tf', 'Lint sample.tf to confirm it checks against Ibotta styling guidelines.')
  // // Details for secure command
  // .command('secure <file.tf>', 'Only scan infrastructure to find misconfigurations before deployment.')
  // .example('$0 secure file.tf', 'Scan file.tf for misconfigurations.')
  // // Details for run command
  // .command('run <.>', 'Run all SCA checks (Validate, Lint, Secure) on current directory.  Currently supports terraform.')
  // .example('$0 run .', 'Runs all checks on current directory.')
  // .command('run <.>', 'Run all SCA checks (Validate, Lint, Secure) on current directory.  Currently supports terraform.')
  // // Details for validate command
  // .command('validate <.>', 'Validate all files in current directory to ensure standard coding practices for Ibotta.')
  // .example('$0 validate .', 'Scan files in current directory to ensure standard coding practices.')
  // // Details for lint command
  // .command('lint <.>', 'Lint all files in current directory to ensure standard coding practices for Ibotta.')
  // .example('$0 secure .', 'Scan files in current directory against Ibotta styling guidelines.')
  // // Details for secure command
  // .command('secure <.>', 'Scan all files in current directory to find misconfigurations before deployment.')
  // .example('$0 secure .', 'Scan current directory for misconfigurations.')
  // Use the commands directory to scaffold.
  .commandDir('commands')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' })
  .alias({ v: 'version' })
  .argv;

