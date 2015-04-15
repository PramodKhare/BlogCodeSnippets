/*!
 * @Author  : Pramod Khare 
 * @Purpose : Source code for Patent Field Grid Panel
 *            Shows indian as well as world-wide patent fields to select from 
 *            for creating patent search query 
 * @Created : March 28th 2015
 * @Modified: April 4th 2015
 */
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
    deferEmptyText : true,
    emptyText : "No fields to show",
    loadMask : true,
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
    id : 'patentFieldsRadioGroupId',
    hideLabel : true,
    items : [{
      boxLabel : 'Indian patents',
      tooltip : {
        text : 'Fields for Indian Patents',
        title : 'Patent Fields'
      },
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

            // Load query history panel as well for indian fields list
            store = Ext.getCmp('historyGridPanelId').getStore();
            store.getProxy().url = '/extjs4/examples/desktop/editquery/store/query-history-indian-fields.json';
            store.load();
            // store.load({
                // params : {
                // Send params like
                // 'foo1' : bar1,
                // 'foo2' : bar2
                // }
            // });
            
            // Change the AutoSuggest store proxy url to fields-value-autosuggest-inpat.json
            store = Ext.getCmp('searchQueryTextAreaId').getStore();
            store.getProxy().url = '/extjs4/examples/desktop/editquery/store/fields-value-autosuggest-inpat.json';
            store.load();
          }
        }
      }
    }, {
      xtype : 'container',
      layout : 'hbox',
      items : [{
        xtype : 'radio',
        // boxLabel : 'World wide patents',
        name : 'patent-fields',
        inputValue : 2,
        listeners : {
          change : function(rdgroupp, newValue, oldValue, eOpts) {
            if (newValue) {
              var store = Ext.getCmp('fieldsGridPanelId').getStore();
              store.removeAll();
              store.getProxy().url = '/extjs4/examples/desktop/editquery/store/world-patent-fields.json';
              store.load();
              // Load Query history panel as well
              store = Ext.getCmp('historyGridPanelId').getStore();
              store.getProxy().url = '/extjs4/examples/desktop/editquery/store/query-history-worldwide-fields.json';
              store.load();
              // store.load({
                  //params : {
                  //Send params like
                  //'foo1' : bar1,
                  //'foo2' : bar2
                  //}
              // });
              
              // Change the AutoSuggest store proxy url to fields-value-autosuggest-worldpat.json
              store = Ext.getCmp('searchQueryTextAreaId').getStore();
              store.getProxy().url = '/extjs4/examples/desktop/editquery/store/fields-value-autosuggest-worldpat.json';
              store.load();
            }
          }
        }
      }, {
        xtype : 'splitbutton',
        id : 'worldWidePntsPCSplitId',
        text : 'World wide patents',
        handler : function(btn, e) {
          btn.showMenu();
        },
        _PCFieldValue : "",
        tooltip : {
          text : 'Selct Patent Publication Country',
          title : 'Publication Country'
        },
        // Menus can be built/referenced by using nested menu config objects
        menu : {
          items : ['<b>Full text collection</b>', '-', {
                text : 'US (United States)',
                group : 'PC',
                checked : true,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "US";
                }
              }, {
                text : 'EP (European)',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "EP";
                }
              }, {
                text : 'CA (Canada)',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "CA";
                }
              }, {
                text : 'WO',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "WO";
                }
              }, '-', '<b>Biblio Collection</b>', '-', {
                text : 'PK',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "BCPK";
                }
              }, {
                text : 'US',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "BCUS";
                }
              }, {
                text : 'EP',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "BCEP";
                }
              }, {
                text : 'CA',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "BCCA";
                }
              }, {
                text : 'WO',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "BCWO";
                }
              }, {
                text : 'CH',
                group : 'PC',
                checked : false,
                handler : function(item, e) {
                  Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue = "BCCH";
                }
              }]
        }
      }]
    }]
  }]
});
