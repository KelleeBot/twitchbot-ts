import { ExecuteParameters } from "../types/ExecuteParameters";
import { Arguments } from "../types/Arguments";

export interface Command {
  name: string;
  aliases?: string[];
  category: string;
  cooldown?: number;
  usage?: string;
  description?: string;
  globalCooldown?: boolean;
  canNotDisable?: boolean;
  canNotSetCooldown?: boolean;
  canNotAddAlias?: boolean;
  hideCommand?: boolean;
  isModOnly?: boolean;
  devOnly?: boolean;
  channels?: string[];
  arguments?: Arguments;
  execute(p: ExecuteParameters): any;
}
