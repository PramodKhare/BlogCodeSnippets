/*var UIDValueRenderer = function(value, metaData, record, rowIndex, colIndex,
    store, view) {
  return value.split(" ")[0];
};*/

Ext.define('PriorArt.view.DocumentListGridPanel', {
      extend : 'Ext.grid.Panel',
      xtype : 'patent-list-grid',
      stripeRows : true,
      layout : 'fit',
      autoDestroy : true,
      header : false,
      store : new PriorArt.store.DocumentListGridStore({}),
      selModel : new Ext.selection.CheckboxModel({
            mode : "MULTI"
          }),
      tbar : [{
            text : 'Group Documents',
            tooltip : 'Group documents',
            iconCls : 'ux-edit-search-query-actioncolumn-cls'
          }, '-', {
            text : 'Save Prior Art',
            tooltip : 'Save prior art',
            iconCls : 'ux-add-multi-priot-art-toolbar-btn-cls'
          }],
      columns : [{
            menuDisabled : true,
            sortable : false,
            xtype : 'actioncolumn',
            width : 80,
            items : [{
                  iconCls : 'ux-error-actioncolumn-cls',
                  handler : function(grid, rowIndex, colIndex) {
                    // First Action column handler
                  }
                }, {
                  iconCls : 'ux-open-details-actioncolumn-cls',
                  handler : function(grid, rowIndex, colIndex) {
                    // second Action column
                  }
                }, {
                  iconCls : 'ux-pdf-view-actioncolumn-cls',
                  handler : function(grid, rowIndex, colIndex) {
                    // third Action Column
                  }
                }, {
                  iconCls : 'ux-add-priot-art-actioncolumn-cls',
                  tooltip : 'Add Prior Art',
                  handler : function(grid, rowIndex, colIndex) {
                    // Add prior art
                    var window = Ext.create('PriorArt.view.AddPriorArtWindow',
                        {
                          applicationNumber : 'IN1049/CHENP/2012 20120201'
                        });
                    window.show();
                  }
                }]
          }, {
            text : "application_no",
            flex : 1,
            renderer : function(value, metaData, record, rowIndex, colIndex,
                store, view) {
              return value.split(" ")[0];
            },
            dataIndex : 'UID'
          }, {
            text : "Title",
            flex : 1,
            dataIndex : 'title'
          }, {
            text : "Published Date",
            dataIndex : 'pubDate'
          }, {
            text : "Assignee",
            dataIndex : 'assignee'
          }],
      plugins : [{
        ptype : 'rowexpander',
        rowBodyTpl : new Ext.XTemplate('<p><b>application_no :</b> {UID} </p>',
            '<p><b>Title:</b> {title} </p>',
            '<p><b>pubDate :</b> {pubDate}</p>')
      }],
      viewConfig : {
        deferEmptyText : true,
        emptyText : "No documents to display.",
        loadMask : true,
        forceFit : true,
        scrollOffset : 0
      }
    });
