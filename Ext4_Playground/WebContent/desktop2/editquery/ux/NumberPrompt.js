Ext.define("MyApp.EditQueryWindow.ux.NumberPrompt", {
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
       * @class MyApp.EditQueryWindow.ux.NumberPrompt
       * @alternateClassName Ext.Msg
       * @extends Ext.window.MessageBox
       * @singleton Singleton instance of MyApp.EditQueryWindow.ux.NumberPrompt.
       */
      MyApp.EditQueryWindow.ux.NumberPrompt = new this();
    });