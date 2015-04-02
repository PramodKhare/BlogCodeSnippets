/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.view.FieldsGridPanel', {
            extend : 'Ext.grid.Panel',
            alias : 'widget.FieldsGridPanel',
            stripeRows : true,
            layout : 'fit',
            // border : false,
            flex : 1.3,
            header : false,
            enableDragDrop : true,
            id : 'fieldsGridPanelId',
            autoExpandColumn : 'name',
            // store : Ext.data.StoreManager.lookup('fieldsStoreId'),
            columns : [{
                        text : 'ID',
                        dataIndex : 'id',
                        width : 60,
                        sortable : true
                    }, {
                        text : 'Name',
                        dataIndex : 'name',
                        sortable : true,
                        flex : 1
                    }],
            selModel : new Ext.selection.RowModel({
                        singleSelect : true
                    }),
            viewConfig : {
                scrollOffset : 0,
                forceFit : true,
                plugins : {
                    ddGroup : 'grid-to-query-form',
                    ptype : 'gridviewdragdrop',
                    enableDrop : false,
                    enableDrag : true,
                    copy : true
                }
            },
            tbar : [{
                xtype : 'radiogroup',
                hideLabel : true,
                items : [{
                    boxLabel : 'Indian patents',
                    name : 'patent-fields',
                    inputValue : 1,
                    width : 100,
                    checked : true,
                    listeners : {
                        change : function(rdgroupp, newValue, oldValue, eOpts) {
                            if (newValue) {
                                var store = Ext.getCmp('fieldsGridPanelId')
                                        .getStore();
                                store.removeAll();
                                store.loadRawData({
                                    'items' : [{
                                        'id' : 'IN',
                                        "name" : "Inventor Name"
                                    }, {
                                        'id' : 'ANA',
                                        "name" : "Inventor Address"
                                    }, {
                                        'id' : 'INS',
                                        "name" : "Inventor State"
                                    }, {
                                        'id' : 'INC',
                                        "name" : "Inventor Country"
                                    }]
                                });
                                // store.loadRawData(MyDesktop.EditQueryWindow
                                //        .getDummyIndianPatensFieldsJSONData());
                            }
                        }
                    }
                }, {
                    boxLabel : 'World wide patents',
                    name : 'patent-fields',
                    inputValue : 2,
                    width : 150,
                    listeners : {
                        change : function(rdgroupp, newValue, oldValue, eOpts) {
                            if (newValue) {
                                var store = Ext.getCmp('fieldsGridPanelId')
                                        .getStore();
                                store.removeAll();
                                store.loadRawData({
                                    'items' : [{
                                                'id' : 'PA',
                                                "name" : "Patent Assignee"
                                            }, {
                                                'id' : 'PAA',
                                                "name" : "Patent Assignee Address"
                                            }, {
                                                'id' : 'PAS',
                                                "name" : "Patent Assignee State"
                                            }, {
                                                'id' : 'PAC',
                                                "name" : "Patent Assignee Country"
                                            }, {
                                                'id' : 'NCL',
                                                "name" : "Number of Claims"
                                            }, {
                                                'id' : 'PAP',
                                                "name" : "PCT Application Number"
                                            }, {
                                                'id' : 'CLMS',
                                                "name" : "Claims"
                                            }]
                                });
                                //store.loadRawData(MyDesktop.EditQueryWindow
                                //        .getDummyWorldPatentsFieldsJSONData());
                            }
                        }
                    }
                }]
            }]
        });