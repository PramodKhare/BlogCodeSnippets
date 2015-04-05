/*!
 * @Author  : Pramod Khare 
 * @Purpose : Opens patent search query edit window - which contains Query Edit form, 
 *            query history and possible query search fields
 * @Created : March 28th 2015
 * @Modified: April 4th 2015
 */
Ext.define('MyDesktop.EditQueryWindow', {
      extend : 'Ext.ux.desktop.Module',

      requires : ['MyApp.EditQueryWindow.store.FieldsStore',
          'MyApp.EditQueryWindow.store.FieldValueDynamicStore',
          'MyApp.EditQueryWindow.store.QueryHistoryStore',
          "MyApp.EditQueryWindow.ux.NumberPrompt",
          'MyApp.EditQueryWindow.ux.QueryAutoCompleteTextAreaCombo',
          'MyApp.EditQueryWindow.view.QueryHistoryGridPanel',
          'MyApp.EditQueryWindow.view.FieldsGridPanel',
          'MyApp.EditQueryWindow.view.SearchQueryFormPanel'],

      id : 'edit-patent-search-query-win',

      init : function() {
        this.launcher = {
          text : 'Query Window',
          iconCls : 'icon-grid'
        };
      },

      createWindow : function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('edit-patent-search-query-win');
        if (!win) {
          win = desktop.createWindow({
                id : 'edit-patent-search-query-win',
                title : 'Query Window',
                minimizable : true,
                maximizable : true,
                autoScroll : true,
                autoDestroy : true,
                width : 740,
                height : 480,
                iconCls : 'icon-grid',
                animCollapse : false,
                constrainHeader : true,
                layout : 'fit',
                frame : true,
                items : [{
                      border : false,
                      xtype : 'panel',
                      id : 'querySearchPanelContainerId',
                      layout : {
                        type : 'border'
                      },
                      items : [{
                            region : 'west',
                            collapsible : true,
                            split : true,
                            width : '30%',
                            minWidth : 100,
                            xtype : 'FieldsGridPanel',
                            id : 'fieldsGridPanelId'
                          }, {
                            region : 'center',
                            xtype : 'panel',
                            header : false,
                            border : false,
                            layout : {
                              type : 'vbox',
                              align : 'stretch'
                            },
                            flex : 5,
                            items : [{
                                  xtype : 'SearchQueryFormPanel',
                                  id : 'searchQueryEditFormId',
                                  header : false
                                }, {
                                  xtype : 'QueryHistoryGridPanel',
                                  title : 'Query History',
                                  id : 'historyGridPanelId'
                                }]
                          }]
                    }]
              });
        }
        return win;
      }
    });
