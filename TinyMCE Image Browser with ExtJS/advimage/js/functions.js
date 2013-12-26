/* Functions for the advimage plugin popup */

var preloadImg = null;
var orgImageWidth, orgImageHeight;

function preinit() {
	// Initialize
	tinyMCE.setWindowArg('mce_windowresize', false);

	// Import external list url javascript
	var url = tinyMCE.getParam("external_image_list_url");
	if (url != null) {
		// Fix relative
		if (url.charAt(0) != '/' && url.indexOf('://') == -1)
			url = tinyMCE.documentBasePath + "/" + url;

		document.write('<sc'
				+ 'ript language="javascript" type="text/javascript" src="'
				+ url + '"></sc' + 'ript>');
	}
}

function convertURL(url, node, on_save) {
	return eval("tinyMCEPopup.windowOpener."
			+ tinyMCE.settings['urlconverter_callback']
			+ "(url, node, on_save);");
}

function getImageSrc(str) {
	var pos = -1;

	if (!str)
		return "";

	if ((pos = str.indexOf('this.src=')) != -1) {
		var src = str.substring(pos + 10);

		src = src.substring(0, src.indexOf('\''));

		if (tinyMCE.getParam('convert_urls'))
			src = convertURL(src, null, true);

		return src;
	}

	return "";
}

function init() {
	tinyMCEPopup.resizeToInnerSize();

	var formObj = document.forms[0];
	var inst = tinyMCE.getInstanceById(tinyMCE.getWindowArg('editor_id'));
	var elm = inst.getFocusElement();
	var action = "insert";
	var html = "";

	// Image list src
	html = getImageListHTML('imagelistsrc', 'src', 'onSelectMainImage');
	if (html == "")
		document.getElementById("imagelistsrcrow").style.display = 'none';
	else
		document.getElementById("imagelistsrccontainer").innerHTML = html;

	// Image list oversrc
	html = getImageListHTML('imagelistover', 'onmouseoversrc');
	if (html == "")
		document.getElementById("imagelistoverrow").style.display = 'none';
	else
		document.getElementById("imagelistovercontainer").innerHTML = html;

	// Image list outsrc
	html = getImageListHTML('imagelistout', 'onmouseoutsrc');
	if (html == "")
		document.getElementById("imagelistoutrow").style.display = 'none';
	else
		document.getElementById("imagelistoutcontainer").innerHTML = html;

	// Src browser
	html = getBrowserHTML('srcbrowser', 'src', 'image', 'advimage');
	document.getElementById("srcbrowsercontainer").innerHTML = html;

	// Over browser
	html = getBrowserHTML('oversrcbrowser', 'onmouseoversrc', 'image',
			'advimage');
	document.getElementById("onmouseoversrccontainer").innerHTML = html;

	// Out browser
	html = getBrowserHTML('outsrcbrowser', 'onmouseoutsrc', 'image', 'advimage');
	document.getElementById("onmouseoutsrccontainer").innerHTML = html;

	// Longdesc browser
	html = getBrowserHTML('longdescbrowser', 'longdesc', 'file', 'advimage');
	document.getElementById("longdesccontainer").innerHTML = html;

	// Resize some elements
	if (isVisible('srcbrowser'))
		document.getElementById('src').style.width = '260px';

	if (isVisible('oversrcbrowser'))
		document.getElementById('onmouseoversrc').style.width = '260px';

	if (isVisible('outsrcbrowser'))
		document.getElementById('onmouseoutsrc').style.width = '260px';

	if (isVisible('longdescbrowser'))
		document.getElementById('longdesc').style.width = '180px';

	// Check action
	if (elm != null && elm.nodeName == "IMG")
		action = "update";

	formObj.insert.value = tinyMCE.getLang('lang_' + action, 'Insert', true);

	if (action == "update") {
		var src = tinyMCE.getAttrib(elm, 'src');
		var onmouseoversrc = getImageSrc(tinyMCE.cleanupEventStr(tinyMCE
				.getAttrib(elm, 'onmouseover')));
		var onmouseoutsrc = getImageSrc(tinyMCE.cleanupEventStr(tinyMCE
				.getAttrib(elm, 'onmouseout')));

		src = convertURL(src, elm, true);

		// Use mce_src if found
		var mceRealSrc = tinyMCE.getAttrib(elm, 'mce_src');
		if (mceRealSrc != "") {
			src = mceRealSrc;

			if (tinyMCE.getParam('convert_urls'))
				src = convertURL(src, elm, true);
		}

		if (onmouseoversrc != "" && tinyMCE.getParam('convert_urls'))
			onmouseoversrc = convertURL(onmouseoversrc, elm, true);

		if (onmouseoutsrc != "" && tinyMCE.getParam('convert_urls'))
			onmouseoutsrc = convertURL(onmouseoutsrc, elm, true);

		// Setup form data
		var style = tinyMCE.parseStyle(tinyMCE.getAttrib(elm, "style"));

		// Store away old size
		orgImageWidth = trimSize(getStyle(elm, 'width'))
		orgImageHeight = trimSize(getStyle(elm, 'height'));

		formObj.src.value = src;
		formObj.alt.value = tinyMCE.getAttrib(elm, 'alt');
		formObj.title.value = tinyMCE.getAttrib(elm, 'title');
		formObj.border.value = trimSize(getStyle(elm, 'border', 'borderWidth'));
		formObj.vspace.value = tinyMCE.getAttrib(elm, 'vspace');
		formObj.hspace.value = tinyMCE.getAttrib(elm, 'hspace');
		formObj.width.value = orgImageWidth;
		formObj.height.value = orgImageHeight;
		formObj.onmouseoversrc.value = onmouseoversrc;
		formObj.onmouseoutsrc.value = onmouseoutsrc;
		formObj.id.value = tinyMCE.getAttrib(elm, 'id');
		formObj.dir.value = tinyMCE.getAttrib(elm, 'dir');
		formObj.lang.value = tinyMCE.getAttrib(elm, 'lang');
		formObj.longdesc.value = tinyMCE.getAttrib(elm, 'longdesc');
		formObj.usemap.value = tinyMCE.getAttrib(elm, 'usemap');
		formObj.style.value = tinyMCE.serializeStyle(style);

		// Select by the values
		if (tinyMCE.isMSIE)
			selectByValue(formObj, 'align',
					getStyle(elm, 'align', 'styleFloat'));
		else
			selectByValue(formObj, 'align', getStyle(elm, 'align', 'cssFloat'));

		addClassesToList('classlist', 'advimage_styles');

		selectByValue(formObj, 'classlist', tinyMCE.getAttrib(elm, 'class'));
		selectByValue(formObj, 'imagelistsrc', src);
		selectByValue(formObj, 'imagelistover', onmouseoversrc);
		selectByValue(formObj, 'imagelistout', onmouseoutsrc);

		updateStyle();
		showPreviewImage(src, true);
		changeAppearance();

		window.focus();
	} else
		addClassesToList('classlist', 'advimage_styles');

	// If option enabled default contrain proportions to checked
	if (tinyMCE.getParam("advimage_constrain_proportions", true))
		formObj.constrain.checked = true;

	// Check swap image if valid data
	if (formObj.onmouseoversrc.value != "" || formObj.onmouseoutsrc.value != "")
		setSwapImageDisabled(false);
	else
		setSwapImageDisabled(true);
}

