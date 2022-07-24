import {
    red,
    white,
    green,
    blue,
    yellow,
  } from "../utils/helpers/utilTextColors";

export function errorMessage(err: string) {
    red(`Not a valid extension. Failed at ${err}`);
    //process.exit(0);
  }