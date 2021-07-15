export interface NumberArgument {
  type: "NUMBER";
  id: string;
  amount?: number;
  prompt?: string;
  min?: number;
  max?: number;
  toInteger?: boolean;
}
