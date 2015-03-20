Ext.require(['Ext.form.field.ComboBox', 'Ext.window.MessageBox', 'Ext.form.FieldSet', 'Ext.tip.QuickTipManager', 'Ext.data.*']);

// Define the model for a State
Ext.define('Application.model.State', {
      extend : 'Ext.data.Model',
      fields : ['abbr', 'name', 'slogan']
    });

// The data for all states
var states = [{
      "abbr" : "AL",
      "name" : "Alabama",
      "slogan" : "The Heart of Dixie"
    }, {
      "abbr" : "AK",
      "name" : "Alaska",
      "slogan" : "The Land of the Midnight Sun"
    }, {
      "abbr" : "AZ",
      "name" : "Arizona",
      "slogan" : "The Grand Canyon State"
    }, {
      "abbr" : "AR",
      "name" : "Arkansas",
      "slogan" : "The Natural State"
    }, {
      "abbr" : "CA",
      "name" : "California",
      "slogan" : "The Golden State"
    }, {
      "abbr" : "CO",
      "name" : "Colorado",
      "slogan" : "The Mountain State"
    }, {
      "abbr" : "CT",
      "name" : "Connecticut",
      "slogan" : "The Constitution State"
    }, {
      "abbr" : "DE",
      "name" : "Delaware",
      "slogan" : "The First State"
    }, {
      "abbr" : "DC",
      "name" : "District of Columbia",
      "slogan" : "The Nation's Capital"
    }, {
      "abbr" : "FL",
      "name" : "Florida",
      "slogan" : "The Sunshine State"
    }, {
      "abbr" : "GA",
      "name" : "Georgia",
      "slogan" : "The Peach State"
    }, {
      "abbr" : "HI",
      "name" : "Hawaii",
      "slogan" : "The Aloha State"
    }, {
      "abbr" : "ID",
      "name" : "Idaho",
      "slogan" : "Famous Potatoes"
    }, {
      "abbr" : "IL",
      "name" : "Illinois",
      "slogan" : "The Prairie State"
    }, {
      "abbr" : "IN",
      "name" : "Indiana",
      "slogan" : "The Hospitality State"
    }, {
      "abbr" : "IA",
      "name" : "Iowa",
      "slogan" : "The Corn State"
    }, {
      "abbr" : "KS",
      "name" : "Kansas",
      "slogan" : "The Sunflower State"
    }, {
      "abbr" : "KY",
      "name" : "Kentucky",
      "slogan" : "The Bluegrass State"
    }, {
      "abbr" : "LA",
      "name" : "Louisiana",
      "slogan" : "The Bayou State"
    }, {
      "abbr" : "ME",
      "name" : "Maine",
      "slogan" : "The Pine Tree State"
    }, {
      "abbr" : "MD",
      "name" : "Maryland",
      "slogan" : "Chesapeake State"
    }, {
      "abbr" : "MA",
      "name" : "Massachusetts",
      "slogan" : "The Spirit of America"
    }, {
      "abbr" : "MI",
      "name" : "Michigan",
      "slogan" : "Great Lakes State"
    }, {
      "abbr" : "MN",
      "name" : "Minnesota",
      "slogan" : "North Star State"
    }, {
      "abbr" : "MS",
      "name" : "Mississippi",
      "slogan" : "Magnolia State"
    }, {
      "abbr" : "MO",
      "name" : "Missouri",
      "slogan" : "Show Me State"
    }, {
      "abbr" : "MT",
      "name" : "Montana",
      "slogan" : "Big Sky Country"
    }, {
      "abbr" : "NE",
      "name" : "Nebraska",
      "slogan" : "Beef State"
    }, {
      "abbr" : "NV",
      "name" : "Nevada",
      "slogan" : "Silver State"
    }, {
      "abbr" : "NH",
      "name" : "New Hampshire",
      "slogan" : "Granite State"
    }, {
      "abbr" : "NJ",
      "name" : "New Jersey",
      "slogan" : "Garden State"
    }, {
      "abbr" : "NM",
      "name" : "New Mexico",
      "slogan" : "Land of Enchantment"
    }, {
      "abbr" : "NY",
      "name" : "New York",
      "slogan" : "Empire State"
    }, {
      "abbr" : "NC",
      "name" : "North Carolina",
      "slogan" : "First in Freedom"
    }, {
      "abbr" : "ND",
      "name" : "North Dakota",
      "slogan" : "Peace Garden State"
    }, {
      "abbr" : "OH",
      "name" : "Ohio",
      "slogan" : "The Heart of it All"
    }, {
      "abbr" : "OK",
      "name" : "Oklahoma",
      "slogan" : "Oklahoma is OK"
    }, {
      "abbr" : "OR",
      "name" : "Oregon",
      "slogan" : "Pacific Wonderland"
    }, {
      "abbr" : "PA",
      "name" : "Pennsylvania",
      "slogan" : "Keystone State"
    }, {
      "abbr" : "RI",
      "name" : "Rhode Island",
      "slogan" : "Ocean State"
    }, {
      "abbr" : "SC",
      "name" : "South Carolina",
      "slogan" : "Nothing Could be Finer"
    }, {
      "abbr" : "SD",
      "name" : "South Dakota",
      "slogan" : "Great Faces, Great Places"
    }, {
      "abbr" : "TN",
      "name" : "Tennessee",
      "slogan" : "Volunteer State"
    }, {
      "abbr" : "TX",
      "name" : "Texas",
      "slogan" : "Lone Star State"
    }, {
      "abbr" : "UT",
      "name" : "Utah",
      "slogan" : "Salt Lake State"
    }, {
      "abbr" : "VT",
      "name" : "Vermont",
      "slogan" : "Green Mountain State"
    }, {
      "abbr" : "VA",
      "name" : "Virginia",
      "slogan" : "Mother of States"
    }, {
      "abbr" : "WA",
      "name" : "Washington",
      "slogan" : "Green Tree State"
    }, {
      "abbr" : "WV",
      "name" : "West Virginia",
      "slogan" : "Mountain State"
    }, {
      "abbr" : "WI",
      "name" : "Wisconsin",
      "slogan" : "America's Dairyland"
    }, {
      "abbr" : "WY",
      "name" : "Wyoming",
      "slogan" : "Like No Place on Earth"
    }];

