/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.store.FieldValueDynamicStore', {
  extend : 'Ext.data.Store',
  alias : 'data-FieldValueDynamicStore',
  storeId : 'fieldValueDynamicStoreId',
  autoDestroy : true,
  autoLoad : true,
  sortOnLoad : true,
  remoteFilter: false,
  fields : ['abbr', 'name', 'slogan'],
  proxy : {
    type : 'ajax',
    url : '/extjs4/examples/desktop/editquery/store/fields-value-autosuggest-inpat.json',
    extraParams : {
        // put any extra request params
        searchFieldName : '',
        searchFieldValue : ''
    },
    reader : {
      type : 'json',
      root : 'items'
    }
  }
});
