/**
 * Author : Pramod Khare Contains - source code for Patent Search QueryFormPanel -
 * with customized textarea
 */
Ext.define('MyApp.EditQueryWindow.view.SearchQueryFormPanel', {
    extend : 'Ext.form.Panel',
    alias : 'widget.SearchQueryFormPanel',
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
                        var newCursorPos = field
                                .getCursorSelectionStartPosition()
                                + 2;
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
                        var newCursorPos = field
                                .getCursorSelectionStartPosition()
                                + 1;
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
                        var newCursorPos = field
                                .getCursorSelectionStartPosition()
                                + 1;
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
                        MyApp.EditQueryWindow.ux.NumberPrompt.prompt(
                                'Proximity Range',
                                'Please enter Proximity range value:',
                                function showResultText(btn, text) {
                                    if (Ext.isNumber(text) && text < 20
                                            && text > 0) {
                                        var field = Ext
                                                .getCmp('searchQueryTextAreaId');
                                        field.insertAtCursor(" ~" + text);
                                        field.focus();
                                    }
                                });
                    }
                }]
    }),
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
                            form.items.items[0].insertAtCursor(' '
                                    + selectedRecord.get('id') + ' ');
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
            }],
    items : [{
                xtype : 'QueryAutoCompleteTextAreaCombo',
                id : 'searchQueryTextAreaId',
                fieldLabel : 'Search Query',
                hideLabel : true,
                emptyText : "Type in your search query",
                store : new Ext.data.Store({
                            autoDestroy : true,
                            autoLoad : true,
                            sortOnLoad : true,
                            proxy : {
                                // url: '/url/to/my/json/encoded/results',
                                type : 'memory',
                                reader : {
                                    type : 'json',
                                    root : 'items'
                                }
                            },
                            fields : ['abbr', 'name', 'slogan'],
                            data : {
                                'items' : [{
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
                                        }]
                            }
                        }),
                displayField : 'name',
                valueField : 'name',
                editable : true,
                cols : 20,
                rows : 6,
                hideTrigger : true,
                // matchFieldWidth : false,
                enableKeyEvents : true,
                fieldStyle : "height:100px",
                queryMode : 'local'
            }]
});