export interface IViewsOptions{
  type: string
}

export const currentDate: Date = new Date(2022, 9, 1);

export const views: IViewsOptions[] = [{
  type: "month"
}];

export interface IFilterInputOptions {
  placeholder: string
  onKeyUp: any
}

export interface IDateOptions {
  value: Date
  onValueChanged: any
}

export interface ICheckBoxOptions {
  value: boolean
  text: string
  onValueChanged: any
}
