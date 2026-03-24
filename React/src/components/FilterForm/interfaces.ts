export interface FilterValues {
  text: string;
  startDate: Date;
  endDate: Date;
}

export interface FilterFormProps {
  filterValuesChanged: (values: FilterValues) => void;
}
