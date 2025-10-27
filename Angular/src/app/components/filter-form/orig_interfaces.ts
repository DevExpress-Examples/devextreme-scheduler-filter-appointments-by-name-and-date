export interface IFilterInputOptions {
  value: string;
  placeholder: string;
  onKeyUp: (event: OnKeyUpEvent) => void;
}

export interface IDateOptions {
  value: Date;
  onValueChanged: any;
}

export interface OnKeyUpEvent {
  event: { currentTarget: { value: string}};
}
