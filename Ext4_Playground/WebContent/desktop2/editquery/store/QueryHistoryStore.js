/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.store.QueryHistoryStore', {
  extend : 'Ext.data.Store',
  alias : 'data-QueryHistoryStore',
  storeId : 'queryHistoryStoreId',
  sortOnLoad : true,
  autoLoad : true,
  autoDestroy : true,
  fields : ['id', 'results', 'query'],
  proxy : {
    type : 'ajax',
    url : '/extjs4/examples/desktop/editquery/store/query-history-example.json',
    reader : {
      type : 'json',
      root : 'items'
    },
    sorters : [{
          property : 'id',
          direction : 'ASC'
        }]
  }
});
