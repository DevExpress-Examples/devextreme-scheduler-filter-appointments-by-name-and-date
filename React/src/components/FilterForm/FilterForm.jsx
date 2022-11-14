import React, {memo, useMemo} from "react";
import {Form, GroupItem, SimpleItem, Label} from "devextreme-react/form";
import {startViewDate, endViewDate} from "../../config";

const FilterForm = memo((props) => {
    const {
        onFilterValueChanged,
        onCheckboxChange,
        onStartDateChange,
        onEndDateChange,
        useDisable
    } = props;

    const filterInputOptions = useMemo(() => ({
        placeholder: 'Filter...',
        onKeyUp: onFilterValueChanged
    }), [onFilterValueChanged]);

    const checkBoxOptions = useMemo(() => ({
        value: useDisable,
        text: 'Disable appointment are not filtered',
        onValueChanged: onCheckboxChange
    }), [useDisable, onCheckboxChange]);

    const startDateOptions = useMemo(() => ({
        onValueChanged: onStartDateChange,
        type: 'date',
        value: startViewDate
    }), [onStartDateChange]);

    const endDateOptions = useMemo(() => ({
        onValueChanged: onEndDateChange,
        type: 'date',
        value: endViewDate
    }), [onEndDateChange]);

    return (
        <Form>
            <GroupItem>
                <SimpleItem
                    editorType='dxTextBox'
                    editorOptions={filterInputOptions}
                >
                    <Label text='Text'/>
                </SimpleItem>
                <SimpleItem
                    editorType='dxDateBox'
                    editorOptions={startDateOptions}
                >
                    <Label text='Start Date'/>
                </SimpleItem>
                <SimpleItem
                    editorType='dxDateBox'
                    editorOptions={endDateOptions}
                >
                    <Label text='End Date'/>
                </SimpleItem>
                <SimpleItem
                    editorType='dxCheckBox'
                    editorOptions={checkBoxOptions}
                />
            </GroupItem>
        </Form>
    )
});

export default FilterForm;
