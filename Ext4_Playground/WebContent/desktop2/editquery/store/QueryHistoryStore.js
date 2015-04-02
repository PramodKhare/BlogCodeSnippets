/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.store.QueryHistoryStore', {
            extend : 'Ext.data.Store',
            alias : 'data-QueryHistoryStore',
            storeId : 'queryHistoryStoreId',
            sortOnLoad : true,
            autoDestroy : true,
            proxy : {
                type : 'memory',
                // url: '/url/to/my/json/encoded/results',
                reader : {
                    type : 'json',
                    root : 'items'
                }
            }
        });