var statesStore = Ext.create('Ext.data.Store', {
      autoDestroy : true,
      model : 'Application.model.State',
      data : states
    });

var toolbar1 = Ext.create('Ext.toolbar.Toolbar', {
      height : 30,
      id : 'my_toolbar_',
      items : [{
            xtype : 'checkbox',
            // creating unique id because we need handle of this checkbox later
            id : 'my_toolbar_selectAllChkBox',
            style : 'padding:-1px 0px 0px 1px;',
            boxLabel : 'Select All',
            width : 100,
            handler : function(chkBox, isChecked) {
              var selectAll = (chkBox.boxLabel == "Select All") ? true : false;
              var combo = Ext.getCmp('StatesComboList');
              var totalCount = 0;
              var store = combo.getStore();
              var totalRecords = store.getRange().length;
              if (selectAll) {
                for(var i=0;i<totalRecords;i++){
                    combo.select(store.getAt(i));
                }
                totalCount = totalRecords;
                chkBox.setBoxLabel("Deselect All");
              } else {
                // else condition means, not all of them are selected
                combo.clearValue();
                totalCount = 0;
                chkBox.setBoxLabel("Select All");
              }
            }
          }, '-', {
            xtype : 'textfield',
            enableKeyEvents : true,
            id : 'my_toolbar_filter-field',
            emptyText : 'enter search text',
            listeners : {
              keyup : function(field, e) {
              }
            }
          }, '->', {
            xtype : 'tbtext',
            text : 'Selected : 2',
            qtip : 'Total selected items',
            id : 'my_toolbar_total-count'
          }]
    });
        
    /**
     * Reference Link -
     * http://stackoverflow.com/questions/6600919/extjs-4-combobox-with-checkboxes
     */
Ext.define('Application.view.item.Show', {
      extend : 'Ext.panel.Panel',
      alias : 'widget.itemShow',
      title : 'Item data',
      frame : true,
      // Layout configuration
      layout : {
        type : 'fit'
      },
      items : [{
            xtype : 'container',
            layout : 'hbox',
            // margin: '0 0 10',
            // Item id - used by Ext.getCmp() method for instance
            // selection
            id : 'item_show',
            // Html inside this component
            // html : 'This will be in south of center panel',
            // Since adding parameter "padding" to this item
            // doesn't work - we'll add some direct styles
            style : {
              padding : '10px'
            },
            items : [{
                  xtype : 'fieldset',
                  flex : 1,
                  title : 'Multiselect Combo with Checkboxes',
                  layout : 'anchor',
                  defaults : {
                    anchor : '100%',
                    hideEmptyLabel : false
                  },
                  items : [{
                        xtype : 'combo',
                        id : 'StatesComboList',
                        fieldLabel : 'Choose State',
                        // maxHeight : 150,
                        width : 210,
                        multiSelect : true,
                        emptyText : "Select states",
                        store : statesStore,
                        displayField : 'name',
                        valueField : 'abbr',
                        editable : false,
                        queryMode : 'local',
//                        getInnerTpl : function() {
//                                return '<div class="x-combo-list-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>';
//                        },
                         tpl : Ext.create('Ext.XTemplate', 
                            '<div id="my_combo_toolbar_holder"></div>',
                            '<tpl for=".">', 
                                '<div class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>',
                            '</tpl>'),
                        displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}], ', '</tpl>'),
                        listeners : {
                          expand : function(thisComp, eOpts) {
                            if (Ext.get('my_combo_toolbar_container') == null) {
                              var dropdown = Ext.get('my_combo_toolbar_holder').dom.parentElement;
                              var container = Ext.DomHelper.insertBefore(dropdown, '<div id="my_combo_toolbar_container"></div>', true);
                              Ext.getCmp('my_toolbar_').render(container);
                            }
                          }
                        }
                      }]
                }]
          }]
    });