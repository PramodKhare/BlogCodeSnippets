/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.store.FieldsStore', {
            extend : 'Ext.data.Store',
            alias : 'data-FieldsStore',
            storeId : 'fieldsStoreId',
            sortOnLoad : true,
            autoDestroy : true,
            proxy : {
                type : 'memory',
                // url: '/url/to/my/json/encoded/results',
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
