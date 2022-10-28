import {resources, appointmentsText} from "./data";

const getRandomDuration = (durationState) => {
    const durationMin = Math.floor((durationState % 23) / 3 + 5) * 15;

    return durationMin * 60 * 1000;
};

const getRandomText = (textIndex) => {
    return appointmentsText[textIndex % appointmentsText.length];
};

const filterAppointmentsByTime = (appointments, startDayHour, endDayHour) => {
    const result = [];

    for (let i = 0; i < appointments.length; i++) {
        const startDate = appointments[i].startDate;
        const endDate = appointments[i].endDate;

        if (startDate.getDay() === endDate.getDay() &&
            startDate.getHours() >= startDayHour - 1 &&
            endDate.getHours() <= endDayHour - 1) {
            result.push(appointments[i]);
        }
    }

    return result;
};

export const generateAppointments = (startDay, endDay, startDayHour, endDayHour) => {
    const appointments = [];

    let textIndex = 0;
    let durationState = 1;
    const durationIncrement = 19;

    for (let i = 0; i < resources.length; i++) {
        let startDate = startDay;

        while (startDate.getTime() < endDay.getTime()) {
            durationState += durationIncrement;
            const endDate = new Date(startDate.getTime() + getRandomDuration(durationState));

            appointments.push({
                text: getRandomText(textIndex),
                startDate: startDate,
                endDate: endDate,
                humanId: resources[i].id
            });

            textIndex++;

            durationState += durationIncrement;
            startDate = new Date(endDate.getTime() + getRandomDuration(durationState));
        }
    }

    return filterAppointmentsByTime(appointments, startDayHour, endDayHour);
};


export const formatDate = (date) => Date.parse(date);