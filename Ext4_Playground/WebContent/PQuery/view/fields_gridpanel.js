var getFieldGridPanel = function() {
  var fieldGridPanel = Ext.getCmp('fieldsGridPanelId');
  if (fieldGridPanel != null) {
    return fieldGridPanel;
  }
  fieldGridPanel = Ext.create('Ext.grid.Panel', {
        flex : 1.3,
        stripeRows : true,
        header : false,
        enableDragDrop : true,
        id : 'fieldsGridPanelId',
        autoExpandColumn : 'name',
        store : Ext.data.StoreManager.lookup('fieldsStore'),
        columns : [{
              text : 'ID',
              dataIndex : 'id',
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
                          var store = Ext.getCmp('fieldsGridPanelId').getStore();
                          store.removeAll();
                          store.loadRawData(dummyIndianPatensFieldsJSONData);
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
                          var store = Ext.getCmp('fieldsGridPanelId').getStore();
                          store.removeAll();
                          store.loadRawData(dummyWorldPatentsFieldsJSONData);
                        }
                      }
                    }
                  }]
            }],
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
        }
      });
  return fieldGridPanel;
}