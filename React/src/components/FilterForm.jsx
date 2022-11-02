import React, {memo, useMemo} from "react";
import {Form, GroupItem, SimpleItem} from "devextreme-react/form";
import {startDay, endDay} from "../config";

const FilterForm = memo((props) => {
    const {
        onSearchValueChanged,
        onHandleCheckboxChange,
        onHandleStartDateChange,
        onHandleEndDateChange,
        checkBoxValue
    } = props;

    const filterInputOptions = useMemo(() => ({
        placeholder: 'Filter...',
        onKeyUp: onSearchValueChanged
    }), [onSearchValueChanged]);

    const checkBoxOptions = useMemo(() => ({
        value: checkBoxValue,
        text: 'Disable appointment are not filtered',
        onValueChanged: onHandleCheckboxChange
    }), [checkBoxValue, onHandleCheckboxChange]);

    const startDateOptions = useMemo(() => ({
        onValueChanged: onHandleStartDateChange,
        type: 'datetime',
        placeholder: '11/23/2022, 1:54 PM',
        value: startDay
    }), [onHandleStartDateChange]);

    const endDateOptions = useMemo(() => ({
        onValueChanged: onHandleEndDateChange,
        type: 'datetime',
        value: endDay
    }), [onHandleEndDateChange]);

    return (
        <Form
            width='100%'
        >
            <GroupItem>
                <SimpleItem
                    dataField='Text'
                    editorOptions={filterInputOptions}
                />
                <GroupItem>
                    <SimpleItem
                        dataField='Start date'
                        editorType='dxDateBox'
                        editorOptions={startDateOptions}
                    />
                    <SimpleItem
                        dataField='End date'
                        editorType='dxDateBox'
                        editorOptions={endDateOptions}
                    />
                </GroupItem>
                <SimpleItem
                    editorType='dxCheckBox'
                    editorOptions={checkBoxOptions}
                />
            </GroupItem>
        </Form>
    )
});

export default FilterForm;