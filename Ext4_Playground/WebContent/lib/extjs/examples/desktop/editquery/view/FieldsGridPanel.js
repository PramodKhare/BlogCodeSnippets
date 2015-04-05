/* Pramod Khare */
Ext.define('MyApp.EditQueryWindow.view.FieldsGridPanel', {
  extend : 'Ext.grid.Panel',
  alias : 'widget.FieldsGridPanel',
  stripeRows : true,
  layout : 'fit',
  header : false,
  enableDragDrop : true,
  id : 'fieldsGridPanelId',
  autoExpandColumn : 'name',
  store : new MyApp.EditQueryWindow.store.FieldsStore({}),
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
            var store = Ext.getCmp('fieldsGridPanelId').getStore();
            store.removeAll();
            store.getProxy().url = '/extjs4/examples/desktop/editquery/store/indian-patent-fields.json';
            store.load();
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
            store.getProxy().url = '/extjs4/examples/desktop/editquery/store/world-patent-fields.json';
            store.load();
          }
        }
      }
    }]
  }]
});
