import {resources} from "./data";

export const currentDate = new Date(2021, 1, 2);

export const resourcesData = [{
    fieldExpr: "humanId", dataSource: resources, label: "Employee"
}];

export const scrolling = {mode: "virtual"};

export const groups = ["humanId"];

export const startDay = new Date(2021, 1, 1);

export const endDay = new Date(2021, 1, 28);

export const startDayHour = 8;

export const endDayHour = 20;

export const formatDate = (date) => Date.parse(date);

export const views = [{
    type: "timelineWorkWeek", name: "Timeline", groupOrientation: "vertical"
}, {
    type: "workWeek", groupOrientation: "vertical"
}, {
    type: "month", groupOrientation: "horizontal"
}];