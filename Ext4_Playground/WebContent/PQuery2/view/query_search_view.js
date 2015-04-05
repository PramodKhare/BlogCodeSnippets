/**
 * Query Search Tab Panel view
 */

var getQuerySearchTabPanel = function() {
  var querySearchTabPanel = Ext.getCmp('querySearchTabPanelContainerId');
  if (querySearchTabPanel != null) {
    return querySearchTabPanel;
  }
  querySearchTabPanel = Ext.create('Ext.tab.Panel', {
        xtype : 'tabpanel',
        activeTab : 0,
        id : 'querySearchTabPanelContainerId',
        border : false,
        items : [{
              title : 'Query Tab',
              tooltip : 'Query Patent Database',
              closable : false,
              layout : {
                type : 'hbox',
                align : 'stretch'
              },
              autoScroll : true,
              border : false,
              items : [{
                    xtype : 'gridpanel',
                    title : 'Fields List',
                    tooltip : 'List of Fields with Ids',
                    flex : 1,
                    stripeRows : true,
                    simpleDrag : true,
                    draggable : true,
                    id : 'fieldsGridPanelId',
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
                    tools : [{
                          type : 'refresh',
                          tooltip : 'Reload Fields',
                          scope : this,
                          handler : function() {
                            Ext.getCmp('fieldsGridPanelId').getStore().load();
                          }
                        }]
                  }, {
                    xtype : 'panel',
                    header : false,
                    border : false,
                    id : 'vpanel-1',
                    layout : {
                      type : 'vbox',
                      align : 'stretch'
                    },
                    flex : 5,
                    items : [{
                          xtype : 'form',
                          title : 'Search Query',
                          // url: 'save-form.php',
                          layout : 'anchor',
                          defaults : {
                            anchor : '100%'
                          },
                          frame : true,
                          defaultType : 'textfield',
                          tbar : [{
                                text : '=',
                                tooltip : '"Equal to" operator'
                              }, '-', {
                                text : '<',
                                tooltip : '"Less than" operator<br/>Example : < 123456'
                              }, '-', {
                                text : '>',
                                tooltip : '"Greater than" operator<br/>Example : > 123456'
                              }, '-', {
                                text : '<=',
                                tooltip : '"Less than or Equal to" operator<br/>Example : <= 123456'
                              }, '-', {
                                text : '>=',
                                tooltip : '"Greater than or Equal to" operator<br/>Example : >= 123456'
                              }, '-', {
                                text : '()',
                                tooltip : 'Use parenthesis to clarify order of operation<br/>Example : z AND (x OR y)'
                              }, '-', {
                                text : '[]',
                                tooltip : '"Range" operator<br/>Example : [1234, 15987]'
                              }, '-', {
                                text : '*',
                                tooltip : '"Asterisk wildcard" operator'
                              }, '-', {
                                text : '#',
                                tooltip : '"Hash wildcard" operator'
                              }, '-', {
                                text : '"',
                                tooltip : 'Use double quotes to search for exact phrase<br/>Example : "test"'
                              }, '-', '-', {
                                text : 'AND'
                              }, '-', {
                                text : 'OR'
                              }, '-', {
                                text : 'NOT'
                              }, '-', '-', {
                                text : 'Proximity'
                              }],
                          items : [{
                                // xtype : 'textareafield',
                                name : 'query',
                                hideLabel : true,
                                xtype : 'combo',
                                hideTrigger : true,
                                grow : true,
                                maxHeight : 200,
                                multiSelect : true,
                                emptyText : 'Write Search Query here e.g. TI=test',
                                store : Ext.data.StoreManager.lookup('statesStore'),
                                displayField : 'name',
                                valueField : 'abbr',
                                editable : true,
                                queryMode : 'local',
                                tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>', '</tpl>'),
                                displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}],', '</tpl>'),
                                anchor : '100%'
                              }],
                          buttonAlign : 'center',
                          buttons : [{
                                text : 'Search',
                                formBind : true,
                                disabled : true,
                                handler : function() {

                                }
                              }, {
                                text : 'Reset',
                                handler : function() {

                                }
                              }, {
                                text : 'Save Query',
                                handler : function() {

                                }
                              }]
                        }, {
                          xtype : 'gridpanel',
                          title : 'History',
                          tooltip : 'History of current session queries',
                          stripeRows : true,
                          layout : 'fit',
                          id : 'HistoryGridPanelId',
                          border : false,
                          store : Ext.data.StoreManager.lookup('queryHistoryStore'),
                          columns : [{
                                text : 'ID',
                                dataIndex : 'id',
                                sortable : true
                              }, {
                                text : 'Results',
                                dataIndex : 'results',
                                sortable : true
                              }, {
                                text : 'Query',
                                dataIndex : 'query',
                                sortable : true,
                                flex : 1
                              }, {
                                text : 'Parsed Query',
                                dataIndex : 'parsedQuery',
                                sortable : true,
                                flex : 1
                              }]
                        }]
                  }]
            }]
      });

  return querySearchTabPanel;
}
//
// {
// xtype : 'panel',
// header : false,
// border : false,
// // title : 'Query',
// // tooltip : 'Query Edit Zone',
// flex : 1,
// layout : 'fit',
// items : [{
// xtype : 'fieldset',
// flex : 1,
// frame : true,
// title : 'Query',
// layout : 'anchor',
// defaults : {
// anchor : '100%',
// hideEmptyLabel : false
// },
// items : [{
// xtype : 'combo',
// hideTrigger : true,
// id : 'AutoSuggestList',
// hideLabel : true,
// anchor : '100%',
// multiSelect : true,
// emptyText : "Select states",
// store : Ext.data.StoreManager.lookup('statesStore'),
// displayField : 'name',
// valueField : 'abbr',
// editable : true,
// queryMode : 'local',
// tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div
// class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '"
// class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>', '</tpl>'),
// displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}],
// ', '</tpl>')
// }]
// }]
// }
