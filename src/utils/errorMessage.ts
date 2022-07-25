import {
    red,
  } from "../utils/helpers/utilTextColors";

export function errorMessage(err: string) {
    red(`${err}`);
  }