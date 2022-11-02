import React, {memo, useMemo} from "react";
import {Form, GroupItem, SimpleItem} from "devextreme-react/form";
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
        type: 'datetime',
        placeholder: '11/23/2022, 1:54 PM',
        value: startViewDate
    }), [onStartDateChange]);

    const endDateOptions = useMemo(() => ({
        onValueChanged: onEndDateChange,
        type: 'datetime',
        value: endViewDate
    }), [onEndDateChange]);

    return (
        <Form>
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