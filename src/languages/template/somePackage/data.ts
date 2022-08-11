/** This is the template "cartridge" make any changes to how it is implemented here */

export function commands(fName: string, configDir: string) {
  // pull any resources you may need from pkData here
  const {} = pkgData;
  // enter all sequential commands to run plugin here.
  return [
    {
      command: "",
      args: ["", ""],
    },
  ];
}

export const pkgData = {
  pkg: "",
  version: "",
  command: "",
  args: [""],
  install: "",
  installCommands: [""],
  resource: "",
  configType: "",
  configFile: "",
  configDir: "",
  dirTitle: "",
  fileTitle: "",
  directorySearch: false,
  fileCheck : true

};
 