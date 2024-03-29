/** This is the terraform native "cartridge" make any changes to how it is implemented here */

export function commands(fName: string, configDir : string): any {
  // pull any resources you may need from pkData here
  const {} = pkgData;
  // enter all sequential commands to run plugin here.
  return [
    {
      command: "terraform",
      args: ["fmt", "-diff", [fName]],
    },
  ];
}
// Details for each package that are used for communicating information to user.
// The program will:
// 1. check if package exists
// 2. compare its version
// 3. if not installed, try and install with given package manager
//    if that package manager is not installed it will direct user to reference page to install.

export const pkgData = {
  pkg: "Terraform",
  version: "2.1.45",
  command: "terraform",
  args: ["--version"],
  install: "brew",
  installCommands: ["install", "checkov"],
  resource: "https://www.terraform.io/language/syntax/style",
  configType: "",
  configFile: "",
  configDir: "",
  dirTitle: "directory",
  fileTitle: "file",
  directorySearch: true,
  fileCheck : true
};