function setSwapImageDisabled(state) {
	var formObj = document.forms[0];

	formObj.onmousemovecheck.checked = !state;

	setBrowserDisabled('overbrowser', state);
	setBrowserDisabled('outbrowser', state);

	if (formObj.imagelistover)
		formObj.imagelistover.disabled = state;

	if (formObj.imagelistout)
		formObj.imagelistout.disabled = state;

	formObj.onmouseoversrc.disabled = state;
	formObj.onmouseoutsrc.disabled = state;
}

function setAttrib(elm, attrib, value) {
	var formObj = document.forms[0];
	var valueElm = formObj.elements[attrib];

	if (typeof(value) == "undefined" || value == null) {
		value = "";

		if (valueElm)
			value = valueElm.value;
	}

	if (value != "") {
		elm.setAttribute(attrib, value);

		if (attrib == "style")
			attrib = "style.cssText";

		if (attrib == "longdesc")
			attrib = "longDesc";

		if (attrib == "width") {
			attrib = "style.width";
			value = value + "px";
		}

		if (attrib == "height") {
			attrib = "style.height";
			value = value + "px";
		}

		if (attrib == "class")
			attrib = "className";

		eval('elm.' + attrib + "=value;");
	} else
		elm.removeAttribute(attrib);
}

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

function cancelAction() {
	tinyMCEPopup.close();
}
