import {data} from "./data.js";

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
                filterAppointments(
                    e.component.option('text'),
                    form.getEditor('startDate').option('value'),
                    form.getEditor('endDate').option('value')
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
            onValueChanged: () => {
                filterAppointments(
                    form.getEditor('text').option('value'),
                    form.getEditor('startDate').option('value'),
                    form.getEditor('endDate').option('value')
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
            onValueChanged: () => {
                filterAppointments(
                    form.getEditor('text').option('value'),
                    form.getEditor('startDate').option('value'),
                    form.getEditor('endDate').option('value')
                );
            }
        },
    };

    const form = $('#form').dxForm({
        formData: defaultFormData,
        colCount: 1,
        labelMode: 'outside',
        items: [{
            itemType: 'group',
            caption: 'Filtering appointments',
            items: [
                filterTextBoxSettings,
                startDateSettings,
                endDateSettings
            ],
        }],
    }).dxForm('instance');

    $('#scheduler').dxScheduler({
        dataSource: filterDataSource,
        views: [{
            type: 'month'
        }],
        width: '80%',
        currentView: 'month',
        currentDate: new Date(2022, 9, 1),
    }).dxScheduler('instance');
});

const filterAppointments = (filterValue, startDate, endDate) => {
    filterDataSource.filter([
        ['text', 'contains', filterValue],
        'and',
        ['startDate', '>=', startDate],
        'and',
        ['endDate', '<=', endDate]
    ])
    filterDataSource.load()
};

const defaultFormData = {
    text: '',
    startDate: new Date(2022, 9, 1),
    endDate: new Date(2022, 9, 28),
};

const filterDataSource = new DevExpress.data.DataSource({
    store: {
        type: 'array',
        data: data,
    },
    paginate: false,
})
