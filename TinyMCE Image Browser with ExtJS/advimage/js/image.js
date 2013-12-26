/*
 * Author : Pramod Khare
 * Image Browser for ExtJS
 */

//File Upload Button
fnGetUploadButton = function() {
	
	var uploadButton = Ext.getCmp('uploadButton');
	if (uploadButton == null) {
		var uploadButton = new Ext.Button({
			text : "Upload",
			//iconCls : 'upload',
			minWidth : 80,
			tooltip : "Upload File",
			tooltipType : 'qtip',
			id : "uploadButton",
			listeners : {
				click : function() {				
					/*
					var uploadForm = Ext.getCmp(IDs.FileUploadWindow.UploadFormPanel);
						
						uploadForm.getForm().submit({
						url: applicationBasePath + '/FileUploadAction?hdnBtnType=UPLOAD&hdnCBId='+ApplicationVars.lCasebaseId+'&hdnFileName='+Ext.getCmp('app_idFileUploadField').getValue(), //added " '&hdnFileName='+Ext.getCmp('app_idFileUploadField').getValue() " by Shantanu @1-DEC-2011
						waitMsg : 'File is being uploaded....',
						fileUpload : true,
						standardSubmit :true,
						success: function(form, o) {
							
							//added by Shantanu to avoid Path Manipulation security flaw(02-DEC-2011)
							var resText = o.response.responseText
							
							if(o.response.responseText == "<pre>Invalid File path. File path Cannot contain \"\\..\", \"../\" special characters.\n</pre>")
							{
								Ext.Msg.alert('File Path Exception',o.response.responseText.substring(5,87));
						        return false;
							}
							//ends here...
							else
							{
							var gridPanel = Ext
									.getCmp(IDs.FileUploadWindow.AttachmentListGridPanel);
							Ext.getDom(IDs.FileUploadWindow.GridBbarFileStatusLabel).innerHTML = Labels.FileUploadWindow.GridBbarInnerHTMLText;
							gridPanel.getStore().reload();
							var fileUploadWindow = Ext
									.getCmp(IDs.FileUploadWindow.FileUploadWindowID);
							fileUploadWindow
									.remove(IDs.FileUploadWindow.UploadFormPanel);

							fileUploadWindow.doLayout();
							fileUploadWindow.syncSize();
							fileUploadWindow.center();
							var uploadbutton = Ext.getCmp(IDs.FileUploadWindow.UploadFileToolbarButton);
							uploadbutton.enable();
							uploadbutton.setText((this.text == Labels.FileUploadWindow.UploadFileButtonValue1)
											? Labels.FileUploadWindow.UploadFileButtonValue2
											: Labels.FileUploadWindow.UploadFileButtonValue1);
							uploadbutton.setIconClass('upload-new-file-button');
							uploadbutton.setTooltip(Tooltips.FileUploadWindow.UploadFileButtonValue1);
//							if(FileUploadWindow.isFromCaseSummaryFilter == true){
//								Ext.getCmp(IDs.FileUploadWindow.AttachmentButton).setText("Select File");
//							}
							}
						},
						failure:function(form,o){
							Utility.getAjaxRequestFauilureMsg("Error",o.response);
						   	//alert(o.response.responseText);
						}
						});*/
				}
			}
		});
	}
	return uploadButton;
};

function makeAttrib(attrib, value) {
	var formObj = document.forms[0];
	var valueElm = formObj.elements[attrib];

	if (typeof(value) == "undefined" || value == null) {
		value = "";
		if (valueElm)
			value = valueElm.value;
	}

	if (value == "")
		return "";

	// XML encode it
	// value = value.replace(/&/g, '&amp;');
	// value = value.replace(/\"/g, '&quot;');
	// value = value.replace(/</g, '&lt;');
	// value = value.replace(/>/g, '&gt;');

	return ' ' + attrib + '="' + value + '"';
}

