$(() => {
  function createTabItemTemplate(contentID) {
    return $('<div>').attr('id', contentID).addClass('tab-item-content');
  }
  $('#tabPanel').dxTabPanel({
    deferRendering: false,
    items: [{
      title: 'Local Data',
      template() {
        return createTabItemTemplate('gridLocalData');
      },
    }, {
      title: 'Remote Data',
      template() {
        return createTabItemTemplate('gridRemoteData');
      },
    }],
  });
  $('#clear-after-drop-switch').dxSwitch({});
});
