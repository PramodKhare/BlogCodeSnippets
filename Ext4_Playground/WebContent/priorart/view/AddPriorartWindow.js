Ext.define('PriorArt.view.AddPriorArtWindow', {
      extend : 'Ext.window.Window',
      xtype : 'add-priorart-grid-window',
      requires : ['PriorArt.store.PriorartGroupingGridStore',
          'PriorArt.view.PriorartGroupingGrid'],
      width : 600,
      height : 400,
      layout : 'fit',
      autoDestroy : true,
      applicationNumber : '',
      initComponent : function() {
        // Change Add fixed prefix title string - to application number
        // "Add priorart to Application Number : "+<Application_Number>
        this.title = 'Add to Priorart Application Number : '
            + this.applicationNumber;
        this.callParent();
      },
      items : [Ext.create('PriorArt.view.PriorartGroupingGrid', {})]
    })
