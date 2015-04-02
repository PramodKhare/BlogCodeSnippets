/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.store.FieldValueDynamicStore', {
            extend : 'Ext.data.Store',
            alias : 'data-FieldValueDynamicStore',
            storeId : 'fieldValueDynamicStoreId',
            autoDestroy : true,
            autoLoad : true,
            sortOnLoad : true,
            proxy : {
                // url: '/url/to/my/json/encoded/results',
                type : 'memory',
                reader : {
                    type : 'json',
                    root : 'items'
                }
            }
        });