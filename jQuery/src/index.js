$(() => {
    const form = $('#form').dxForm({
        formData: employees,
        colCount: 1,
        labelMode: 'outside',
        items: [{
            itemType: 'group',
            caption: 'Filtering appointments',
            items: [{
                dataField: 'text',
                editorType: 'dxTextBox',
                label: {
                    text: 'Text',
                    location: 'left',
                },
                value: '',
                editorOptions: {
                    placeholder: 'Filter...',
                    onKeyUp: ({event}) => {
                        updateSchedulerDataSource(
                            form.getEditor('startDate').option('value'),
                            form.getEditor('endDate').option('value'),
                            form.getEditor('checkBox').option('value'),
                            event.target.value,
                            scheduler
                        );
                    }
                }
            }, {
                dataField: 'startDate',
                editorType: 'dxDateBox',
                value: new Date(2022, 9, 1),
                label: {
                    text: 'Start Date',
                    location: 'left',
                },
                editorOptions: {
                    type: 'date',
                    onValueChanged: (e) => {
                        textInputValue = form.getEditor('text').option('value');

                        form.option(form.getEditor('startDate').option('value'), e.value);

                        updateSchedulerDataSource(
                            form.getEditor('startDate').option('value'),
                            form.getEditor('endDate').option('value'),
                            form.getEditor('checkBox').option('value'),
                            textInputValue,
                            scheduler
                        );
                    }
                },
            }, {
                dataField: 'endDate',
                editorType: 'dxDateBox',
                value: new Date(2022, 9, 28),
                label: {
                    text: 'End Date',
                    location: 'left',
                },
                editorOptions: {
                    type: 'date',
                    onValueChanged: (e) => {
                        textInputValue = form.getEditor('text').option('value');

                        form.option(form.getEditor('endDate').option('value'), e.value);

                        updateSchedulerDataSource(
                            form.getEditor('startDate').option('value'),
                            form.getEditor('endDate').option('value'),
                            form.getEditor('checkBox').option('value'),
                            textInputValue,
                            scheduler
                        );
                    }
                },
            }, {
                dataField: 'checkBox',
                editorType: 'dxCheckBox',
                value: false,
                label: {
                    text: 'Disable appointment are not filtered',
                    location: 'left',
                },
                editorOptions: {
                    onValueChanged: (e) => {
                        textInputValue = form.getEditor('text').option('value');

                        form.option(form.getEditor('checkBox').option('value'), e.value);

                        updateSchedulerDataSource(
                            form.getEditor('startDate').option('value'),
                            form.getEditor('endDate').option('value'),
                            form.getEditor('checkBox').option('value'),
                            textInputValue,
                            scheduler
                        );
                    }
                }
            }],
        }],
    }).dxForm('instance');

    const scheduler = $('#scheduler').dxScheduler({
        timeZone: 'America/Los_Angeles',
        width: '80%',
        dataSource: data,
        views: [{
            type: 'month',
            groupOrientation: 'horizontal'
        }],
        currentView: 'month',
        currentDate: new Date(2022, 9, 1),
        startDayHour: 1,
        endDayHour: 23,
        height: 600,
    }).dxScheduler('instance');
});

let textInputValue;

const employees = {
    text: '',
    startDate: new Date(2022, 9, 1),
    endDate: new Date(2022, 9, 28),
    checkBox: false,
};

const filterAppointments = (startDate, endDate, filterValue, appointment) => {
    const isExistByDate = new Date(appointment.startDate) >= startDate && new Date(appointment.endDate) <= endDate;
    const isExistByText = appointment.text.toLowerCase().includes(filterValue.toLowerCase());

    return isExistByDate && isExistByText;
};

const updateSchedulerDataSource = (startDate, endDate, useDisable, filterValue, scheduler) => {
    if (useDisable)
        return scheduler.option('dataSource', data.map(appointment => ({
            ...appointment,
            disabled: !filterAppointments(startDate, endDate, filterValue, appointment)
        })));
    return scheduler.option('dataSource', data.filter((appointment) => filterAppointments(startDate, endDate, filterValue, appointment)));
};

