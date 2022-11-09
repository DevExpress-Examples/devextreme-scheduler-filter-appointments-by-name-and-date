import React, {useEffect} from "react";
import Scheduler from "devextreme-react/scheduler";
import {views, currentDate} from "./config";
import {data} from "../../data";

const filterAppointments = (startDate, endDate, filterValue, appointment) => {
    const isExistByDate = new Date(appointment.startDate) >= startDate && new Date(appointment.endDate) <= endDate;
    const isExistByText = appointment.text.toLowerCase().includes(filterValue);

    return isExistByDate && isExistByText;
}

const createFilteredAppointments = (startDate, endDate, filterValue, useDisable) => {
    if (useDisable)
        return data.map(appointment => ({
            ...appointment,
            disabled: !filterAppointments(startDate, endDate, filterValue, appointment)
        }));
    return data.filter((appointment) => filterAppointments(startDate, endDate, filterValue, appointment));
}

const CustomScheduler = (props) => {
    const {
        filterValue, dataSource, useDisable, setAppointments, startDate, endDate
    } = props;

    useEffect(() => {
        setAppointments(createFilteredAppointments(startDate, endDate, filterValue, useDisable))
    }, [setAppointments, startDate, endDate, filterValue, useDisable]);

    return (<Scheduler
        dataSource={dataSource}
        views={views}
        defaultCurrentView="month"
        defaultCurrentDate={currentDate}
        width='80%'
    />);
};

export default CustomScheduler;