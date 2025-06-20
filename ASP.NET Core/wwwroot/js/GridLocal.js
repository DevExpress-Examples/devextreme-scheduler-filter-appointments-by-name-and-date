const LocalGrid = {
    KEY_EXPR: "ID",
    dragStart: function(e) {
        const selectedData = e.component.getSelectedRowsData();
        e.itemData = LocalGrid.getVisibleRowValues(selectedData, e.component);
        e.cancel = !LocalGrid.canDrag(e);
    },
    dragChange: function(e) {
        e.cancel = !LocalGrid.canDrop(e);
    },
    reorder: function(e) {
        const fullDataToInsert = [];
        e.itemData.forEach(rowData => {
            const indexToRemove = customers.findIndex(item => item[LocalGrid.KEY_EXPR] === rowData[LocalGrid.KEY_EXPR]);
            fullDataToInsert.push(customers[indexToRemove]);
            customers.splice(indexToRemove, 1);
        });
        const toIndex = LocalGrid.calculateToIndex(customers, e);
        customers.splice(toIndex, 0, ...fullDataToInsert);
        e.component.refresh();
        if (LocalGrid.shouldClearSelection())
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
    canDrag: function(e) {
        const visibleRows = e.component.getVisibleRows();
        return visibleRows.some(r => r.isSelected && r.rowIndex === e.fromIndex);
    },
    canDrop: function(e) {
        const visibleRows = e.component.getVisibleRows();
        return !visibleRows.some(r => r.isSelected && r.rowIndex === e.toIndex);
    },
    calculateToIndex: function(dataArray, e) {
        const visibleRows = e.component.getVisibleRows();
        const toIndex = dataArray.findIndex((item) => item[LocalGrid.KEY_EXPR] === visibleRows[e.toIndex].data[LocalGrid.KEY_EXPR]);
        return e.fromIndex >= e.toIndex ? toIndex : toIndex + 1;
    },
    getVisibleRowValues: function(rowsData, grid) {
        const visbileColumns = grid.getVisibleColumns();
        const selectedData = rowsData.map(rowData => {
            const visibleValues = {};
            visbileColumns.forEach(column => {
                visibleValues[column.dataField] = LocalGrid.getVisibleCellValue(column, rowData);
            });
            return visibleValues;
        });
        return selectedData;
    },
    getVisibleCellValue: function(column, rowData) {
        const cellValue = rowData[column.dataField];
        return column.lookup ? column.lookup.calculateCellValue(cellValue) : cellValue;
    },
    shouldClearSelection: function() {
        return $("#clearAfterDropSwitch").dxSwitch("option", "value");
    }
}
