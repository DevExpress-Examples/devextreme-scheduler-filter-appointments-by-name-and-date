import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

import Scheduler from "devextreme-react/scheduler";
import TextBox from "devextreme-react/text-box";
import CheckBox from 'devextreme-react/check-box';
import DateBox from 'devextreme-react/date-box';

import {resources} from "./data";
import {generateAppointments, formatDate} from "./utils";

const currentDate = new Date(2021, 1, 2);
const views = [{
    type: "timelineWorkWeek", name: "Timeline", groupOrientation: "vertical"
}, {
    type: "workWeek", groupOrientation: "vertical"
}, {
    type: "month", groupOrientation: "horizontal"
}];

const resourcesData = [{
    fieldExpr: "humanId", dataSource: resources, label: "Employee"
}];

const scrolling = {mode: "virtual"};

const groups = ["humanId"];

const startDay = new Date(2021, 1, 1);
const endDay = new Date(2021, 1, 28);
const startDayHour = 8;
const endDayHour = 20;

const appointments = generateAppointments(startDay, endDay, startDayHour, endDayHour);

const SchedulerWithoutSearch = (props) => {

    return (<Scheduler
        dataSource={props.dataSource}
        height={600}
        views={views}
        defaultCurrentView="Timeline"
        defaultCurrentDate={currentDate}
        startDayHour={startDayHour}
        endDayHour={endDayHour}
        cellDuration={60}
        showAllDayPanel={false}
        scrolling={scrolling}
        groups={groups}
        resources={resourcesData}
        templatesRenderAsynchronously={false}
        width='80%'
    />);
}

const SearchBoxForScheduler = (props) => {
    return (<TextBox
        mode="search"
        valueChangeEvent="input"
        value={props.searchValue}
        onValueChanged={props.onSearchValueChanged}
        placeholder="search..."
        width='100%'
    />);
}

const App = () => {
    const [dates, setDates] = useState(appointments);
    const [searchValue, setSearchValue] = useState('');
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [startDate, setStartDate] = useState(formatDate(startDay));
    const [endDate, setEndDate] = useState(formatDate(endDay));

    useEffect(() => {
        if (checkBoxValue) {
            setDates(appointments.map((item) => {
                if (!item.text.toLowerCase().includes(searchValue.toLowerCase())) {
                    return {...item, disabled: true}
                }
                return item
            }))
        } else {
            setDates(appointments.filter(function (e) {
                return e.text.toLowerCase().includes(searchValue.toLowerCase());
            }));
        }
    }, [searchValue, checkBoxValue])

    useEffect(() => {
        setDates(appointments.filter((item) => {
            return formatDate(item.startDate) >= startDate && formatDate(item.endDate) <= endDate
        }));
    },[startDate, setEndDate])

    const onSearchValueChanged = (e) => {
        setSearchValue(e.value);
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

    return (<div className='container'>
        <SchedulerWithoutSearch
            searchValue={searchValue}
            dataSource={dates}
        />
        <div className='tooltip'>
            <SearchBoxForScheduler
                searchValue={searchValue}
                onSearchValueChanged={onSearchValueChanged}
            />
            <CheckBox
                text="Disabled Mode"
                value={checkBoxValue}
                onValueChanged={handleValueChange}
            />
            <DateBox
                type="datetime"
                placeholder="Start Date"
                showClearButton={true}
                useMaskBehavior={true}
                onValueChange={handleStartDateChange}
            />
            <DateBox
                type="datetime"
                placeholder="End Date"
                showClearButton={true}
                useMaskBehavior={true}
                onValueChange={handleEndDateChange}
            />
        </div>
    </div>);
}

export default App;
