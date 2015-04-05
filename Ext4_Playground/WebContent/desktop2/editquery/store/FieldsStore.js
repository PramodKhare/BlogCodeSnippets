/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.store.FieldsStore', {
      extend : 'Ext.data.Store',
      alias : 'data-FieldsStore',
      storeId : 'fieldsStoreId',
      sortOnLoad : true,
      autoLoad : true,
      autoDestroy : true,
      fields : ['id', 'name'],
      proxy : {
        type : 'ajax',
        url : '/extjs4/examples/desktop/editquery/store/indian-patent-fields.json',
        reader : {
          type : 'json',
          root : 'items'
        }
      },
      sorters : [{
            property : 'id',
            direction : 'ASC'
          }]
    });
