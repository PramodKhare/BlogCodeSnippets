var getQuerySearchHistoryGridPanel = function() {
  var historyGridPanel = Ext.getCmp('historyGridPanelId');
  if (historyGridPanel != null) {
    return historyGridPanel;
  }
  historyGridPanel = Ext.create('Ext.grid.Panel', {
        title : 'Query History',
        tooltip : 'History of current session queries',
        stripeRows : true,
        layout : 'fit',
        id : 'historyGridPanelId',
        border : false,
        store : Ext.data.StoreManager.lookup('queryHistoryStore'),
        columns : [{
              text : 'ID',
              dataIndex : 'id',
              sortable : true
            }, {
              text : 'Results',
              dataIndex : 'results',
              sortable : true
            }, {
              text : 'Query',
              dataIndex : 'query',
              sortable : true,
              flex : 1
            }, {
              text : 'Parsed Query',
              dataIndex : 'parsedQuery',
              sortable : true,
              flex : 1
            }, {
              menuDisabled : true,
              sortable : false,
              xtype : 'actioncolumn',
              width : 50,
              items : [{
                    icon : 'extjs/examples/shared/icons/fam/cog_edit.png',
                    tooltip : 'Edit Search Query',
                    handler : function(grid, rowIndex, colIndex) {
                      var rec = grid.getStore().getAt(rowIndex);
                      alert("Edit - " + rec.get('name'));
                    }
                  }, {
                    icon : 'extjs/examples/restful/images/application_view_list.png',
                    tooltip : 'View Search Results',
                    handler : function(grid, rowIndex, colIndex) {
                      var rec = grid.getStore().getAt(rowIndex);
                      alert("Terminate " + rec.get('firstname'));
                    }
                  }]
            }],
        viewConfig : {
          scrollOffset : 0,
          forceFit : true
        }
      });
  return historyGridPanel;
}