const data = [
    {
        'text': 'Brochure Design Review',
        'startDate': '2022-10-01T05:15:00.000Z',
        'endDate': '2022-10-01T06:45:00.000Z',
    },
    {
        'text': 'Website Re-Design Plan',
        'startDate': '2022-10-01T08:00:00.000Z',
        'endDate': '2022-10-01T10:45:00.000Z',
    },
    {
        'text': 'Rollout of New Website and Marketing Brochures',
        'startDate': '2022-10-01T13:15:00.000Z',
        'endDate': '2022-10-01T15:15:00.000Z',
    },
    {
        'text': 'Update NDA Agreement',
        'startDate': '2022-10-02T06:15:00.000Z',
        'endDate': '2022-10-02T07:30:00.000Z',
    },
    {
        'text': 'Update Employee Files with New NDA',
        'startDate': '2022-10-02T10:30:00.000Z',
        'endDate': '2022-10-02T13:00:00.000Z',
    },
    {
        'text': 'Comment on Revenue Projections',
        'startDate': '2022-10-03T03:30:00.000Z',
        'endDate': '2022-10-03T05:15:00.000Z',
    },
    {
        'text': 'Provide New Health Insurance Docs',
        'startDate': '2022-10-03T06:45:00.000Z',
        'endDate': '2022-10-03T08:00:00.000Z',
    },
    {
        'text': 'Review Changes to Health Insurance Coverage',
        'startDate': '2022-10-03T10:45:00.000Z',
        'endDate': '2022-10-03T13:15:00.000Z',
    },
    {
        'text': 'Review Customer Feedback Report',
        'startDate': '2022-10-04T04:30:00.000Z',
        'endDate': '2022-10-04T06:15:00.000Z',
    },
    {
        'text': 'Customer Feedback Report Analysis',
        'startDate': '2022-10-04T07:30:00.000Z',
        'endDate': '2022-10-04T10:30:00.000Z',
    },
    {
        'text': 'Prepare Shipping Cost Analysis Report',
        'startDate': '2022-10-04T13:00:00.000Z',
        'endDate': '2022-10-04T15:15:00.000Z',
    },
    {
        'text': 'Get Design for Shipping Return Labels',
        'startDate': '2022-10-07T03:30:00.000Z',
        'endDate': '2022-10-08T05:15:00.000Z',
    },
    {
        'text': 'PSD needed for Shipping Return Labels',
        'startDate': '2022-10-07T06:45:00.000Z',
        'endDate': '2022-10-07T08:00:00.000Z',
    },
    {
        'text': 'Contact ISP and Discuss Payment Options',
        'startDate': '2022-10-07T10:45:00.000Z',
        'endDate': '2022-10-07T13:15:00.000Z',
    },
    {
        'text': 'Training Material Distribution Schedule',
        'startDate': '2022-10-08T04:30:00.000Z',
        'endDate': '2022-10-08T06:15:00.000Z',
    },
    {
        'text': 'Create New Spike for Automation Server',
        'startDate': '2022-10-08T13:00:00.000Z',
        'endDate': '2022-10-08T15:15:00.000Z',
    },
    {
        'text': 'Send 2 Remotes for Giveaways',
        'startDate': '2022-10-09T05:15:00.000Z',
        'endDate': '2022-10-10T06:45:00.000Z',
    },
    {
        'text': 'Discuss Product Giveaways with Management',
        'startDate': '2022-10-09T08:00:00.000Z',
        'endDate': '2022-10-09T10:45:00.000Z',
    },
    {
        'text': 'Replace Desktops on the 3rd Floor',
        'startDate': '2022-10-09T13:15:00.000Z',
        'endDate': '2022-10-09T15:15:00.000Z',
    },
    {
        'text': 'Territory Sales Breakdown Report',
        'startDate': '2022-10-10T06:15:00.000Z',
        'endDate': '2022-10-10T07:30:00.000Z',
    },
    {
        'text': 'Report on the State of Engineering Dept',
        'startDate': '2022-10-10T10:30:00.000Z',
        'endDate': '2022-10-10T13:00:00.000Z',
    },
    {
        'text': 'Brochure Design Review',
        'startDate': '2022-10-11T03:30:00.000Z',
        'endDate': '2022-10-11T05:15:00.000Z',
    },
    {
        'text': 'Website Re-Design Plan',
        'startDate': '2022-10-11T06:45:00.000Z',
        'endDate': '2022-10-11T08:00:00.000Z',
    },
    {
        'text': 'Customer Feedback Report Analysis',
        'startDate': '2022-10-14T06:15:00.000Z',
        'endDate': '2022-10-14T07:30:00.000Z',
    },
    {
        'text': 'Prepare Shipping Cost Analysis Report',
        'startDate': '2022-10-14T10:30:00.000Z',
        'endDate': '2022-10-14T13:00:00.000Z',
    },
    {
        'text': 'Upgrade Server Hardware',
        'startDate': '2022-10-15T03:30:00.000Z',
        'endDate': '2022-10-15T05:15:00.000Z',
    },
    {
        'text': 'Upgrade Personal Computers',
        'startDate': '2022-10-15T06:45:00.000Z',
        'endDate': '2022-10-15T08:00:00.000Z',
    },
    {
        'text': 'Upgrade Apps to Windows RT or stay with WinForms',
        'startDate': '2022-10-15T10:45:00.000Z',
        'endDate': '2022-10-15T13:15:00.000Z',
    },
    {
        'text': 'Create Icons for Website',
        'startDate': '2022-10-16T04:30:00.000Z',
        'endDate': '2022-10-16T06:15:00.000Z',
    },
    {
        'text': 'Create New Product Pages',
        'startDate': '2022-10-17T07:30:00.000Z',
        'endDate': '2022-10-17T10:30:00.000Z',
    },
    {
        'text': 'Approve Website Launch',
        'startDate': '2022-10-16T13:00:00.000Z',
        'endDate': '2022-10-16T15:15:00.000Z',
    },
    {
        'text': 'PSD needed for Shipping Return Labels',
        'startDate': '2022-10-17T05:15:00.000Z',
        'endDate': '2022-10-17T06:45:00.000Z',
    },
    {
        'text': 'Contact ISP and Discuss Payment Options',
        'startDate': '2022-10-13T08:00:00.000Z',
        'endDate': '2022-10-13T10:45:00.000Z',
    },
    {
        'text': 'Prepare Year-End Support Summary Report',
        'startDate': '2022-10-27T13:15:00.000Z',
        'endDate': '2022-10-27T15:15:00.000Z',
    },
    {
        'text': 'Approval on Converting to New HDMI Specification',
        'startDate': '2022-10-18T06:15:00.000Z',
        'endDate': '2022-10-18T07:30:00.000Z',
    },
    {
        'text': 'Create New Spike for Automation Server',
        'startDate': '2022-10-18T10:30:00.000Z',
        'endDate': '2022-10-18T13:00:00.000Z',
    },
    {
        'text': 'Send 2 Remotes for Giveaways',
        'startDate': '2022-10-19T03:30:00.000Z',
        'endDate': '2022-10-19T05:15:00.000Z',
    },
    {
        'text': 'Website Re-Design Plan',
        'startDate': '2022-10-21T05:15:00.000Z',
        'endDate': '2022-10-21T06:45:00.000Z',
    },
    {
        'text': 'Rollout of New Website and Marketing Brochures',
        'startDate': '2022-10-21T08:00:00.000Z',
        'endDate': '2022-10-21T10:45:00.000Z',
    },
    {
        'text': 'Update Sales Strategy Documents',
        'startDate': '2022-10-21T13:15:00.000Z',
        'endDate': '2022-10-21T15:15:00.000Z',
    },
    {
        'text': 'Update Employee Files with New NDA',
        'startDate': '2022-10-22T06:15:00.000Z',
        'endDate': '2022-10-22T07:30:00.000Z',
    },
    {
        'text': 'Submit Questions Regarding New NDA',
        'startDate': '2022-10-22T10:30:00.000Z',
        'endDate': '2022-10-22T13:00:00.000Z',
    },
    {
        'text': 'Provide New Health Insurance Docs',
        'startDate': '2022-10-23T03:30:00.000Z',
        'endDate': '2022-10-23T05:15:00.000Z',
    },
    {
        'text': 'Review Changes to Health Insurance Coverage',
        'startDate': '2022-10-23T06:45:00.000Z',
        'endDate': '2022-10-23T08:00:00.000Z',
    },
    {
        'text': 'Review Training Course for any Ommissions',
        'startDate': '2022-10-20T10:45:00.000Z',
        'endDate': '2022-10-20T13:15:00.000Z',
    },
    {
        'text': 'Customer Feedback Report Analysis',
        'startDate': '2022-10-24T04:30:00.000Z',
        'endDate': '2022-10-24T06:15:00.000Z',
    },
    {
        'text': 'Prepare Shipping Cost Analysis Report',
        'startDate': '2022-10-24T07:30:00.000Z',
        'endDate': '2022-10-24T10:30:00.000Z',
    },
    {
        'text': 'Provide Feedback on Shippers',
        'startDate': '2022-10-24T13:00:00.000Z',
        'endDate': '2022-10-24T15:15:00.000Z',
    },
    {
        'text': 'Upgrade Personal Computers',
        'startDate': '2022-10-25T05:15:00.000Z',
        'endDate': '2022-10-25T06:45:00.000Z',
    },
    {
        'text': 'Upgrade Apps to Windows RT or stay with WinForms',
        'startDate': '2022-10-25T08:00:00.000Z',
        'endDate': '2022-10-25T10:45:00.000Z',
    },
    {
        'text': 'Estimate Time Required to Touch-Enable Apps',
        'startDate': '2022-10-25T13:15:00.000Z',
        'endDate': '2022-10-25T15:15:00.000Z',
    },
    {
        'text': 'Approve Website Launch',
        'startDate': '2022-10-26T10:30:00.000Z',
        'endDate': '2022-10-26T13:00:00.000Z',
    }
];