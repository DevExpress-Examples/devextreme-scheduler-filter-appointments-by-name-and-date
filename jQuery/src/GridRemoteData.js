$(() => {
  const KEY_EXPR = 'ID';
  // const url = 'http://localhost:5555/api/DataGridRowReordering';
  const url = 'https://js.devexpress.com/Demos/Mvc/api/RowReordering';
  const tasksStore = DevExpress.data.AspNet.createStore({
    key: KEY_EXPR,
    loadUrl: `${url}/Tasks`,
    updateUrl: `${url}/UpdateTask`,
    onBeforeSend(method, ajaxOptions) {
      ajaxOptions.xhrFields = { withCredentials: true };
    },
  });
  const employeesStore = DevExpress.data.AspNet.createStore({
    key: 'ID',
    loadUrl: `${url}/Employees`,
    onBeforeSend(method, ajaxOptions) {
      ajaxOptions.xhrFields = { withCredentials: true };
    },
  });
  let updateInProgress = false;

  $('#gridRemoteData').dxDataGrid({
    height: 480,
    dataSource: tasksStore,
    remoteOperations: true,
    scrolling: { mode: 'virtual' },
    sorting: { mode: 'none' },
    rowDragging: {
      allowReordering: true,
      onDragStart(e) {
        const selectedData = e.component.getSelectedRowsData()
          .sort((a, b) => (a.OrderIndex > b.OrderIndex ? 1 : -1));
        e.itemData = getVisibleRowValues(selectedData, e.component);
        e.cancel = !canDrag(e);
      },
      dragTemplate(dragData) {
        const itemsContainer = $('<table>').addClass('drag-container');
        dragData.itemData.forEach(((rowData) => {
          const itemContainer = $('<tr>');
          // eslint-disable-next-line no-restricted-syntax, guard-for-in
          for (const field in rowData) {
            itemContainer.append($('<td>').text(rowData[field]));
          }
          itemsContainer.append(itemContainer);
        }));
        return $('<div>').append(itemsContainer);
      },
      onDragChange(e) {
        e.cancel = !canDrop(e);
      },
      onReorder(e) {
        e.promise = updateOrderIndex(e);
        if (shouldClearSelection()) { e.component.clearSelection(); }
      },
    },
    selection: { mode: 'multiple' },
    columns: [{
      dataField: 'ID',
      width: 55,
    }, {
      dataField: 'Owner',
      lookup: {
        dataSource: employeesStore,
        valueExpr: 'ID',
        displayExpr: 'FullName',
      },
      width: 150,
    }, {
      dataField: 'AssignedEmployee',
      caption: 'Assignee',
      lookup: {
        dataSource: employeesStore,
        valueExpr: 'ID',
        displayExpr: 'FullName',
      },
      width: 150,
    }, 'Subject'],
  });
  async function updateOrderIndex(e) {
    const visibleRows = e.component.getVisibleRows();
    const newIndex = visibleRows[e.toIndex].data.OrderIndex;
    const store = e.component.getDataSource().store();
    updateInProgress = true;
    e.component.beginCustomLoading('Loading...');
    const update = e.itemData.map((item) => store.update(item[KEY_EXPR], { OrderIndex: newIndex }));
    await Promise.all(update);
    e.component.refresh().then(() => {
      e.component.endCustomLoading();
      updateInProgress = false;
    });
  }
  function canDrag(e) {
    if (updateInProgress) return false;
    const visibleRows = e.component.getVisibleRows();
    return visibleRows.some((r) => r.isSelected && r.rowIndex === e.fromIndex);
  }
  function canDrop(e) {
    const visibleRows = e.component.getVisibleRows();
    return !visibleRows.some((r) => r.isSelected && r.rowIndex === e.toIndex);
  }
  function getVisibleRowValues(rowsData, grid) {
    const visibleColumns = grid.getVisibleColumns();
    const selectedData = rowsData.map((rowData) => {
      const visibleValues = {};
      visibleColumns.forEach((column) => {
        visibleValues[column.dataField] = getVisibleCellValue(column, rowData);
      });
      return visibleValues;
    });
    return selectedData;
  }
  function getVisibleCellValue(column, rowData) {
    const cellValue = rowData[column.dataField];
    return column.lookup ? column.lookup.calculateCellValue(cellValue) : cellValue;
  }
  function shouldClearSelection() {
    return $('#clear-after-drop-switch').dxSwitch('option', 'value');
  }
});
