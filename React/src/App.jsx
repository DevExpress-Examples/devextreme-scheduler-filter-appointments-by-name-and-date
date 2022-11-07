import React, {useState, useCallback} from 'react';
import CustomScheduler from './components/CustomScheduler';
import FilterForm from './components/FilterForm';
import {startViewDate, endViewDate} from './config';
import {data} from './data';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

const App = () => {
    const [appointments, setAppointments] = useState(data);
    const [filterValue, setFilterValue] = useState('');
    const [useDisable, setUseDisable] = useState(false);
    const [startDate, setStartDate] = useState(startViewDate);
    const [endDate, setEndDate] = useState(endViewDate);

    const onFilterValueChanged = useCallback(({event}) => {
        setFilterValue(event.currentTarget.value.toLowerCase());
    }, []);

    const onCheckboxChange = useCallback(() => {
        setUseDisable(!useDisable);
    }, [useDisable]);

    const onStartDateChange = useCallback((e) => {
        setStartDate(e.value);
    }, []);

    const onEndDateChange = useCallback((e) => {
        setEndDate(e.value);
    }, []);

    return (
        <div className='container'>
            <CustomScheduler
                filterValue={filterValue}
                dataSource={appointments}
                setAppointments={setAppointments}
                useDisable={useDisable}
                startDate={startDate}
                endDate={endDate}
            />
            <FilterForm
                onFilterValueChanged={onFilterValueChanged}
                onCheckboxChange={onCheckboxChange}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
                useDisable={useDisable}
            />
        </div>
    );
}

export default App;
