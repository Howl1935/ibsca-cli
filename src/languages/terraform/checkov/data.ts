/** This is the checkov "cartridge" make any changes to how it is implemented here */

export function checkov(fName: string) {
  return [
    {
      command: "checkov",
      args: ["--config-file", "./customChecks/config/config.yml"],
    },
  ];
}

export const checkovData = {
  pkg: "Checkov",
  version: "2.1.45",
  command: "checkov",
  args: ["--version"],
  install: "brew",
  installCommands: ["install", "checkov"],
  resource: "https://www.checkov.io/1.Welcome/Quick%20Start.html",
  configType: "yaml",
  configDir: "/customChecks/terraform/checkov/config/config.yml",
  dirTitle: "directory",
  fileTitle: "file",
  directorySearch: false,
};
