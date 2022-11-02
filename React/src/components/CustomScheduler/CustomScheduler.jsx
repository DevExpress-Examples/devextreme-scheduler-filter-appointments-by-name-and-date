import React, {useEffect} from "react";
import Scheduler from "devextreme-react/scheduler";
import {views, currentDate, startDayHour, endDayHour, scrolling, groups, resourcesData} from "./config";
import {data} from "../../data";

const CustomScheduler = (props) => {
    const {
        filterValue, dataSource, useDisable, setAppointments, startDate, endDate
    } = props;

    const filterAppointments = (startDate, endDate, filterValue, appointment) => {
        const isExistByDate = new Date(appointment.startDate) >= startDate && new Date(appointment.endDate) <= endDate;
        const isExistByText = appointment.text.toLowerCase().includes(filterValue);

        return isExistByDate && isExistByText;
    }

    const createFilteredAppointments = (startDate, endDate, filterValue, useDisable) => {
        return useDisable
            ?
            data.map(appointment => ({
                ...appointment,
                disabled: !filterAppointments(startDate, endDate, filterValue, appointment)
            }))
            :
            data.filter((appointment) => filterAppointments(startDate, endDate, filterValue, appointment));
    }

    useEffect(() => {
        setAppointments(createFilteredAppointments(startDate, endDate, filterValue, useDisable))
    }, [startDate, endDate, filterValue, useDisable]);

    return (<Scheduler
        dataSource={dataSource}
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
};

export default CustomScheduler;