/*!
 * @Author  : Pramod Khare 
 * @Purpose : Custom ComboBox component with TextArea and selective autosuggest
 *            Features: 
 *            1) During Normal Edit of query no auto-suggest will interfere with user.
 *            2) Autosuggest with multi-select with checkboxes
 *               It will append values in Lucene 2.6.x query multi-value query format
 *            3) Capability to load the field values in autosuggest drop-down list 
 *               based on the field Tag.
 *               i.e. autosuggest values will change depending upon the Field 
 *               value it is suggesting values for.
 *            4) Like type - autosuggest - e.g. if you type "the" - all values 
 *               which have "the" anywhere in their names - not necessarily at 
 *               start - will be suggested.
 *            
 * @Created : March 28th 2015
 * @Modified: April 4th 2015
 */
Ext.define("MyApp.EditQueryWindow.ux.QueryAutoCompleteTextAreaCombo", {
  extend : 'Ext.form.field.ComboBox',
  alias : 'widget.QueryAutoCompleteTextAreaCombo',
  // TODO - check how to put multiple values into "query textbox for multiple
  // values selection"
  multiSelect : true,
  editable : true,
  cols : 20,
  rows : 6,
  hideTrigger : true,
  enableKeyEvents : true,
  fieldStyle : "height:100px",
  autoSuggestEnableRegex : /\s*(\w+)\s*\:\s{0,2}\"*(\w{2,})\"*$/i,
  textAreaRawValue : "",
  fieldSubTpl : [
      '<div class="{hiddenDataCls}" role="presentation"></div>',
      '<div id="wrapper_div_{id}">',
      '<textarea id="{id}" rows="6" style="width: 100%;" {inputAttrTpl} class="{fieldCls} {typeCls} '
          + 'x-form-text x-form-textarea {editableCls}" autocomplete="off"',
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
      '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>', '/>', '</div>', {
        compiled : true,
        disableFormats : true
      }],
  tpl : Ext
      .create('Ext.XTemplate', '<tpl for=".">',
          '<div class="x-boundlist-item"><img src="' + Ext.BLANK_IMAGE_URL
              + '" class="chkCombo-default-icon chkCombo" />{name}</div>',
          '</tpl>'),
  displayTpl : Ext
      .create('Ext.XTemplate', '<tpl for=".">', '{name} ', '</tpl>'),
  // To enable the HTML inside the Textarea - change tpl
  // http://stackoverflow.com/questions/9016859/extjs-4-render-html-of-a-selected-value-in-a-combobox
  setRawValue : function(value) {
    var me = this;
    value = Ext.value(me.transformRawValue(value), '');
    if (me.inputEl) {
      // get the previous dom value - save it in textAreaRawValue
      this.textAreaRawValue = me.inputEl.dom.value;
      // replace the last string part
      // Use Lucene Query with Field Grouping format 
      // e.g. (+abc +xys +uyrbjhs)
      // If any values contain spaces then enclose them into double-quotes "one word"
      this.textAreaRawValue = this.textAreaRawValue.replace(
          /\s{0,2}\"*(\w+)\"*$/i, value);
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
    //return v;
    var match = this.autoSuggestEnableRegex.exec(v);
    if (Ext.isEmpty(match)) {
      return '';
    }
    return Ext.valueFrom(match[2], '');
  },
  getTextAreaValue : function() {
    this.textAreaRawValue = this.inputEl.dom.value;
    return Ext.valueFrom(this.textAreaRawValue, "");
  },
  setTextAreaValue : function(value) {
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
    text_field.value = text_field.value.substring(0, startPos) + v
        + text_field.value.substring(endPos, text_field.value.length);

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
      record.query = new RegExp(record.query.substring(record.query
              .lastIndexOf(" ")
              + 1), 'i');
      record.forceAll = true;
      // TODO - dynamically change the actual store's proxy load parameters
    }
  }
});