function insertAction() {
	var fileLength = document.getElementById("fLength").value;
	var fileName = "";
	var flag = 0;
	var netscapePath = "";
	//if(navigator.appName.toLowerCase() == "netscape"){
		netscapePath = document.getElementById("strPath").value;
		var tempPath = netscapePath.split('\\');
		netscapePath = "";
		for(var i=0; i<tempPath.length;i++){
			netscapePath += tempPath[i]+"/";
		}
		//alert(netscapePath);
		var contextPath = window.location.href;
		contextPath = contextPath.substring(0,contextPath.lastIndexOf("/")+1);
		//alert(contextPath);
		netscapePath = contextPath + netscapePath;
	//}
	//alert("fileLength = "+fileLength);
	for (i = 0; i < fileLength; i++) {
		//if(navigator.appName.toLowerCase() == "netscape"){
//			tinyMCEPopup.execCommand("mceInsertContent", false, "<img src=\"CONSULT_ATTACHMENTS/4/0/_X~Q@Q~X_/21070_1600x1200-wallpaper-cb1275934550jpg.img\">");
//			tinyMCEPopup.execCommand("mceInsertContent", false, "<img src=\"http://10.0.1.204:9090/consult/CONSULT_ATTACHMENTS/4/0/_X~Q@Q~X_/21070_1600x1200-wallpaper-cb1275934550jpg.img\">");
//			fileName = "http://10.0.1.204:9090/consult/CONSULT_ATTACHMENTS/4/0/_X~Q@Q~X_/21070_1600x1200-wallpaper-cb1275934550jpg.img";
			
			if (document.getElementById(i).checked == true) {
				var imgName = document.getElementById(i).value;
				var Extn = imgName.substring(imgName.indexOf(".") + 1,
						imgName.length);
	
				fileName += netscapePath
						+ imgName.substring(0, imgName.indexOf(".")) + Extn
						+ ".img" + "|";
				flag = 1;
			}
		/*}else{
			if (document.getElementById(i).checked == true) {
				var imgName = document.getElementById(i).value;
				var Extn = imgName.substring(imgName.indexOf(".") + 1,
						imgName.length);
	
				fileName += document.getElementById("strPath").value + "\\"
						+ imgName.substring(0, imgName.indexOf(".")) + Extn
						+ ".img" + "|";
				flag = 1;
			}
		}*/
	}	
	//alert(fileName);
	
	/*var inst = tinyMCE.getInstanceById(tinyMCE.getWindowArg('editor_id'));
	var elm = inst.getFocusElement();
	var formObj = document.forms[0];*/
	
	// /var src = formObj.src.value;
	// var onmouseoversrc = formObj.onmouseoversrc.value;
	// var onmouseoutsrc = formObj.onmouseoutsrc.value;

	/*
	 * if (tinyMCE.getParam("accessibility_warnings")) { if (formObj.alt.value ==
	 * "") { var answer = confirm(tinyMCE.getLang('lang_advimage_missing_alt',
	 * '', true)); if (answer == true) { formObj.alt.value = " "; } } else { var
	 * answer = true; }
	 * 
	 * if (!answer) return; }
	 * 
	 * if (onmouseoversrc && onmouseoversrc != "") onmouseoversrc = "this.src='" +
	 * convertURL(onmouseoversrc, tinyMCE.imgElement) + "';";
	 * 
	 * if (onmouseoutsrc && onmouseoutsrc != "") onmouseoutsrc = "this.src='" +
	 * convertURL(onmouseoutsrc, tinyMCE.imgElement) + "';";
	 */
	/*
	if (elm != null && elm.nodeName == "IMG") {
		setAttrib(elm, 'src', convertURL(src, tinyMCE.imgElement));
		setAttrib(elm, 'mce_src', src);
		setAttrib(elm, 'alt');
		setAttrib(elm, 'title');
		setAttrib(elm, 'border');
		setAttrib(elm, 'vspace');
		setAttrib(elm, 'hspace');
		setAttrib(elm, 'width');
		setAttrib(elm, 'height');
		setAttrib(elm, 'onmouseover', onmouseoversrc);
		setAttrib(elm, 'onmouseout', onmouseoutsrc);
		setAttrib(elm, 'id');
		setAttrib(elm, 'dir');
		setAttrib(elm, 'lang');
		setAttrib(elm, 'longdesc');
		setAttrib(elm, 'usemap');
		setAttrib(elm, 'style');
		setAttrib(elm, 'class', getSelectValue(formObj, 'classlist'));
		setAttrib(elm, 'align', getSelectValue(formObj, 'align'));

		// tinyMCEPopup.execCommand("mceRepaint");

		// Repaint if dimensions changed
		if (formObj.width.value != orgImageWidth
				|| formObj.height.value != orgImageHeight)
			inst.repaint();

		// Refresh in old MSIE
		if (tinyMCE.isMSIE5)
			elm.outerHTML = elm.outerHTML;
	} else */
		var fileNames = fileName;
		var fileNamArray = fileNames.split("|");
		var html = "";
		for (i = 0; i < fileNamArray.length - 1; i++) {
			html += "<img";

			html += makeAttrib('src', fileNamArray[i]);
			html += makeAttrib('mce_src', fileNamArray[i]);
			html += makeAttrib('alt');
			html += makeAttrib('title');
			html += makeAttrib('border');
			html += makeAttrib('vspace');
			html += makeAttrib('hspace');
			html += makeAttrib('width');
			html += makeAttrib('height');
			// html += makeAttrib('onmouseover', onmouseoversrc);
			// html += makeAttrib('onmouseout', onmouseoutsrc);
			html += makeAttrib('id');
			html += makeAttrib('dir');
			html += makeAttrib('lang');
			html += makeAttrib('longdesc');
			html += makeAttrib('usemap');
			// html += makeAttrib('style');
			// html += makeAttrib('class', getSelectValue(formObj,
			// 'classlist'));
			// html += makeAttrib('align', getSelectValue(formObj, 'align'));
			html += " />";

			tinyMCEPopup.execCommand("mceInsertContent", false, html);
		}
	if (flag == 0)
		alert("Select some file(s) to insert");
	else {
		//tinyMCE._setEventsEnabled(tinyMCE.activeEditor.getBody(), false);
		tinyMCEPopup.close();
	}
}

