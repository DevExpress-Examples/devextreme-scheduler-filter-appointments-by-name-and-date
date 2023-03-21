<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/617017018/22.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1155013)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# DataGrid for DevExtreme - How to drag multiple rows

This example demonstrates how to drag and drop multiple selected rows at once.

![grid-drag-multiple-rows](https://user-images.githubusercontent.com/13280527/226650938-08e5b3df-c543-4c56-b06c-aa4b97e8dd17.gif)

This implementation includes solutions for both local and remote data sources. It is based on our demos which illustrate how to drag a single row:
- [Demo: Local Reordering](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/LocalReordering/jQuery/Light/)
- [Demo: Remote Reordering](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RemoteReordering/jQuery/Light/)

describe an alternative for backend batch implementation


## Files to Review

- **jQuery**
	- [GridLocalData.js](jQuery/src/GridLocalData.js)
	- [GridRemoteData.js](jQuery/src/GridRemoteData.js)
- **Angular**
	- [data-grid-local-data.component.html](Angular/src/app/components/data-grid-local-data/data-grid-local-data.component.html)
	- [data-grid-local-data.component.ts](Angular/src/app/components/data-grid-local-data/data-grid-local-data.component.ts)
	- [data-grid-remote-data.component.html](Angular/src/app/components/data-grid-remote-data/data-grid-remote-data.component.html)
	- [data-grid-remote-data.component.ts](Angular/src/app/components/data-grid-remote-data/data-grid-remote-data.component.ts)
- **Vue**
	- [DataGridLocalData.vue](Vue/src/components/DataGridLocalData.vue)
	- [DataGridRemoteData.vue](Vue/src/components/DataGridRemoteData.vue)
- **React**
	- [DataGridLocalData.tsx](React/src/DataGridLocalData.tsx)
	- [DataGridRemoteData.tsx](React/src/DataGridRemoteData.tsx)
- **NetCore**    
	- [DataGridLocal.cshtml](ASP.NET_Core/Views/PartialViews/DataGridLocal.cshtml)
	- [DataGridRemote.cshtml](ASP.NET_Core/Views/PartialViews/DataGridRemote.cshtml)

## Documentation

[DataGrid.rowDragging](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/rowDragging/)

## More Examples

[DevExtreme TreeView - How to drag and drop multiple items](https://github.com/DevExpress-Examples/devextreme-treeview-drag-and-drop-multiple-items)
