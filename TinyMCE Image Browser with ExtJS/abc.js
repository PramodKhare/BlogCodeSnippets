Ext.onReady( function(){
	tinyMCE.init({
			mode 		: "textareas", 		//"exact", 
			theme 		: "advanced",
			cleanup 	: true,
			skin 		: "o2k7",
			readonly	: false,
			height 		: "50",				//Default TinyMce height
			//content_css : "css/modifiedTinyMCEContent.css",
			content_css : "css/consult-main.css",
			plugins 	: "safari,pagebreak,contextmenu,style,layer,table,autoresize,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
			theme_advanced_buttons1 : "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect", 
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor", 
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl", 
			theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,pagebreak,|,fullscreen", 
			theme_advanced_toolbar_location		 : "top", 
			theme_advanced_toolbar_align 		 : "left", 
			theme_advanced_statusbar_location    : "bottom", 
			theme_advanced_resizing 			 : false,
			theme_advanced_path 				 : false,
			convert_fonts_to_spans : true,
			theme_advanced_resize_horizontal 	 : true,
			theme_advanced_font_sizes : "6px,8px,10px,12px,14px,16px,18px,20px,22px,24px,30px,36px,72px",
			theme_advanced_fonts : "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
			theme_advanced_resizing_min_height 	 : 150,
			theme_advanced_source_editor_wrap  	 : false,
			//theme_advanced_font_sizes : "10px,12px,14px,16px,24px"
			//entity_encoding : "raw",
			//Valid Elements will not removed during cleanup in tinymce
			//valid_elements: "@[id|class|title|style],"+ "a[name|href|target|title]," + "#p,-ol,-ul,-li,br,img[src],-sub,-sup,-b,-i," + "-span,hr",
			//extended_valid_elements : "img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]"
			//remove_script_host : false
			//Following line added by Chetan on 21-JULY-2011 for Security Testing related Bug VULNERABILITY ID-01
			extended_valid_elements : "a[rel|rev|charset|hreflang|tabindex|accesskey|type|name|href|target=_blank|title|class|onfocus|onblur]"
			//eo Security Testing related Bug VULNERABILITY ID-01
	});
	
	var textArea = new Ext.form.TextArea({
		id : 'text-area_2727',
		fieldLabel :'Description',
		anchor : '100%'
		//width: 450,
		//height : 200
	});
	
	var form = new Ext.FormPanel({
		renderTo : document.body, //(5)
		//fileUpload : true, //(1)
		//width : 400,
		frame : true,
		title : 'File Upload',
		//bodyStyle : 'padding: 10px 10px 0 10px;',
		labelWidth : 100,
		items:[textArea],
		buttons : [{
			text : 'Save',
			id : "app_savebutton",
			handler : function(){
				if(tinyMCE.get('text-area_2727'))
					alert("MCE Cintents - "+tinyMCE.get('text-area_2727').getContent());
				Ext.example.msg('Button Click', 'You clicked the button and entered the text.');
			}
		},{
			text : 'Reset',
			handler : function(){
			if(tinyMCE.get('text-area_2727'))
				tinyMCE.get('text-area_2727').setContent('');
			}
		}]
	});
	form.show();
	tinyMCE.execCommand("mceAddControl",true,"text-area_2727");
});