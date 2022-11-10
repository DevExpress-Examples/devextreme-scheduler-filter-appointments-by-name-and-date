$(() => {
    const filterTextBoxSettings = {
        dataField: 'text',
        editorType: 'dxTextBox',
        label: {
            text: 'Text',
            location: 'left',
        },
        value: '',
        editorOptions: {
            placeholder: 'Filter...',
            onKeyUp: (e) => {
                updateSchedulerDataSource(
                    form.getEditor('startDate').option('value'),
                    form.getEditor('endDate').option('value'),
                    form.getEditor('checkBox').option('value'),
                    e.component.option('text'),
                    scheduler
                );
            }
        }
    };
    const startDateSettings = {
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
                const textInputValue = form.getEditor('text').option('value');

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
    };
    const endDateSettings = {
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
                const textInputValue = form.getEditor('text').option('value');

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
    };
    const checkBoxSettings = {
        dataField: 'checkBox',
        editorType: 'dxCheckBox',
        value: false,
        label: {
            text: 'Disable appointment are not filtered',
            location: 'left',
        },
        editorOptions: {
            onValueChanged: (e) => {
                const textInputValue = form.getEditor('text').option('value');

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
    };

    const form = $('#form').dxForm({
        formData: employees,
        colCount: 1,
        labelMode: 'outside',
        items: [{
            itemType: 'group',
            caption: 'Filtering appointments',
            items: [
                filterTextBoxSettings,
                startDateSettings,
                endDateSettings,
                checkBoxSettings
            ],
        }],
    }).dxForm('instance');

    const scheduler = $('#scheduler').dxScheduler({
        dataSource: data,
        views: [{
            type: 'month'
        }],
        width: '80%',
        currentView: 'month',
        currentDate: new Date(2022, 9, 1),
    }).dxScheduler('instance');
});

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
    scheduler.option('dataSource', data.filter((appointment) => filterAppointments(startDate, endDate, filterValue, appointment)));
};

const data = [
    {
        "text": "Brochure Design Review",
        "startDate": new Date(2022, 9, 1),
        "endDate": new Date(2022, 9, 1),
    },
    {
        "text": "Website Re-Design Plan",
        "startDate": new Date(2022, 9, 1),
        "endDate": new Date(2022, 9, 1),
    },
    {
        "text": "Rollout of New Website and Marketing Brochures",
        "startDate": new Date(2022, 9, 1),
        "endDate": new Date(2022, 9, 1),
    },
    {
        "text": "Update NDA Agreement",
        "startDate": new Date(2022, 9, 2),
        "endDate": new Date(2022, 9, 2),
    },
    {
        "text": "Update Employee Files with New NDA",
        "startDate": new Date(2022, 9, 2),
        "endDate": new Date(2022, 9, 2),
    },
    {
        "text": "Comment on Revenue Projections",
        "startDate": new Date(2022, 9, 3),
        "endDate": new Date(2022, 9, 3),
    },
    {
        "text": "Provide New Health Insurance Docs",
        "startDate": new Date(2022, 9, 3),
        "endDate": new Date(2022, 9, 3),
    },
    {
        "text": "Review Changes to Health Insurance Coverage",
        "startDate": new Date(2022, 9, 3),
        "endDate": new Date(2022, 9, 3),
    },
    {
        "text": "Review Customer Feedback Report",
        "startDate": new Date(2022, 9, 4),
        "endDate": new Date(2022, 9, 4),
    },
    {
        "text": "Customer Feedback Report Analysis",
        "startDate": new Date(2022, 9, 4),
        "endDate": new Date(2022, 9, 4),
    },
    {
        "text": "Prepare Shipping Cost Analysis Report",
        "startDate": new Date(2022, 9, 4),
        "endDate": new Date(2022, 9, 4),
    },
    {
        "text": "Get Design for Shipping Return Labels",
        "startDate": new Date(2022, 9, 7),
        "endDate": new Date(2022, 9, 8),
    },
    {
        "text": "PSD needed for Shipping Return Labels",
        "startDate": new Date(2022, 9, 7),
        "endDate": new Date(2022, 9, 7),
    },
    {
        "text": "Contact ISP and Discuss Payment Options",
        "startDate": new Date(2022, 9, 7),
        "endDate": new Date(2022, 9, 7),
    },
    {
        "text": "Training Material Distribution Schedule",
        "startDate": new Date(2022, 9, 8),
        "endDate": new Date(2022, 9, 8),
    },
    {
        "text": "Create New Spike for Automation Server",
        "startDate": new Date(2022, 9, 8),
        "endDate": new Date(2022, 9, 8),
    },
    {
        "text": "Send 2 Remotes for Giveaways",
        "startDate": new Date(2022, 9, 8),
        "endDate": new Date(2022, 9, 10),
    },
    {
        "text": "Discuss Product Giveaways with Management",
        "startDate": new Date(2022, 9, 9),
        "endDate": new Date(2022, 9, 9),
    },
    {
        "text": "Replace Desktops on the 3rd Floor",
        "startDate": new Date(2022, 9, 9),
        "endDate": new Date(2022, 9, 9),
    },
    {
        "text": "Territory Sales Breakdown Report",
        "startDate": new Date(2022, 9, 10),
        "endDate": new Date(2022, 9, 10),
    },
    {
        "text": "Report on the State of Engineering Dept",
        "startDate": new Date(2022, 9, 10),
        "endDate": new Date(2022, 9, 10),
    },
    {
        "text": "Brochure Design Review",
        "startDate": new Date(2022, 9, 11),
        "endDate": new Date(2022, 9, 11),
    },
    {
        "text": "Website Re-Design Plan",
        "startDate": new Date(2022, 9, 11),
        "endDate": new Date(2022, 9, 11),
    },
    {
        "text": "Customer Feedback Report Analysis",
        "startDate": new Date(2022, 9, 14),
        "endDate": new Date(2022, 9, 14),
    },
    {
        "text": "Prepare Shipping Cost Analysis Report",
        "startDate": new Date(2022, 9, 14),
        "endDate": new Date(2022, 9, 14),
    },
    {
        "text": "Upgrade Server Hardware",
        "startDate": new Date(2022, 9, 15),
        "endDate": new Date(2022, 9, 15),
    },
    {
        "text": "Upgrade Personal Computers",
        "startDate": new Date(2022, 9, 15),
        "endDate": new Date(2022, 9, 15),
    },
    {
        "text": "Upgrade Apps to Windows RT or stay with WinForms",
        "startDate": new Date(2022, 9, 15),
        "endDate": new Date(2022, 9, 15),
    },
    {
        "text": "Create Icons for Website",
        "startDate": new Date(2022, 9, 16),
        "endDate": new Date(2022, 9, 16),
    },
    {
        "text": "Create New Product Pages",
        "startDate": new Date(2022, 9, 17),
        "endDate": new Date(2022, 9, 17),
    },
    {
        "text": "Approve Website Launch",
        "startDate": new Date(2022, 9, 16),
        "endDate": new Date(2022, 9, 16),
    },
    {
        "text": "PSD needed for Shipping Return Labels",
        "startDate": new Date(2022, 9, 17),
        "endDate": new Date(2022, 9, 17),

    },
    {
        "text": "Contact ISP and Discuss Payment Options",
        "startDate": new Date(2022, 9, 13),
        "endDate": new Date(2022, 9, 13),

    },
    {
        "text": "Prepare Year-End Support Summary Report",
        "startDate": new Date(2022, 9, 27),
        "endDate": new Date(2022, 9, 27),

    },
    {
        "text": "Approval on Converting to New HDMI Specification",
        "startDate": new Date(2022, 9, 18),
        "endDate": new Date(2022, 9, 18),

    },
    {
        "text": "Create New Spike for Automation Server",
        "startDate": new Date(2022, 9, 18),
        "endDate": new Date(2022, 9, 18),

    },
    {
        "text": "Send 2 Remotes for Giveaways",
        "startDate": new Date(2022, 9, 19),
        "endDate": new Date(2022, 9, 19),
    },
    {
        "text": "Website Re-Design Plan",
        "startDate": new Date(2022, 9, 21),
        "endDate": new Date(2022, 9, 21),
    },
    {
        "text": "Rollout of New Website and Marketing Brochures",
        "startDate": new Date(2022, 9, 21),
        "endDate": new Date(2022, 9, 21),
    },
    {
        "text": "Update Sales Strategy Documents",
        "startDate": new Date(2022, 9, 21),
        "endDate": new Date(2022, 9, 21),
    },
    {
        "text": "Update Employee Files with New NDA",
        "startDate": new Date(2022, 9, 22),
        "endDate": new Date(2022, 9, 22),
    },
    {
        "text": "Submit Questions Regarding New NDA",
        "startDate": new Date(2022, 9, 22),
        "endDate": new Date(2022, 9, 22),
    },
    {
        "text": "Provide New Health Insurance Docs",
        "startDate": new Date(2022, 9, 23),
        "endDate": new Date(2022, 9, 23),
    },
    {
        "text": "Review Changes to Health Insurance Coverage",
        "startDate": new Date(2022, 9, 23),
        "endDate": new Date(2022, 9, 23),
    },
    {
        "text": "Review Training Course for any Ommissions",
        "startDate": new Date(2022, 9, 20),
        "endDate": new Date(2022, 9, 20),
    },
    {
        "text": "Customer Feedback Report Analysis",
        "startDate": new Date(2022, 9, 24),
        "endDate": new Date(2022, 9, 24),
    },
    {
        "text": "Prepare Shipping Cost Analysis Report",
        "startDate": new Date(2022, 9, 24),
        "endDate": new Date(2022, 9, 24),
    },
    {
        "text": "Provide Feedback on Shippers",
        "startDate": new Date(2022, 9, 24),
        "endDate": new Date(2022, 9, 24),
    },
    {
        "text": "Upgrade Personal Computers",
        "startDate": new Date(2022, 9, 25),
        "endDate": new Date(2022, 9, 25),
    },
    {
        "text": "Upgrade Apps to Windows RT or stay with WinForms",
        "startDate": new Date(2022, 9, 25),
        "endDate": new Date(2022, 9, 25),
    },
    {
        "text": "Estimate Time Required to Touch-Enable Apps",
        "startDate": new Date(2022, 9, 25),
        "endDate": new Date(2022, 9, 25),
    },
    {
        "text": "Approve Website Launch",
        "startDate": new Date(2022, 10, 25),
        "endDate": new Date(2022, 10, 25),
    }
];