//File Browse field
fnGetFileUploadField = function() {
	var fileUploadField = Ext.getCmp('fileUploadField');
	if (fileUploadField == null) {
		var fileUploadField = new Ext.ux.FileUploadField({
			fieldLabel : "Upload File",
			emptyText : "Browse File to upload ...",
			id : "fileUploadField",
			name : 'hdnFileName',
			anchor : '100%',
			iconCls : 'add',
			buttonText : "Browse",
			tooltip : "Browse Files",
			tooltipType : 'qtip',
			buttonOffset : 10,
			width : 200,
			listeners : {
				fileselected : function(fileUploadField, uploadFileName) {
					
				}
			}
		});
	}
	return fileUploadField;
};

//File Upload Form Panel
fnGetUploadFormPanel = function() {
	var uploadFormPanel = Ext.getCmp('image-upload-field');
	if (uploadFormPanel == null) {
		var uploadFormPanel = new Ext.FormPanel({
			labelWidth : 80,
			fileUpload : true,
			border : false,
			frame : true,
			//standardSubmit: true,
			headers: {'Content-type':'multipart/form-data'},
			id : 'image-upload-field',
			autoHeight : true,
			//anchor : '100%',
			//width : 536, //486,
			listeners : {
				afterlayout : function(thisFormPanel, layout) {
					// check what steps are required to perform
					//Ext.getCmp(IDs.FileUploadWindow.UploadButton).disable();
					//Ext.getDom(IDs.FileUploadWindow.ProgressTaskText).innerHTML = Labels.FileUploadWindow.ProgressTaskInnerHTMLText1;
				}
			},
			bodyStyle : 'padding:10px 10px 10px 10px;',
			items : [
					{
						xtype : 'panel',
						layout : 'column',
						border : false,
						defaults : {
							border : false
						},
						height : 35,
						items : [{
									layout : 'form',
									bodyStyle : 'padding:1px 0 0 0;',
									columnWidth : 0.8,
									labelWidth : 75,
									items : [fnGetFileUploadField()]
								}, {
									layout : 'form',
									columnWidth : 0.2,
									bodyStyle : 'padding:1px 0 5px 10px;',
									items : [fnGetUploadButton()]
								}]
					}],
			buttons		: [{
						text: "Insert",
						id:'insertButton',
						iconCls : 'find-similar-cases',
						tooltip : "Insert Image(s)",
						tooltipType : 'qtip',
						handler : function(){
							//getSelectedRecords();
							//getSelectedNodes();
							//getSelectedIndexes();
						}
					},{
						text: "Cancel",
						id:'cancelButton',
						iconCls : 'find-similar-cases',
						tooltip : "Cancel",
						tooltipType : 'qtip',
						handler: function(){
							tinyMCEPopup.close();
						}
					}]
		});
	}
	return uploadFormPanel;
};


