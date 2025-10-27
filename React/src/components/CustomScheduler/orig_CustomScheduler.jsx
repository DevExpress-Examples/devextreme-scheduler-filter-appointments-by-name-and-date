import React, {useEffect} from 'react';
import Scheduler from 'devextreme-react/scheduler';
import {views, currentDate} from './config';

const CustomScheduler = (props) => {
    const {
        filterValue, dataSource, startDate, endDate
    } = props;

    useEffect(() => {
        dataSource.filter([
            ['text', 'contains', filterValue],
            'and',
            ['startDate', '>=', startDate],
            'and',
            ['endDate', '<=', endDate]
        ])
        dataSource.load()
    }, [filterValue, startDate, endDate, dataSource]);

    return (<Scheduler
        dataSource={dataSource}
        views={views}
        defaultCurrentView='month'
        defaultCurrentDate={currentDate}
        width='80%'
    />);
};

export default CustomScheduler;
