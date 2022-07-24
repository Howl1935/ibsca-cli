import type { Arguments, CommandBuilder } from "yargs";
import { languageClassCreator } from "../utils/helpers/languageClassCreator";
import { makeMess, cleanMess } from "../utils/helpers/repoDownload";
import { errorMessage } from "../utils/errorMessage";
import { getExtension } from "../utils/commandLineHelper";
import { languageType } from "../utils/helpers/utilExtensionTypeQuestions";
import { checkHelper } from "./checkHelper";
type Options = {
  fileName: string;
};
// details for yargs run command
export const command: string = "secure <fileName>";
export const desc: string = "Runs Ibotta custom checks against current file.";
export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({})
    .positional("fileName", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fileName } = argv;
  const vls = "secure";
  const languageClass = await checkHelper(fileName, vls);
  if (languageClass) {
    // pull checks from github
    makeMess();
    //validate that packages are installed.
    if (languageClass.checkVersion(vls)) {
      // if this passes we can run all checks.
      await languageClass.secure();
    } else {
      errorMessage("Secure function didn't work.");
    }

    // remove cloned github repo
    cleanMess();
    process.exit(0);
  } 
};
