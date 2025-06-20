const RemoteGrid = {
    updateInProgress: false,
    KEY_EXPR: "ID",
    dragStart: function(e) {
        const selectedData = e.component.getSelectedRowsData().sort((a, b) => a.OrderIndex > b.OrderIndex ? 1 : -1);
        e.itemData = RemoteGrid.getVisibleRowValues(selectedData, e.component);
        e.cancel = !RemoteGrid.canDrag(e);
    },
    dragChange: function(e) {
        e.cancel = !RemoteGrid.canDrop(e);
    },
    reorder: function(e) {
        e.promise = RemoteGrid.updateOrderIndex(e);
        if (RemoteGrid.shouldClearSelection())
            e.component.clearSelection();
    },
    dragTemplate: function(dragData) {
        const itemsContainer = $("<table>").addClass("drag-container");
        dragData.itemData.forEach((rowData => {
            const itemContainer = $("<tr>");
            for (field in rowData) {
                itemContainer.append($("<td>").text(rowData[field]));
            }
            itemsContainer.append(itemContainer);
        }));
        return $("<div>").append(itemsContainer);
    },
    updateOrderIndex: async function(e) {
        const visibleRows = e.component.getVisibleRows();
        const newOrderIndex = visibleRows[e.toIndex].data.OrderIndex;
        const store = e.component.getDataSource().store();
        RemoteGrid.updateInProgress = true;
        e.component.beginCustomLoading("Loading...");
        for (let i = 0; i < e.itemData.length; i++) {
            debugger
            await store.update(e.itemData[i][RemoteGrid.KEY_EXPR], { OrderIndex: newOrderIndex });
        }
        e.component.refresh().then(() => {
            e.component.endCustomLoading();
            RemoteGrid.updateInProgress = false;
        });
    },
    canDrag: function(e) {
        if (RemoteGrid.updateInProgress) return false;
        const visibleRows = e.component.getVisibleRows();
        return visibleRows.some(r => r.isSelected && r.rowIndex === e.fromIndex);
    },
    canDrop: function (e) {
        const visibleRows = e.component.getVisibleRows();
        return !visibleRows.some(r => r.isSelected && r.rowIndex === e.toIndex);
    },
    getVisibleRowValues: function(rowsData, grid) {
        const visbileColumns = grid.getVisibleColumns();
        const selectedData = rowsData.map(rowData => {
            const visibleValues = {};
            visbileColumns.forEach(column => {
                visibleValues[column.dataField] = RemoteGrid.getVisibleCellValue(column, rowData);
            });
            return visibleValues;
        });
        return selectedData;
    },
    getVisibleCellValue: function(column, rowData) {
        const cellValue = rowData[column.dataField];
        return column.lookup ? column.lookup.calculateCellValue(cellValue) : cellValue;
    },
    shouldClearSelection: function () {
        return $("#clearAfterDropSwitch").dxSwitch("option", "value");
    },
    beforeSend: function(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
    }
}
