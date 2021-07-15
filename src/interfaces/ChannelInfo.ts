export interface ChannelInfo {
  prefix: string;

  /** Array with all disabled command names */
  disabledCommands: string[];

  /** Contains all the custom command permissions for a command */
  commandPerms?: { [name: string]: string[] };

  /** Contains all custom role cooldowns for a command */
  commandCooldowns?: {
    [nameOfTheCommand: string]: { [id: string]: number };
  };

  /** Contains all custom command aliases */
  commandAlias?: { [alias: string]: string };
}
