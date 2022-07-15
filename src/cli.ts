#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from './utils/utilIbscaVersion';
import chalk from "chalk";
// get current version of ibsca
 yargs.version(version)
//console.log(chalk.red("This is red..."))


const cliSpinners = require('cli-spinners');

//console.log(cliSpinners.dots);
/** Here is were all the details for Yargs CLI library is implented.
 * Visit http://yargs.js.org/ for references.
 */

yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .example('$0 run sample.tf', 'Validate, Secure, and Lint sample.tf')  

  // Details for validate command
  .command('validate', 'Only scan infrastructure to ensure standard coding practices for Ibotta.')
  .example('$0 validate sample.tf', 'Scan sample.tf to ensure standard coding practices.')  
  // Details for lint command
  .command('lint', 'Only lint infrastructure to check that code conforms to Ibotta styling guidelines before deployment.')
  .example('$0 secure sample.tf', 'Lint sample.tf to confirm it checks against Ibotta styling guidelines.')
  // Details for secure command
  .command('secure', 'Only scan infrastructure to find misconfigurations before deployment.')
  .example('$0 secure sample.tf', 'Scan sample.tf for misconfigurations.')
  // Use the commands directory to scaffold.
  .commandDir('commands')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' })
  .alias({ v: 'version' })
  .argv;

