import React, {useEffect, useState} from 'react';
import SchedulerWithoutSearch from './components/SchedulerWithoutSearch';
import {Form, GroupItem, SimpleItem} from 'devextreme-react/form';
import {formatDate, startDay, endDay} from './utils';
import {data} from './data';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

const App = () => {
    const [dates, setDates] = useState(data);
    const [searchValue, setSearchValue] = useState('');
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [startDate, setStartDate] = useState(formatDate(startDay));
    const [endDate, setEndDate] = useState(formatDate(endDay));

    useEffect(() => {
        if (checkBoxValue) {
            setDates(data.map((item) => {
                if (!item.text.toLowerCase().includes(searchValue.toLowerCase())) {
                    return {...item, disabled: true}
                }
                return item
            }))
        } else {
            setDates(data.filter(function (e) {
                return e.text.toLowerCase().includes(searchValue.toLowerCase());
            }));
        }
    }, [searchValue, checkBoxValue])

    useEffect(() => {
        setDates(data.filter((item) => {
            return formatDate(item.startDate) >= startDate && formatDate(item.endDate) <= endDate
        }));
    }, [startDate, setEndDate])

    const employee = {
        search: searchValue,
    };

    const onSearchValueChanged = ({event}) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleValueChange = () => {
        setCheckBoxValue(!checkBoxValue);
    }

    const handleStartDateChange = (e) => {

        setStartDate(formatDate(e))
    }

    const handleEndDateChange = (e) => {
        setEndDate(formatDate(e))
    }

    const filterInputOptions = {
        placeholder: 'Filter...',
        onKeyUp: onSearchValueChanged
    };

    const checkBoxOptions = {
        value: checkBoxValue,
        text: 'Disabled Mode',
        onValueChanged: handleValueChange
    }

    const startDateOptions = {
        onValueChanged: handleStartDateChange,
        type: 'datetime',
        placeholder: '11/23/2022, 1:54 PM'
    }

    const endDateOptions = {
        onValueChanged: handleEndDateChange,
        type: 'datetime',
        placeholder: '12/30/2022, 3:26 PM'
    }

    return (
        <div className='container'>
            <SchedulerWithoutSearch
                searchValue={searchValue}
                dataSource={dates}
            />
            <Form
                formData={employee}
                labelMode='hidden'
                width='100%'
            >
                <GroupItem>
                    <SimpleItem
                        dataField='search'
                        editorOptions={filterInputOptions}
                    />
                    <SimpleItem
                        editorType='dxCheckBox'
                        editorOptions={checkBoxOptions}
                    />
                    <GroupItem>
                        <SimpleItem
                            editorType='dxDateBox'
                            editorOptions={startDateOptions}
                        />
                        <SimpleItem
                            editorType='dxDateBox'
                            editorOptions={endDateOptions}
                        />
                    </GroupItem>
                </GroupItem>
            </Form>
        </div>
    );
}

export default App;
