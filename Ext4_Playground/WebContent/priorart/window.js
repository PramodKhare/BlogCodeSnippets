Ext.require(['Ext.tip.*', 'Ext.Button', 'Ext.window.MessageBox', 'Ext.form.*',
    'Ext.layout.container.Column', 'Ext.window.MessageBox',
    'Ext.fx.target.Element', 'Ext.window.Window', 'Ext.tab.*',
    'Ext.toolbar.Spacer', 'Ext.layout.container.Card',
    'Ext.layout.container.Border']);

/**
 * , , 'PriorArt.store.DocumentListGridStore',
    'PriorArt.view.DocumentListGridPanel', 'PriorArt.view.AddPriorArtWindow',
    'PriorArt.store.PriorartGroupingGridStore', 'PriorArt.view.PriorartGroupingGrid'
 */

Ext.onReady(function() {
      Ext.QuickTips.init();
      Ext.create('Ext.Window', {
            title : 'PriorityArt Document Window',
            plain : true,
            height : 300,
            width : 400,
            minimizable : true,
            maximizable : true,
            maximized : true,
            autoScroll : true,
            renderTo : Ext.getBody(),
            layout : 'fit',
            items : [{
                  xtype : 'panel',
                  layout : 'border',
                  bodyBorder : false,
                  border : false,
                  items : [{
                        title : 'West Panel',
                        region : 'west',
                        floatable : false,
                        collapsible : false,
                        border : true,
                        width : 300,
                        minWidth : 100,
                        maxWidth : 250,
                        tools : [{
                              type : 'search',
                              tooltip : 'Search Patent Document',
                              callback : function(panel, tool, event) {
                              }
                            }, {
                              type : 'refresh',
                              tooltip : 'Refresh form Data',
                              handler : function(event, toolEl, panelHeader) {
                              }
                            }]
                      }, Ext.create('PriorArt.view.DocumentListGridPanel', {
                            collapsible : false,
                            border : true,
                            header : false,
                            id : 'documentListGridPanelId',
                            region : 'center'
                          }), {
                        region : 'east',
                        title : 'Detail: IN1049/CHENP/2012 20120201',
                        border : true,
                        collapsed : true,
                        collapsible : true,
                        split : true,
                        width : 400,
                        minWidth : 100,
                        html : 'Footer content'
                      }]
                }]
          }).show();
    });
