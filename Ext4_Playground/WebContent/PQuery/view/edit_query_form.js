/**
 * Author : Pramod Khare Contains - source code for Patent Search Query Form
 * panel - with customized textarea
 */

Ext.define('Ext.form.field.ASMSHighlightedTextArea', {
      extend : 'Ext.form.field.TextArea',
      alias : 'widget.ASMSHighlightedTextArea',
      insertAtCursor : function(v) {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        var startPos = text_field.selectionStart;
        var endPos = text_field.selectionEnd;
        text_field.value = text_field.value.substring(0, startPos) + v + text_field.value.substring(endPos, text_field.value.length);

        this.el.focus();
        text_field.setSelectionRange(endPos + v.length, endPos + v.length);
      },
      getCursorSelectionStartPosition : function() {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        return text_field.selectionStart;
      },
      getCursorSelectionEndPosition : function() {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        return text_field.selectionEnd;
      }
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
      autoSuggestEnableRegex : /\s*(\w+)\s*\:\s{0,2}\"*(\w{3,})\"*$/i,
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
        //console.debug(value);
        if (me.inputEl) {
          // get the previous dom value - save it in textAreaRawValue
          this.textAreaRawValue = me.inputEl.dom.value;
          // replace the last string part
          this.textAreaRawValue = this.textAreaRawValue.replace(/\s{0,2}\"*(\w+)\"*$/i, value);
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
        //console.debug("getRawValue - "+match[2]);
        return Ext.valueFrom(match[2], '');
      },
      getTextAreaValue : function(){
        this.textAreaRawValue = this.inputEl.dom.value;
        return Ext.valueFrom(this.textAreaRawValue, "");
      },
      setTextAreaValue : function(value){
        this.textAreaRawValue = value;
        this.inputEl.dom.value = value;
      },
      clearAndSetValue : function(value) {
        this.clearValue();
        this.textAreaRawValue = value;
        this.inputEl.dom.value = value;
      },
      clearValue : function() {
        this.callParent();
        this.textAreaRawValue = "";
        this.inputEl.dom.value = "";
      },
      insertAtCursor : function(v) {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        var startPos = text_field.selectionStart;
        var endPos = text_field.selectionEnd;
        text_field.value = text_field.value.substring(0, startPos) + v + text_field.value.substring(endPos, text_field.value.length);

        this.el.focus();
        text_field.setSelectionRange(endPos + v.length, endPos + v.length);
      },
      getCursorSelectionStartPosition : function() {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        return text_field.selectionStart;
      },
      getCursorSelectionEndPosition : function() {
        var document_id = this.getFocusEl().id;
        var text_field = document.getElementById(document_id);
        return text_field.selectionEnd;
      },
      listeners : {
        keyup : function(combo, e, eOpts) {
          Ext.get('text_area_' + combo.id + "-inputEl").dom.value = combo.inputEl.dom.value;
        },
        beforequery : function(record) {
          //console.debug("inside before query - "+this.inputEl.dom.value);
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

Ext.define('Ext.window.MessageBox.NumberPrompt', {
      extend : 'Ext.window.MessageBox',
      initComponent : function() {
        this.callParent();
        var index = this.promptContainer.items.indexOf(this.textField);
        this.promptContainer.remove(this.textField);
        this.textField = this._createNumberField();
        this.promptContainer.insert(index, this.textField);
      },

      _createNumberField : function() {
        return new Ext.form.field.Number({
              id : this.id + '-textfield',
              anchor : '100%',
              maxValue : 30,
              minValue : 1,
              value : 1,
              maskRe : '/[1-9]|1[0-9]|20/',
              enableKeyEvents : true,
              listeners : {
                keydown : this.onPromptKey,
                scope : this
              }
            });
      }
    }, function() {
      /**
       * @class Ext.window.MessageBox.NumberPrompt
       * @alternateClassName Ext.Msg
       * @extends Ext.window.MessageBox
       * @singleton Singleton instance of Ext.window.MessageBox.NumberPrompt.
       */
      Ext.window.MessageBox.NumberPrompt = new this();
    });

var getEditQueryFormToolbar = function() {
  var editQueryFormToolbar = Ext.getCmp('');
  if (editQueryFormToolbar != null) {
    return editQueryFormToolbar;
  }
  editQueryFormToolbar = Ext.create('Ext.toolbar.Toolbar', {
        id : 'editQueryFormToolbarId',
        items : [{
              text : ':',
              tooltip : '"Equal to" operator<br/>Example, TI: computer',
              scope : this,
              handler : function() {
                // Append '=' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" :");
                field.focus();
              }
            }, '-', {
              text : '()',
              tooltip : 'Use parenthesis to clarify order of operation<br/>Example : z AND (x OR y)',
              scope : this,
              handler : function() {
                // Append '()' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                var newCursorPos = field.getCursorSelectionStartPosition() + 2;
                field.insertAtCursor(" ()");
                field.selectText(newCursorPos, newCursorPos);
                field.focus();
              }
            }, '-', {
              text : '[]',
              tooltip : '"Range" operator<br/>Example : [1234, 15987]',
              scope : this,
              handler : function() {
                // Append '[]' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                var newCursorPos = field.getCursorSelectionStartPosition() + 1;
                field.insertAtCursor("[, ]");
                field.selectText(newCursorPos, newCursorPos);
                field.focus();
              }
            }, '-', {
              text : '*',
              tooltip : '"Asterisk wildcard" search operator<br/>Example : shed*',
              scope : this,
              handler : function() {
                // Append '*' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor("*");
                field.focus();
              }
            }, '-', {
              text : '"',
              tooltip : 'Use double quotes to search for exact phrase<br/>Example : "liquid mycorrhiza"',
              scope : this,
              handler : function() {
                // Append '""' sign to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                var newCursorPos = field.getCursorSelectionStartPosition() + 1;
                field.insertAtCursor("\"\"");
                field.selectText(newCursorPos, newCursorPos);
                field.focus();
              }
            }, '-', {
              text : 'AND',
              tooltip : 'AND Operator<br/>Example : mycorrhiza AND fungi',
              scope : this,
              handler : function() {
                // Append 'AND' to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" AND ");
                field.focus();
              }
            }, '-', {
              text : 'OR',
              tooltip : 'OR Operator<br/>Example : mycorrhiza OR fungi',
              scope : this,
              handler : function() {
                // Append 'OR' to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" OR ");
                field.focus();
              }
            }, '-', {
              text : 'NOT',
              tooltip : 'NOT Operator<br/>Example : mycorrhiza NOT fungi',
              scope : this,
              handler : function() {
                // Append 'NOT' to current cursor position
                var field = Ext.getCmp('searchQueryTextAreaId');
                field.insertAtCursor(" NOT ");
                field.focus();
              }
            }, '-', {
              text : 'Proximity',
              tooltip : 'Use proximity search operator<br/>Example : mycorrhiza~10',
              scope : this,
              handler : function() {
                Ext.window.MessageBox.NumberPrompt.prompt('Proximity Range', 'Please enter Proximity range value:', function showResultText(btn, text) {
                      if (Ext.isNumber(text) && text < 20 && text > 0) {
                        var field = Ext.getCmp('searchQueryTextAreaId');
                        field.insertAtCursor(" ~" + text);
                        field.focus();
                      }
                    });
              }
            }]
      });
  return editQueryFormToolbar;
}

// Search Patents Query Form Panel
var getSearchQueryEditFormPanel = function() {
  var searchQueryEditForm = Ext.getCmp('searchQueryEditFormId');
  if (searchQueryEditForm != null) {
    return searchQueryEditForm;
  }

  searchQueryEditForm = Ext.create('Ext.form.Panel', {
        // url: 'save-form.php',
        layout : 'anchor',
        defaults : {
          anchor : '100%'
        },
        frame : true,
        id : 'searchQueryEditFormId',
        defaultType : 'textfield',
        tbar : getEditQueryFormToolbar(),
        items : [{
          xtype : 'QueryAutoCompleteTextAreaCombo',
          id : 'searchQueryTextAreaId',
          fieldLabel : 'Choose State',
          hideLabel : true,
          emptyText : "Select states",
          store : Ext.data.StoreManager.lookup('statesStore'),
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
       }/*{
              xtype : 'ASMSHighlightedTextArea',
              name : 'query',
              id : 'searchQueryTextAreaId',
              hideLabel : true,
              hideTrigger : true,
              grow : true,
              maxHeight : 200,
              emptyText : 'Write Search Query here e.g. TI=test',
              anchor : '100%'
            }*/],
        buttonAlign : 'center',
        formPanelDropTarget : null,
        listeners : {
          afterlayout : function(form, layout, eOpts) {
            var body = form.body;
            form.formPanelDropTarget = new Ext.dd.DropTarget(body, {
                  ddGroup : 'grid-to-query-form',
                  notifyEnter : function(ddSource, e, data) {
                    // Add some flare to invite drop.
                    body.stopAnimation();
                    body.highlight();
                  },
                  notifyDrop : function(ddSource, e, data) {
                    var selectedRecord = ddSource.dragData.records[0];
                    form.items.items[0].insertAtCursor(' ' + selectedRecord.get('id') + ' ');
                    form.items.items[0].focus();
                    return true;
                  }
                });
          },
          beforeDestroy : function(form, layout, eOpts) {
            var target = form.formPanelDropTarget;
            if (target) {
              target.unreg();
              form.formPanelDropTarget = null;
            }
          }
        },
        buttons : [{
              text : 'Search',
              formBind : true,
              disabled : true,
              handler : function() {
                // submit query value to backend url
              }
            }, {
              text : 'Reset',
              handler : function() {
                Ext.getCmp('searchQueryTextAreaId').clearValue('');
              }
            }, {
              text : 'Save Query',
              handler : function() {
                // submit query value to backend url
              }
            }]
      });
  return searchQueryEditForm;
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

// +++++++++++++++++++++++++++++

// {
// // xtype : 'textareafield',
// name : 'query',
// hideLabel : true,
// xtype : 'combo',
// hideTrigger : true,
// grow : true,
// maxHeight : 200,
// multiSelect : true,
// emptyText : 'Write Search Query here e.g. TI=test',
// store : Ext.data.StoreManager.lookup('statesStore'),
// displayField : 'name',
// valueField : 'abbr',
// editable : true,
// queryMode : 'local',
// tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div
// class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL + '"
// class="chkCombo-default-icon chkCombo" />{abbr} - {name}</div>', '</tpl>'),
// displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} [{abbr}],',
// '</tpl>'),
// anchor : '100%',
// listeners : {
// render : initializeFieldsDropZone
// }
