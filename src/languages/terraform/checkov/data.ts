/** This is the checkov "cartridge" make any changes to how it is implemented here */

export function commands(fName: string, configDirectory: string) {
  // pull any resources you may need from pkData here
  const {} = pkgData;
  // enter all sequential commands to run plugin here.
  return [
    {
      command: "checkov",
      args: ["--config-file", configDirectory],
    },
  ];
}

export const pkgData = {
  pkg: "Checkov",
  version: "2.1.45",
  command: "checkov",
  args: ["--version"],
  install: "brew",
  installCommands: ["install", "checkov"],
  resource: "https://www.checkov.io/1.Welcome/Quick%20Start.html",
  configType: "yaml",
  configFile: "config.yml",
  configDir: "./customChecks/terraform/checkov/config/",
  dirTitle: "directory",
  fileTitle: "file",
  directorySearch: true,
  fileCheck : true
};
