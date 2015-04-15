/* Pramod Khare */

// Set up a model to use in our Store
Ext.define('PriorArt.store.PrioartModel', {
      extend : 'Ext.data.Model',
      fields : [{
            name : 'UID',
            type : 'string'
          }, {
            name : 'category',
            type : 'string'
          }, {
            name : 'comments',
            type : 'string'
          }]
    });

Ext.define('PriorArt.store.PriorartGroupingGridStore', {
      extend : 'Ext.data.Store',
      alias : 'priorart-grouping-grid-store',
      storeId : 'priorartGroupingGridStoreId',
      sortOnLoad : true,
      autoDestroy : true,
      groupField : 'UID',
      model : 'PriorArt.store.PrioartModel',
      // fields : ['UID', 'category', 'comments'],
      proxy : {
        type : 'ajax',
        url : 'priorart/store/priorart-list.json',
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
