import React from "react";
import Scheduler from "devextreme-react/scheduler";
import {views, currentDate, startDayHour, endDayHour, scrolling, groups, resourcesData} from "../config";

const CustomScheduler = (props) => {
    return (<Scheduler
        dataSource={props.dataSource}
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