export interface FilterValues {
  text: string;
  startDate: Date;
  endDate: Date;
}

export interface FilterFormProps {
  // eslint-disable-next-line no-unused-vars
  filterValuesChanged: (values: FilterValues) => void;
}
