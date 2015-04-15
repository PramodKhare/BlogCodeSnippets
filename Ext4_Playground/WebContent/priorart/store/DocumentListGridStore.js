/* Pramod Khare */
Ext.define('PriorArt.store.DocumentListGridStore', {
      extend : 'Ext.data.Store',
      alias : 'data-document-list-store',
      storeId : 'documentListGridStoreId',
      sortOnLoad : true,
      autoLoad : true,
      autoDestroy : true,
      fields : ['UID', 'title', 'pubDate', 'assignee' ],
      proxy : {
        type : 'ajax',
        url : 'priorart/store/documents-list.json',
        extraParams : {
            // put any extra request params
            // username : '',
        },
        reader : {
          type : 'json',
          root : 'items'
        }
      },
      sorters : [{
            property : 'UID',
            direction : 'ASC'
          }]
    });