Ext.DataView.LabelEditor = function(cfg, field){
    Ext.DataView.LabelEditor.superclass.constructor.call(this,
        field || new Ext.form.TextField({
            allowBlank: false,
            growMin:90,
            growMax:240,
            grow:true,
            selectOnFocus:true
        }), cfg
    );
}

Ext.extend(Ext.DataView.LabelEditor, Ext.Editor, {
    alignment: "tl-tl",
    hideEl : false,
    cls: "x-small-editor",
    shim: false,
    completeOnEnter: true,
    cancelOnEsc: true,
    labelSelector: 'span.x-editable',

    init : function(view){
        this.view = view;
        view.on('render', this.initEditor, this);
        this.on('complete', this.onSave, this);
    },

    initEditor : function(){
        this.view.getEl().on('mousedown', this.onMouseDown, this, {delegate: this.labelSelector});
    },

    onMouseDown : function(e, target){
        if(!e.ctrlKey && !e.shiftKey){
            var item = this.view.findItemFromChild(target);
            e.stopEvent();
            var record = this.view.store.getAt(this.view.indexOf(item));
            this.startEdit(target, record.data[this.dataIndex]);
            this.activeRecord = record;
        }else{
            e.preventDefault();
        }
    },

    onSave : function(ed, value){
        this.activeRecord.set(this.dataIndex, value);
    }
});


Ext.DataView.DragSelector = function(cfg){
    cfg = cfg || {};
    var view, regions, proxy, tracker;
    var rs, bodyRegion, dragRegion = new Ext.lib.Region(0,0,0,0);
    var dragSafe = cfg.dragSafe === true;

    this.init = function(dataView){
        view = dataView;
        view.on('render', onRender);
    };

    function fillRegions(){
        rs = [];
        view.all.each(function(el){
            rs[rs.length] = el.getRegion();
        });
        bodyRegion = view.el.getRegion();
    }

    function cancelClick(){
        return false;
    }

    function onBeforeStart(e){
        return !dragSafe || e.target == view.el.dom;
    }

    function onStart(e){
        view.on('containerclick', cancelClick, view, {single:true});
        if(!proxy){
            proxy = view.el.createChild({cls:'x-view-selector'});
        }else{
            proxy.setDisplayed('block');
        }
        fillRegions();
        view.clearSelections();
    }

    function onDrag(e){
        var startXY = tracker.startXY;
        var xy = tracker.getXY();

        var x = Math.min(startXY[0], xy[0]);
        var y = Math.min(startXY[1], xy[1]);
        var w = Math.abs(startXY[0] - xy[0]);
        var h = Math.abs(startXY[1] - xy[1]);

        dragRegion.left = x;
        dragRegion.top = y;
        dragRegion.right = x+w;
        dragRegion.bottom = y+h;

        dragRegion.constrainTo(bodyRegion);
        proxy.setRegion(dragRegion);

        for(var i = 0, len = rs.length; i < len; i++){
            var r = rs[i], sel = dragRegion.intersect(r);
            if(sel && !r.selected){
                r.selected = true;
                view.select(i, true);
            }else if(!sel && r.selected){
                r.selected = false;
                view.deselect(i);
            }
        }
    }

    function onEnd(e){
        if(proxy){
            proxy.setDisplayed(false);
        }
    }

    function onRender(view){
        tracker = new Ext.dd.DragTracker({
            onBeforeStart: onBeforeStart,
            onStart: onStart,
            onDrag: onDrag,
            onEnd: onEnd
        });
        tracker.initEl(view.el);
    }
};

