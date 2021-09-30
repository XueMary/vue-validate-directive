export type Callback = (error: string|Error)=>void

export type Rule = {
  trigger?: string | string[];
  required?:boolean,
  message?: string,
  max?:number,
  min?:number
  test?: (value:any)=>boolean,
  validator?: Validator
};

export type Validator = (rule: Rule, value: any, callback: Callback) => any

export type BindingValue = {
  prop?: string;
  rules: Rule[];
  value: any;
};
export type Binding = {
  value: BindingValue;
  oldValue: BindingValue;
};

export type DomItem = {
  element: Element;
  rules: Rule[];
  value: any;
};
export type AllDom = Record<string, DomItem[]>;

