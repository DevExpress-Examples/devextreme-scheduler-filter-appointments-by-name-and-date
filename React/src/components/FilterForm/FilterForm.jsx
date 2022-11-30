import React, {memo, useMemo} from "react";
import {Form, GroupItem, SimpleItem, Label} from "devextreme-react/form";
import {startViewDate, endViewDate} from "../../config";

const FilterForm = memo((props) => {
    const {
        onTextValueChanged,
        onStartDateChange,
        onEndDateChange
    } = props;

    const filterInputOptions = useMemo(() => ({
        placeholder: 'Filter...',
        onKeyUp: onTextValueChanged
    }), [onTextValueChanged]);

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
            </GroupItem>
        </Form>
    )
});

export default FilterForm;
