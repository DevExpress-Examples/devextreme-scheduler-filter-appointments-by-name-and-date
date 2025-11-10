$(() => {
  const filterEditorValueChanged = () => {
    filterAppointments(
      form.getEditor('text').option('value'),
      form.getEditor('startDate').option('value'),
      form.getEditor('endDate').option('value'),
    );
  };

  const filterTextBoxSettings = {
    dataField: 'text',
    editorType: 'dxTextBox',
    label: {
      text: 'Text',
    },
    value: '',
    editorOptions: {
      placeholder: 'Filter...',
      valueChangeEvent: 'keyup',
      onValueChanged: filterEditorValueChanged,
    },
  };
  const startDateSettings = {
    dataField: 'startDate',
    editorType: 'dxDateBox',
    value: new Date(2022, 9, 1),
    label: {
      text: 'Start Date',
    },
    editorOptions: {
      type: 'date',
      onValueChanged: filterEditorValueChanged,
    },
  };
  const endDateSettings = {
    dataField: 'endDate',
    editorType: 'dxDateBox',
    value: new Date(2022, 9, 28),
    label: {
      text: 'End Date',
    },
    editorOptions: {
      type: 'date',
      onValueChanged: filterEditorValueChanged,
    },
  };

  const form = $('#form').dxForm({
    formData: defaultFormData,
    colCount: 1,
    labelMode: 'outside',
    items: [{
      itemType: 'group',
      caption: 'Filter Appointments',
      items: [
        filterTextBoxSettings,
        startDateSettings,
        endDateSettings,
      ],
    }],
  }).dxForm('instance');

  $('#scheduler').dxScheduler({
    dataSource,
    views: [{
      type: 'month',
    }],
    width: '80%',
    currentView: 'month',
    currentDate: new Date(2022, 9, 1),
  }).dxScheduler('instance');
});

const filterAppointments = (filterValue, startDate, endDate) => {
  dataSource.filter([
    ['text', 'contains', filterValue],
    'and',
    ['startDate', '>=', startDate],
    'and',
    ['endDate', '<=', endDate],
  ]);
  dataSource.load();
};

const defaultFormData = {
  text: '',
  startDate: new Date(2022, 9, 1),
  endDate: new Date(2022, 9, 28),
};

const dataSource = new DevExpress.data.DataSource({
  store: {
    type: 'array',
    data,
  },
  paginate: false,
});