Ext.onReady( function(){
Ext.QuickTips.init();
/**
var json = {
    "images": [
        {
            "name": "pic.jpg",
            "size": 22.22,
            "url": "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg",
            "lCasebaseId": 455
        },
        {
            "name": "pic.jpg",
            "size": 212.22,
            "url": "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg",
            "lCasebaseId": 455
        },
        {
            "name": "pic.jpg",
            "size": 643.22,
            "url": "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg",
            "lCasebaseId": 455
        },
        {
            "name": "pic.jpg",
            "size": 232.22,
            "url": "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg",
            "lCasebaseId": 455
        }
    ]
};
*/
var sampleArray1 = [["A.jpg", "http://wareye.com/wp-content/uploads/2009/08/16-635x476.jpg", "4.12"], 
					["B.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "204.12"],
					["A.jpg", "http://this-news.com/wp-content/uploads/2011/07/moern-plane-jas39ng_200811201.jpg", "24.12"], 
					["B.jpg", "http://www.fighterplanephotos.com/v2/user-content/uploads/wall/mid/28/Jaguar_GR1_Fighter_Plane_Photo_-_01.jpg", "234.12"],
					["A.jpg", "http://schema-root.org/military/weapons/aircraft/fighters/f-16/f-16.jpg", "44.12"], 
					["B.jpg", "http://this-news.com/wp-content/uploads/2011/07/moern-plane-jas39ng_200811201.jpg", "234.12"],
					["A.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "234.12"], 
					["B.jpg", "http://schema-root.org/military/weapons/aircraft/fighters/f-16/f-16.jpg", "14.12"],
					["A.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "2.12"], 
					["B.jpg", "http://www.hightech-edge.com/wp-content/uploads/p51-mustang.jpg", "23.34"]];
//store used for Favourite page combo 
var sampleArray = [["A.jpg", "http://wareye.com/wp-content/uploads/2009/08/16-635x476.jpg", "234.12"], 
					["B.jpg", "http://this-news.com/wp-content/uploads/2011/07/moern-plane-jas39ng_200811201.jpg", "12.12"],
					["A.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "294.12"], 
					["B.jpg", "http://this-news.com/wp-content/uploads/2011/07/moern-plane-jas39ng_200811201.jpg", "234.12"],
					["A.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "284.12"], 
					["B.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "274.12"],
					["A.jpg", "http://www.hightech-edge.com/wp-content/uploads/p51-mustang.jpg", "26.12"], 
					["B.jpg", "http://this-news.com/wp-content/uploads/2011/07/moern-plane-jas39ng_200811201.jpg", "24.12"],
					["A.jpg", "http://www.fighterplanephotos.com/v2/user-content/uploads/wall/mid/28/Jaguar_GR1_Fighter_Plane_Photo_-_01.jpg", "29.12"], 
					["B.jpg", "http://schema-root.org/military/weapons/aircraft/fighters/f-16/f-16.jpg", "20.12"],
					["A.jpg", "https://www.fas.org/programs/ssp/man/moremanpics/b52_2.jpg", "2.12"], 
					["B.jpg", "http://schema-root.org/military/weapons/aircraft/fighters/f-16/f-16.jpg", "27.12"],
					["C.jpg", "http://www.fighterplanephotos.com/v2/user-content/uploads/wall/mid/28/Jaguar_GR1_Fighter_Plane_Photo_-_01.jpg", "54.12"]];
var ImageReader= new Ext.data.ArrayReader({ }, ['name', 'url',{name:'size', type: 'float'}
					//,{name:'lastmod', type:'date', dateFormat:'timestamp'}
			]);
var store = new Ext.data.SimpleStore({
			fields: ['name', 'url',{name:'size', type: 'float'}
					//,{name:'lastmod', type:'date', dateFormat:'timestamp'}
			],
			//reader: ImageReader,
			//proxy: new Ext.data.MemoryProxy(sampleArray) 
			data : sampleArray
		});

var xd = Ext.data;

    var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{name}">',
		    '<div class="thumb"><img src="{url}" title="{name}"></div>',
		    '<span class="x-editable">{shortName}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
	);

    var panel = new Ext.Panel({
		region: 'north',
        height: 300,
        border: true,
        margins: '0 0 5 0',
        id:'images-view',
        autoScroll : true,
        frame:true,
        tbar:[{
        	text: 'Filter',
			tooltipType : 'qtip',
        	tooltip : 'Filter By File Name'
        },{
        	xtype: 'textfield',
        	id: 'filter',
        	selectOnFocus: true,
        	width: 100,
        	listeners: {
        		'render': {fn:function(){
			    	/*Ext.getCmp('filter').getEl().on('keyup', function(){
			    		this.filter();
			    	}, this, {buffer:500});*/
        		}, scope:this}
        	}
        },'-', {
        	text: 'Sort By ',
        	id : 'sortOrder',
        	Asc : true,
        	tooltipType : 'qtip',
        	tooltip : 'Sort Ascending'
        },{
        	id: 'sortSelect',
        	xtype: 'combo',
	        typeAhead: true,
	        triggerAction: 'all',
	        width: 100,
	        editable: false,
	        mode: 'local',
	        displayField: 'desc',
	        valueField: 'name',
	        lazyInit: false,
	        value: 'name',
	        store: new Ext.data.SimpleStore({
		        fields: ['name', 'desc'],
		        data : [['name', 'Name'],['size', 'File Size'],['lastmod', 'Last Modified']]
		    }),
		    listeners: {
				'select': {fn:function(){
					Ext.getCmp('imageDataView').store.sort('name', 'asc');
				}, scope:this}
		    }
	    },'-',{
			text: 'Delete',
			iconCls : 'find-similar-cases',
			tooltipType : 'qtip',
        	tooltip : 'Delete File'
		},'->','-',{
			id:'refresh_List',
			icon : '/refresh.png',
			cls : 'x-btn-icon',
			tooltip:'Refresh list of Files',
			handler : function() {
		    	Ext.getCmp('imageDataView').getStore().removeAll();
		    	Ext.getCmp('imageDataView').getStore().loadData(sampleArray1);
			},
			scope : this
		}],
        collapsible:false,
        tools:[{
		    id:'refresh',
		    qtip: 'Refresh list of files',
		    // hidden:true,
		    handler: function(event, toolEl, panel){
		    	Ext.getCmp('imageDataView').getStore().removeAll();
		    	Ext.getCmp('imageDataView').getStore().loadData(sampleArray1);
		    }
		}],
        layout:'auto',
        title:'Image Browser (0 items selected)',
        items: new Ext.DataView({
            store: store,
            tpl: tpl,
            autoHeight:true,
            multiSelect: true,
            overClass:'x-view-over',
            itemSelector:'div.thumb-wrap',
            emptyText: 'No images to display',
			id : 'imageDataView',
            plugins: [
                new Ext.DataView.DragSelector()
                //,new Ext.DataView.LabelEditor({dataIndex: 'name'})
            ],

            prepareData: function(data){
                data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                data.sizeString = Ext.util.Format.fileSize(data.size);
                //data.dateString = data.lastmod.format("m/d/Y g:i a");
                return data;
            },
            
            listeners: {
            	selectionchange: {
            		fn: function(dv,nodes){
            			var l = nodes.length;
            			var s = l != 1 ? 's' : '';
            			panel.setTitle('Simple DataView ('+l+' item'+s+' selected)');
            		}
            	},
            	dblclick : function (thisDataView, index, node, e){
            		Ext.Msg.alert("Node Double Clicked"+node)
            	}
            }
        })
    });
	new Ext.Viewport({
    layout: 'border',    
    items: [panel,{
        region: 'center',
        autoHeight: true,
        border: true,
		items: fnGetUploadFormPanel(),
        margins: '0 0 5 0'
    }]
});
});

