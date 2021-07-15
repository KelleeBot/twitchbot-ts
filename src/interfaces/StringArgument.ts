export interface StringArgument {
  type: "STRING";
  id: string;
  amount?: number;
  prompt?: string;
  words?: string[];
  regexp?: RegExp;
}
