import React from "react";
import Scheduler from "devextreme-react/scheduler";
import {views, currentDate, startDayHour, endDayHour, scrolling, groups, resourcesData} from "../utils";

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
};

export default SchedulerWithoutSearch;