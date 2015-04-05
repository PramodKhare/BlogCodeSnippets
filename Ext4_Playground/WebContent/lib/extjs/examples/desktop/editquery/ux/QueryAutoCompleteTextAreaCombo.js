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
  multiSelect : true,
  editable : true,
  cols : 20,
  rows : 6,
  hideTrigger : true,
  enableKeyEvents : true,
  fieldStyle : "height:100px",
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
  displayTpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '+{[this.setDisplayValue(values.name)]} ',
       '</tpl>', {
        // XTemplate configuration:
        compiled : true,
        disableFormats : true,
        // member functions:
        setDisplayValue : function(name) {
          if (name.search(/\s/m) == -1) {
            return name;
          } else {
            return '"' + name + '"';
          }
        }
      }),
  // To enable the HTML inside the Textarea - change tpl
  // http://stackoverflow.com/questions/9016859/extjs-4-render-html-of-a-selected-value-in-a-combobox
  getRawValue : function() {
    var me = this, 
    v = Ext.value(me.actualValues, '');
    if (v === me.emptyText && me.valueContainsPlaceholder) {
      return '';
    }
    return v;
  },
  setRawValue : function(value) {
    var me = this, previousRawValue, newRawValue;
    value = Ext.value(me.transformRawValue(value), '');
    if (me.inputEl) {
        me.rawValue = me.inputEl.dom.value
    }else{
        me.rawValue = Ext.valueFrom(me.rawValue, '');
    }
    me.actualValues = value;
    if(me.rawValue.lastIndexOf(":") != -1){
        // Replace everything after ":" with given value and then assign it to this.rawValue
        previousRawValue = me.rawValue.substring(0,me.rawValue.lastIndexOf(":")+1);
        newRawValue = previousRawValue + "(" + me.actualValues + ")";
    }else{
        newRawValue = me.actualValues;
    }
    if (me.inputEl) {
      me.inputEl.dom.value = newRawValue;
      me.rawValue = newRawValue;
    }
    return me.actualValues;
  },
  getTextAreaValue : function() {
    this.rawValue = this.inputEl.dom.value;
    return Ext.valueFrom(this.rawValue, "");
  },
  setTextAreaValue : function(value) {
    this.rawValue = value;
    this.inputEl.dom.value = value;
  },
  clearAndSetValue : function(value) {
    this.clearValue();
    this.actualValues = '';
    this.rawValue = value;
    this.inputEl.dom.value = value;
  },
  clearValue : function() {
    this.callParent();
    this.rawValue = "";
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
      // combo.getPicker().hide();
    },
    beforequery : function(record) {
      var rawValue = this.inputEl.dom.value.trim();
      // For autosuggestion to start suggesting values - user must put 
      // equals i.e .":" after field-name
      if(rawValue.lastIndexOf(":") == -1){
        this.actualValues = '';
        return false;
      }
      // e.g. in query value - "TA : was" --> "TA" == field name and "was" == keyword
      var keyword = rawValue.substring(rawValue.lastIndexOf(":")+1).trim();
      // Meaning --> query already fired up.
      // To show autosuggest again -> erase whole value for "that field" 
      // including the opening and closing braces and then try again, it will work
      // e.g. Autosuggest will work for values "TA: was" where TA is field value
      // but won't work if it has any spaces in its value e.g. "TA : was tr"
      // or e.g. "TA : (+one +'two three')"
      if(keyword.search(/\s/) != -1 || keyword.length < 2){
        this.actualValues = '';
        return false;
      }
      /**
       * So load the store based on query i.e. field-value and field-name
       */
      var temp = rawValue.substring(0,rawValue.lastIndexOf(":")).trim();
      var searchFieldName = temp.substring(temp.lastIndexOf(" "));
      record.query = keyword;
      record.query = new RegExp(record.query.substring(record.query.lastIndexOf(" ") + 1), 'i');
      record.forceAll = true;
      // TODO - dynamically change the actual store's proxy load parameters
    }
  }
});
