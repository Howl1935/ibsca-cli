#!/usr/bin/env node
import spawn from 'cross-spawn'
const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();
const check = (file: string) => fs.existsSync(path.join(cwd, file));

import { makeMessCommand, cleanMessCommand } from './utilCommands'

export async function makeMess(){
    if(check('customChecks')){
        console.log('customChecks already exists')
        return;
    }else{
        // download customChecks
        const dl = spawn.sync(makeMessCommand[0].command, makeMessCommand[0].args, { stdio: 'inherit' });
    }

}

export async function cleanMess(){
    if(check('customChecks')){
        console.log('removing customChecks folder')
        const rm = spawn.sync(cleanMessCommand[0].command, cleanMessCommand[0].args, { stdio: 'inherit' });

        return;
    }else{
        // download customChecks
    }

}