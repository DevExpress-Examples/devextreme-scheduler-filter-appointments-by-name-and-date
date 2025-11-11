import { useMemo, useState } from 'react';
import {
  Form,
  GroupItem,
  SimpleItem,
  Label,
} from 'devextreme-react/form';
import { type DateBoxTypes } from 'devextreme-react/date-box';
import { type TextBoxTypes } from 'devextreme-react/text-box';
import type { FilterFormProps } from './interfaces';

function FilterForm(props: FilterFormProps): JSX.Element {
  const [filterValues, setFilterValues] = useState({
    text: '',
    startDate: new Date(2022, 9, 1),
    endDate: new Date(2022, 9, 28),
  });

  const textEditorOptions = useMemo<TextBoxTypes.Properties>(() => ({
    placeholder: 'Filter...',
    valueChangeEvent: 'keyup',
    value: filterValues.text,
    onValueChanged: (e: TextBoxTypes.ValueChangedEvent): void => {
      const newValues = { ...filterValues, text: e.value };
      setFilterValues(newValues);
      props.filterValuesChanged(newValues);
    },
  }), [filterValues, props]);

  const startDateOptions = useMemo<DateBoxTypes.Properties>(() => ({
    type: 'date',
    value: filterValues.startDate,
    onValueChanged: (e: DateBoxTypes.ValueChangedEvent): void => {
      const newValues = { ...filterValues, startDate: e.value };
      setFilterValues(newValues);
      props.filterValuesChanged(newValues);
    },
  }), [filterValues, props]);

  const endDateOptions = useMemo<DateBoxTypes.Properties>(() => ({
    type: 'date',
    value: filterValues.endDate,
    onValueChanged: (e: DateBoxTypes.ValueChangedEvent): void => {
      const newValues = { ...filterValues, endDate: e.value };
      setFilterValues(newValues);
      props.filterValuesChanged(newValues);
    },
  }), [filterValues, props]);

  return (
    <Form labelMode='outside' className='filter-form'>
      <GroupItem caption='Filter Appointments'>
        <SimpleItem
          editorType='dxTextBox'
          editorOptions={textEditorOptions}
        >
          <Label text='Text' />
        </SimpleItem>
        <SimpleItem
          editorType='dxDateBox'
          editorOptions={startDateOptions}
        >
          <Label text='Start Date' />
        </SimpleItem>
        <SimpleItem
          editorType='dxDateBox'
          editorOptions={endDateOptions}
        >
          <Label text='End Date' />
        </SimpleItem>
      </GroupItem>
    </Form>
  );
}

export default FilterForm;
