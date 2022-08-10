#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/** Here is were all the details for Yargs CLI library is implented.
 * Visit http://yargs.js.org/ for references.
 */

yargs(hideBin(process.argv))
  .commandDir('commands')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' })
  .alias({ v: 'version' })
  .argv;

