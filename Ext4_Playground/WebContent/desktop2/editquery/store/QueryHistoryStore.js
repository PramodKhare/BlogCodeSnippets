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
    url : '/extjs4/examples/desktop/editquery/store/query-history-indian-fields.json',
    reader : {
      type : 'json',
      root : 'items'
    },
    extraParams : {
        // put any extra request params
        // username : '',
    },
    sorters : [{
        property : 'id',
        direction : 'ASC'
    }]
  }
});
