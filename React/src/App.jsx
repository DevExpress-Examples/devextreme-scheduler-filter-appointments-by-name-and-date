import React, {useEffect, useState, useCallback} from 'react';
import CustomScheduler from './components/CustomScheduler';
import FilterForm from './components/FilterForm';
import {formatDate, startDay, endDay} from './config';
import {data} from './data';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

const App = () => {
    const [appointments, setAppointments] = useState(data);
    const [searchValue, setSearchValue] = useState('');
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [startDate, setStartDate] = useState(formatDate(startDay));
    const [endDate, setEndDate] = useState(formatDate(endDay));

    useEffect(() => {
        if (checkBoxValue) {
            setAppointments(data.filter(item =>
                formatDate(item.startDate) >= startDate &&
                formatDate(item.endDate) <= endDate
            ).map(item => !item.text.toLowerCase().includes(searchValue.toLowerCase()) ?
                {...item, disabled: true} :
                item
            ))
        } else {
            setAppointments(data.filter(item =>
                item.text.toLowerCase().includes(searchValue.toLowerCase()) &&
                (formatDate(item.startDate) >= startDate && formatDate(item.endDate) <= endDate)
            ));
        }
    }, [searchValue, checkBoxValue, startDate, endDate])

    const onSearchValueChanged = useCallback(({event}) => {
        setSearchValue(event.currentTarget.value);
    }, []);

    const onHandleCheckboxChange = useCallback(() => {
        setCheckBoxValue(!checkBoxValue);
    }, [checkBoxValue]);

    const onHandleStartDateChange = useCallback((e) => {
        setStartDate(formatDate(e.value));
    }, []);

    const onHandleEndDateChange = useCallback((e) => {
        setEndDate(formatDate(e));
    }, []);

    return (
        <div className='container'>
            <CustomScheduler
                searchValue={searchValue}
                dataSource={appointments}
            />
            <FilterForm
                onSearchValueChanged={onSearchValueChanged}
                onHandleCheckboxChange={onHandleCheckboxChange}
                onHandleStartDateChange={onHandleStartDateChange}
                onHandleEndDateChange={onHandleEndDateChange}
                checkBoxValue={checkBoxValue}
            />
        </div>
    );
}

export default App;
