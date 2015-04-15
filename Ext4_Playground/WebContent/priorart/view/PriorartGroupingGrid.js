Ext.define('PriorArt.view.PriorartGroupingGrid', {
  extend : 'Ext.grid.Panel',
  xtype : 'add-priorart-grouped-grid',
  requires : ['Ext.grid.feature.Grouping'],
  iconCls : 'icon-grid',
  frame : true,
  border : false,
  header : false,
  autoDestroy : true,
  id : 'priorartGroupingGridId',
  store : new PriorArt.store.PriorartGroupingGridStore({}),
  features : [{
    ftype : 'grouping',
    groupHeaderTpl : Ext
        .create(
            'Ext.XTemplate',
            'Group: ',
            '{name:this.formatName} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]}) <input type="image" style="padding-right: 3px;float:right;" data-qtip="Add Another Claim/Comment" src="lib/extjs/examples/shared/icons/fam/add.png">&nbsp;',
            {
              formatName : function(name) {
                return Ext.String.trim(name).split(" ")[0];
              }
            }),
    hideGroupedHeader : true,
    startCollapsed : false,
    id : 'UID_grouping'
  }],
  columns : [{
    text : "Category",
    flex : 1,
    dataIndex : 'category',
    editor : new Ext.form.field.ComboBox({
          typeAhead : true,
          triggerAction : 'all',
          store : [['A', 'A'], ['D', 'D'], ['E', 'E'], ['I', 'I'], ['L', 'L'],
              ['O', 'O'], ['P', 'P'], ['T', 'T'], ['X', 'X'], ['Y', 'Y']]
        })
  }, {
    text : "Claim/Comments",
    flex : 1,
    dataIndex : 'comments',
    editor : {
      allowBlank : false
    }
  }, {
    menuDisabled : true,
    sortable : false,
    xtype : 'actioncolumn',
    align : 'right',
    width : 50,
    items : [{
          iconCls : 'ux-add-priot-art-save-action-cls',
          handler : function(grid, rowIndex, columnIndex) {
            // save priorart grid and close the window
            Ext.Msg.show({
                  title : 'Save',
                  msg : 'New priorart changes saved!',
                  icon : Ext.Msg.INFO,
                  buttons : Ext.Msg.OK
                });
          }
        }, {
          iconCls : 'ux-add-priot-art-delete-action-cls',
          handler : function(grid, rowIndex, columnIndex) {
            Ext.getCmp('priorartGroupingGridId').getStore().removeAt(rowIndex);
          }
        }]
  }],
  viewConfig : {
    deferEmptyText : true,
    emptyText : "No documents to add comments for.",
    loadMask : true,
    forceFit : true,
    scrollOffset : 0
  },
  selModel : {
    selType : 'cellmodel'
  },
  dockedItems : [{
        xtype : 'toolbar',
        ui : 'footer',
        dock : 'bottom',
        layout : {
          pack : 'center'
        },
        items : [{
              text : 'Save Priorart',
              tooltip : 'Save Priorart',
              iconCls : 'ux-add-priot-art-save-action-cls',
              scope : this,
              handler : function() {
                // save priorart grid and close the window
                Ext.Msg.show({
                      title : 'Save',
                      msg : 'New priorart changes saved!',
                      icon : Ext.Msg.INFO,
                      buttons : Ext.Msg.OK
                    });
              }
            }, {
              text : 'Reload',
              tooltip : 'Reload Priorart Grid',
              iconCls : 'ux-add-priot-art-refresh-action-cls',
              scope : this,
              handler : function() {
                Ext.getCmp('priorartGroupingGridId').getStore().reload();
              }
            }]
      }],
  plugins : [new Ext.grid.plugin.CellEditing({
        id : 'priorart_cellEditing',
        clicksToEdit : 1
      })],

  UIDValueRenderer : function(value, metaData, record, rowIndex, colIndex,
      store, view) {
    return value.split(" ")[0];
  },

  initComponent : function() {
    this.callParent();
    this.on('afterlayout', this.loadStore, this, {
          delay : 1,
          single : true
        })
  },

  loadStore : function() {
    this.getStore().load({
          // store loading is asynchronous, use a load listener or callback to
          // handle results
          callback : this.onStoreLoad
        });
  },

  onStoreLoad : function() {
    // Add new records to this grid
    /*Ext.Msg.show({
          title : 'Store Load Callback',
          msg : 'store was loaded, data available for processing',
          icon : Ext.Msg.INFO,
          buttons : Ext.Msg.OK
        });*/
  },

  listeners : {
    groupclick : function(view, node, group, e, eOpts) {
      if (e.getTarget().type === 'image') {
        e.stopEvent();
        var rec = Ext.create('PriorArt.store.PrioartModel', {
              UID : group,
              category : "",
              comments : ''
            });
        rec = this.getStore().insert(0, rec);
        view.features[0].expand(group);
        Ext.getCmp('priorartGroupingGridId').plugins[0].startEditByPosition({
              row : 0,
              column : 0
            });
      }
    }
  }
});
