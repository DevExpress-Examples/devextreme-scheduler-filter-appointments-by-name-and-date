import {resources} from "./data";

export const currentDate = new Date(2022, 9, 1);

export const resourcesData = [{
    fieldExpr: "humanId", dataSource: resources, label: "Employee"
}];

export const scrolling = {mode: "virtual"};

export const groups = ["humanId"];

export const startDay = new Date(2022, 9, 1);

export const endDay = new Date(2022, 9, 28);

export const startDayHour = 8;

export const endDayHour = 20;

export const formatDate = (date) => Date.parse(date);

export const views = [{
    type: "month", groupOrientation: "horizontal"
}];