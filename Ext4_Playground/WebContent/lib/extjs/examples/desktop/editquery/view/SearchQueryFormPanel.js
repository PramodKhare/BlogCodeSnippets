/*!
 * @Author  : Pramod Khare 
 * @Purpose : Source code for Patent Search QueryFormPanel with customized textarea,
 *            Provides customized text-area with frag-n-drop feature for fields from Fields panel
 * @Created : March 28th 2015
 * @Modified: April 4th 2015
 */
Ext.define('MyApp.EditQueryWindow.view.SearchQueryFormPanel', {
  extend : 'Ext.form.Panel',
  alias : 'widget.SearchQueryFormPanel',
  // Url to form-submit to
  // url: 'save-form.php',
  layout : 'anchor',
  defaults : {
    anchor : '100%'
  },
  frame : true,
  defaultType : 'textfield',
  buttonAlign : 'center',
  formPanelDropTarget : null,
  tbar : Ext.create('Ext.toolbar.Toolbar', {
    id : 'editQueryFormToolbarId',
    items : [{
          text : ':',
          tooltip : '"Equal to" operator<br/>Example, TI: computer',
          scope : this,
          handler : function() {
            // Append '=' sign to current cursor position
            var field = Ext.getCmp('searchQueryTextAreaId');
            field.insertAtCursor(":");
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
            MyApp.EditQueryWindow.ux.NumberPrompt.prompt('Proximity Range',
                'Please enter Proximity range value:', function showResultText(
                    btn, text) {
                  if (Ext.isNumber(text) && text < 20 && text > 0) {
                    var field = Ext.getCmp('searchQueryTextAreaId');
                    field.insertAtCursor("~" + text);
                    field.focus();
                  }
                });
          }
        }]
  }),
  // Important listeners - mainily drag-n-drop related listeners
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
              form.items.items[0]
                  .insertAtCursor(selectedRecord.get('id') + ':');
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
  // Form submit and form-clear buttons
  buttons : [{
    text : 'Search',
    tooltip : "Search patents for above query",
    formBind : true,
    disabled : true,
    handler : function() {
      // submit query value to backend url
      // Replace the shorthand queries with their actual values
      // e.g. $1 AND $2 -> should be properly expanded to their full queries
      var pattern = /(^\$[0-9]+\s+|\s+\$[0-9]+\s+|\s+\$[0-9]+$|^\$[0-9]+$)/gm;
      var query = Ext.getCmp('searchQueryTextAreaId').getTextAreaValue();
      function expandQuery(str, p1, offset, s) {
        var gridStore = Ext.getCmp('historyGridPanelId').getStore();
        var record_index = gridStore.find('id', p1.trim());
        if (record_index == -1) {
          return p1;
        } else {
          return " " + gridStore.getAt(record_index).get('query') + " ";
        }
      }
      Ext.MessageBox.alert('Search Query', query.replace(pattern, expandQuery));
      var finalFormSubmissionQuery = query.replace(pattern, expandQuery);
      // TODO - Append PC - Publication Country value from Patent Fields
      // GridPanel's
      /*if (Ext.getCmp('patentFieldsRadioGroupId').getChecked()[0].inputValue == 1) {
        // Indian patents selected
      } else {
        // Meaning - world-wide patents fields are used - 
        // var PC = Ext.getCmp('worldWidePntsPCSplitId')._PCFieldValue; 
        // Append it to query 
      }*/
      Ext.getCmp('historyGridPanelId').getStore().load();
    }
  }, {
    text : 'Reset',
    tooltip : "Reset query textarea",
    handler : function() {
      // Clears the field-values to their empty text-values
      Ext.getCmp('searchQueryTextAreaId').clearValue('');
    }
  }],
  // Items in form-panel - mainly Autosuggest TextArea
  items : [{
    xtype : 'QueryAutoCompleteTextAreaCombo',
    id : 'searchQueryTextAreaId',
    fieldLabel : 'Search Query',
    hideLabel : true,
    emptyText : "Type in your search query",
    store : new MyApp.EditQueryWindow.store.FieldValueDynamicStore({}),
    // store : Ext.data.StoreManager.lookup('fieldValueDynamicStoreId'),
    displayField : 'name',
    valueField : 'name',
    editable : true,
    cols : 20,
    rows : 6,
    hideTrigger : true,
    enableKeyEvents : true,
    fieldStyle : "height:100px",
    queryMode : 'remote',
    listeners : {
      beforequery : function(record) {
        var rawValue = this.inputEl.dom.value.trim();
        // For autosuggestion to start suggesting values - user must put
        // equals i.e .":" after field-name
        if (rawValue.lastIndexOf(":") == -1) {
          this.actualValues = '';
          this.getPicker().setVisible(false);
          return false;
        }
        // e.g. in query value - "TA : was" --> "TA" == field name and "was" ==
        // keyword
        var keyword = rawValue.substring(rawValue.lastIndexOf(":") + 1).trim();
        // Meaning --> query already fired up.
        // To show autosuggest again -> erase whole value for "that field"
        // including the opening and closing braces and then try again, it will
        // work
        // e.g. Autosuggest will work for values "TA: was" where TA is field
        // value
        // but won't work if it has any spaces in its value e.g. "TA : was tr"
        // or e.g. "TA : (+one +'two three')"
        if (keyword.search(/\s/) != -1 || keyword.length < 2) {
          this.actualValues = '';
          this.getPicker().setVisible(false);
          return false;
        }

        this.getPicker().setVisible(true);

        /**
         * So load the store based on query i.e. field-value and field-name
         */
        var temp = rawValue.substring(0, rawValue.lastIndexOf(":")).trim();
        var searchFieldName = temp.substring(temp.lastIndexOf(" "));
        record.query = keyword;
        this.getStore().getProxy().setExtraParam("searchFieldName", searchFieldName);
        this.getStore().getProxy().setExtraParam("searchFieldQuery", keyword);
        record.query = new RegExp(record.query.substring(record.query.lastIndexOf(" ") + 1), 'i');
        record.forceAll = true;
      }
    }
  }]
});
