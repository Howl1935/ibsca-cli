#!/usr/bin/env node
import spawn from "cross-spawn";
const fs = require("fs-extra");
const path = require("path");
const cwd = process.cwd();
const check = (file: string) => fs.existsSync(path.join(cwd, file));
import { red, white, green, blue, yellow } from "./textColors";

import { makeMessCommand, cleanMessCommand } from "../configs/repoConfig";

export async function makeMess() {
  if (check("customChecks")) {
    green("customChecks already exists");
    console.log(" \n");
    return;
  } else {
    // download customChecks
    green("Getting external checks...");
    console.log(" \n");
    const dl = spawn.sync(makeMessCommand[0].command, makeMessCommand[0].args);
  }
}

export async function cleanMess() {
  if (check("customChecks")) {
    green("removing customChecks folder");
    console.log(" \n");
    const rm = spawn.sync(
      cleanMessCommand[0].command,
      cleanMessCommand[0].args,
      { stdio: "inherit" }
    );
    return;
  }
}
