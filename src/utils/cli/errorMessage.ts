import {
    red,
  } from "./textColors";

export function errorMessage(err: string) {
    red(`${err}`);
  }