/**
 * editor_plugin_src.js
 * 
 * Copyright 2009, Moxiecode Systems AB Released under LGPL License.
 * 
 * License: http://tinymce.moxiecode.com/license Contributing:
 * http://tinymce.moxiecode.com/contributing
 */

(function() {
	tinymce.create('tinymce.plugins.AdvancedImagePlugin', {
		init : function(ed, url) {
			// Register commands
			ed.addCommand('mceAdvImage', function() {
						// Internal image object like a flash placeholder
						if (ed.dom.getAttrib(ed.selection.getNode(), 'class')
								.indexOf('mceItem') != -1)
							return;

						ed.windowManager.open({
									file : url + '/image.htm',
									width : 531+ parseInt(ed.getLang('advimage.delta_width', 0)),  //480
									height : 414+ parseInt(ed.getLang('advimage.delta_height', 0)), //385
									inline : 1,
									title : "TinyMCE ImageManager",
									scrollbars 	: true,
									close_previous : true,
									resizable : false,
									maximizable : false
								}, {
									plugin_url : url
								});
					});

			// Register buttons
			ed.addButton('image', {
						title : 'advimage.image_desc',
						cmd : 'mceAdvImage'
					});
		},
		getControlHTML : function(cn) {
			switch (cn) {
			case "image":
				return tinyMCE.getButtonHTML(cn, 'lang_image_desc',
						'{$themeurl}/img/image.gif', 'mceAdvImage');
			}
			return "";
		},
		getInfo : function() {
			return {
				longname : 'Advanced image',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advimage',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},
		cleanup : function(type, content) {
			switch (type) {
				case "insert_to_editor_dom" :
					var imgs = content.getElementsByTagName("img");
					for (var i = 0; i < imgs.length; i++) {
						var onmouseover = tinyMCE.cleanupEventStr(tinyMCE
								.getAttrib(imgs[i], 'onmouseover'));
						var onmouseout = tinyMCE.cleanupEventStr(tinyMCE.getAttrib(
								imgs[i], 'onmouseout'));
						if ((src = this._getImageSrc(onmouseover)) != "") {
							if (tinyMCE.getParam('convert_urls'))
								src = tinyMCE.convertRelativeToAbsoluteURL(
										tinyMCE.settings['base_href'], src);
							imgs[i].setAttribute('onmouseover', "this.src='" + src
											+ "';");
						}
						if ((src = this._getImageSrc(onmouseout)) != "") {
							if (tinyMCE.getParam('convert_urls'))
								src = tinyMCE.convertRelativeToAbsoluteURL(
										tinyMCE.settings['base_href'], src);
							imgs[i].setAttribute('onmouseout', "this.src='" + src
											+ "';");
						}
					}
					break;
			case "get_from_editor_dom" :
				var imgs = content.getElementsByTagName("img");
				for (var i = 0; i < imgs.length; i++) {
					var onmouseover = tinyMCE.cleanupEventStr(tinyMCE
							.getAttrib(imgs[i], 'onmouseover'));
					var onmouseout = tinyMCE.cleanupEventStr(tinyMCE.getAttrib(
							imgs[i], 'onmouseout'));
					if ((src = this._getImageSrc(onmouseover)) != "") {
						if (tinyMCE.getParam('convert_urls'))
							src = eval(tinyMCE.settings['urlconverter_callback']
									+ "(src, null, true);");
						imgs[i].setAttribute('onmouseover', "this.src='" + src
										+ "';");
					}
					if ((src = this._getImageSrc(onmouseout)) != "") {
						if (tinyMCE.getParam('convert_urls'))
							src = eval(tinyMCE.settings['urlconverter_callback']
									+ "(src, null, true);");
						imgs[i].setAttribute('onmouseout', "this.src='" + src
										+ "';");
					}
				}
				break;
		}
		return content;
	},
	handleNodeChange : function(editor_id, node, undo_index, undo_levels,
			visual_aid, any_selection) {
		if (node == null)
			return;
		do {
			if (node.nodeName == "IMG"
					&& tinyMCE.getAttrib(node, 'class').indexOf('mceItem') == -1) {
				tinyMCE.switchClass(editor_id + '_advimage',
						'mceButtonSelected');
				return true;
			}
		} while ((node = node.parentNode));
		tinyMCE.switchClass(editor_id + '_advimage', 'mceButtonNormal');
		return true;
	},
	_getImageSrc : function(s) {
		var sr, p = -1;
		if (!s)
			return "";
		if ((p = s.indexOf('this.src=')) != -1) {
			sr = s.substring(p + 10);
			sr = sr.substring(0, sr.indexOf('\''));
			return sr;
		}
		return "";
	}
	});

	// Register plugin
	tinymce.PluginManager.add('advimage', tinymce.plugins.AdvancedImagePlugin);
})();