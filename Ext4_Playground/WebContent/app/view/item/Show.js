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
      autoLoad : true,
      sortOnLoad : true,
      storeId : 'myStatesStoreId',
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
                for (var i = 0; i < totalRecords; i++) {
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

Ext.define("Ext.form.field.QueryAutoCompleteTextAreaCombo", {
      extend : 'Ext.form.field.ComboBox',
      alias : 'widget.QueryAutoCompleteTextAreaCombo',
      // TODO - check how to put multiple values into "query textbox for multiple values selection"
      multiSelect : false,
      editable : true,
      cols: 20,
      rows: 6,
      hideTrigger : true,
      enableKeyEvents : true,
      fieldStyle : "height:100px",
      textAreaRawValue : "",
      fieldSubTpl : ['<div class="{hiddenDataCls}" role="presentation"></div>', 
            '<div id="wrapper_div_{id}">',
            '<textarea id="{id}" rows="6" style="width: 100%;" {inputAttrTpl} class="{fieldCls} {typeCls} ' +
                'x-form-text x-form-textarea {editableCls}" autocomplete="off"', 
             '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>', 
             '<tpl if="rows"> rows="{rows}" </tpl>',
             '<tpl if="cols"> cols="{cols}" </tpl>',
             '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>', 
             '<tpl if="size"> size="{size}"</tpl>', 
             '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>', 
             '<tpl if="readOnly"> readonly="readonly"</tpl>', 
             '<tpl if="disabled"> disabled="disabled"</tpl>', 
             '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>', 
             '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>', 
             '></textarea>',
            '<input id="text_area_{id}" style="display: none;" type="{type}" {inputAttrTpl} class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"', 
             '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>', 
             '<tpl if="name"> name="{name}"</tpl>', 
             '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>', 
             '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>', 
             '<tpl if="readOnly"> readonly="readonly"</tpl>', 
             '<tpl if="disabled"> disabled="disabled"</tpl>', 
             '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>', 
             '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>', 
             '/>',
            '</div>', {
            compiled : true,
            disableFormats : true
          }],
      /*tpl : Ext.create('Ext.XTemplate', 
            '<tpl for=".">', 
                '<div class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" />{name}</div>', 
             '</tpl>'),*/
      displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} ', '</tpl>'),
      // To enable the HTML inside the Textarea - change tpl
      // http://stackoverflow.com/questions/9016859/extjs-4-render-html-of-a-selected-value-in-a-combobox
      setRawValue : function(value) {
        var me = this;
        value = Ext.value(me.transformRawValue(value), '');
        console.debug(value);
        if (me.inputEl) {
          // get the previous dom value - save it in textAreaRawValue
          this.textAreaRawValue = me.inputEl.dom.value;
          // replace the last string part
          this.textAreaRawValue = this.textAreaRawValue.replace(/\s{0,2}(\w{2,})$/i, value);
          me.rawValue = value;
          me.inputEl.dom.value = this.textAreaRawValue;
        }
        return value;
      },
      getRawValue : function() {
        var me = this, v = me.callParent();
        if (v === me.emptyText && me.valueContainsPlaceholder) {
          v = '';
          return v;
        }
        return v;
        var match = this.autoSuggestEnableRegex.exec(v);
        if (Ext.isEmpty(match)) {
          return '';
        }
        console.debug("getRawValue - "+match[2]);
        return Ext.valueFrom(match[2], '');
      },
      getTextAreaValue : function(){
        this.textAreaRawValue = this.inputEl.dom.value;
        return Ext.valueFrom(this.textAreaRawValue, "");
      },
      setTextAreaValue : function(value){
        this.textAreaRawValue = value;
      },
      clearValue : function() {
        this.callParent();
        this.textAreaRawValue = "";
      },
      autoSuggestEnableRegex : /\s*(\w+)\s*\:\s{0,2}(\w{2,})$/i,
      listeners : {
        keyup : function(combo, e, eOpts) {
          Ext.get('text_area_' + combo.id + "-inputEl").dom.value = combo.inputEl.dom.value;
        },
        beforequery : function(record) {
          console.debug("inside before query - "+this.inputEl.dom.value);
          var match = this.autoSuggestEnableRegex.exec(this.inputEl.dom.value);
          if (Ext.isEmpty(match)) {
             return false;
          }
          /**
           * So load the store based on query i.e. field-value and field-name
           */
          var actualQuery = match[2];
          var storeLoadParam = match[1];
          record.query = actualQuery;
          record.query = new RegExp(record.query.substring(record.query.lastIndexOf(" ") + 1), 'i');
          record.forceAll = true;
          // TODO - dynamically change the actual store's proxy load parameters
        }
      }
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
        layout : {
          type : 'vbox',
          align : 'stretch'
        },
        margin : '0 0 10',
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
          xtype : 'QueryAutoCompleteTextAreaCombo',
          id : 'StatesComboList',
          fieldLabel : 'Choose State',
          hideLabel : true,
          emptyText : "Select states",
          store : statesStore,
          displayField : 'name',
          valueField : 'name',
          editable : true,
          cols: 20,
          rows: 6,
          hideTrigger : true,
          // matchFieldWidth : false,
          enableKeyEvents : true,
          fieldStyle : "height:100px",
          queryMode : 'local'
       }, {
          xtype : 'combo',
          id : 'statesComboList_hidden',
          multiSelect : true,
          fieldLabel : 'Choose State 2',
          hideLabel : true,
          emptyText : "Select states",
          store : statesStore,
          displayField : 'name',
          valueField : 'name',
          editable : true,
          cols: 20,
          rows: 6,
          hideTrigger : true,
          // matchFieldWidth : false,
          enableKeyEvents : true,
          fieldStyle : "height:100px",
          queryMode : 'local',
          tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '" class="chkCombo-default-icon chkCombo" />{name}</div>', '</tpl>'),
          displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} ', '</tpl>'),
          listeners : {
            beforequery : function(record) {
              console.debug(record.query);
              record.query = new RegExp(record.query.substring(record.query.lastIndexOf(" ") + 1), 'i');
              record.forceAll = true;
            }
          },
          alignPicker : function() {
            var me = Ext.getCmp('StatesComboList'), picker = me.getPicker(), 
            heightAbove = me.getPosition()[1] - Ext.getBody().getScroll().top, heightBelow = Ext.Element.getViewHeight() - heightAbove - me.getHeight(), space = Math.max(heightAbove, heightBelow);

            // Allow the picker to height itself naturally.
            if (picker.height) {
              delete picker.height;
              picker.updateLayout();
            }
            // Then ensure that vertically, the dropdown will fit into the space
            // either above or below the inputEl.
            if (picker.getHeight() > space - 5) {
              picker.setHeight(space - 5); // have some leeway so we aren't
              // flush against
            }
            me.callParent();
          }
        }/*, {
          xtype : 'textareafield',
          name : 'query',
          id : 'searchQueryTextAreaId',
          hideLabel : true,
          hideTrigger : true,
          grow : true,
          maxHeight : 200,
          emptyText : 'Write Search Query here e.g. TI=test',
          flex : 1,
          fieldLabel : 'TextAreafield with auto-complete',
          plugins : [{
                ptype : 'auto-complete',
                storeId : 'myStatesStoreId',
                displayField : 'name',
                valueField : 'abbr'
              }]
        }*/]
      }]
    });
