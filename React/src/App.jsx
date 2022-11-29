import React, {useState, useCallback} from 'react';
import CustomScheduler from './components/CustomScheduler';
import FilterForm from './components/FilterForm';
import DataSource from 'devextreme/data/data_source';
import {startViewDate, endViewDate} from './config';
import {data} from './data';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';

const defaultData = new DataSource({
    store: {
        type: 'array',
        data: data,
    },
    paginate: false,
})

const App = () => {
    const [filterValue, setFilterValue] = useState('');
    const [startDate, setStartDate] = useState(startViewDate);
    const [endDate, setEndDate] = useState(endViewDate);

    const onFilterValueChanged = useCallback(({event}) => {
        setFilterValue(event.currentTarget.value.toLowerCase());
    }, []);

    const onStartDateChange = useCallback((e) => {
        setStartDate(e.value);
    }, []);

    const onEndDateChange = useCallback((e) => {
        setEndDate(e.value)
    }, []);

    return (
        <div className='container'>
            <CustomScheduler
                dataSource={defaultData}
                filterValue={filterValue}
                startDate={startDate}
                endDate={endDate}
            />
            <FilterForm
                onFilterValueChanged={onFilterValueChanged}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
            />
        </div>
    );
}

export default App;
