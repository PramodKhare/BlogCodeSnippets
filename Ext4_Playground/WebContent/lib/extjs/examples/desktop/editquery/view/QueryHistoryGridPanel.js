/*!
 * @Author  : Pramod Khare 
 * @Purpose : Source code for Patent Search Query History Panel
 *            Shows past search queries in latest-query first order 
 * @Created : March 28th 2015
 * @Modified: April 4th 2015
 */
Ext.define('MyApp.EditQueryWindow.view.QueryHistoryGridPanel', {
      extend : 'Ext.grid.Panel',
      alias : 'widget.QueryHistoryGridPanel',
      layout : 'fit',
      title : 'Query History',
      stripeRows : true,
      border : false,
      store : new MyApp.EditQueryWindow.store.QueryHistoryStore({}),
      // store : Ext.data.StoreManager.lookup('queryHistoryStoreId'),
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
            menuDisabled : true,
            sortable : false,
            xtype : 'actioncolumn',
            width : 60,
            items : [{
              iconCls : 'ux-edit-search-query-actioncolumn-cls',
              tooltip : 'Edit Search Query',
              handler : function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                Ext.getCmp('searchQueryTextAreaId').clearAndSetValue(rec
                    .get('query'));
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
