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
              width : 60,
              items : [{
                    iconCls : 'ux-edit-search-query-actioncolumn-cls',
                    tooltip : 'Edit Search Query',
                    handler : function(grid, rowIndex, colIndex) {
                      var rec = grid.getStore().getAt(rowIndex);
                      Ext.getCmp('searchQueryTextAreaId').setValue(rec.get('query'));
                    }
                  }, {
                    iconCls : 'ux-show-search-results-actioncolumn-cls',
                    tooltip : 'View Search Results',
                    handler : function(grid, rowIndex, colIndex) {
                      var rec = grid.getStore().getAt(rowIndex);
                      alert("Show search results for Query");
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