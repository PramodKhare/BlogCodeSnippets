<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Image Manager</title> <!-- {$lang_insert_image_title} -->
	<script language="javascript" type="text/javascript" src="../../tiny_mce_popup.js"></script>
	<script language="javascript" type="text/javascript" src="../../utils/mctabs.js"></script>
	<script language="javascript" type="text/javascript" src="../../utils/form_utils.js"></script>
	<!-- <script language="javascript" type="text/javascript" src="js/image.js"></script> -->
	<script language="javascript" type="text/javascript" src="js/functions.js"></script>	
	<link href="css/advimage.css" rel="stylesheet" type="text/css" />
	<LINK href="../../../StyleSheet.css" type="text/css" rel="stylesheet">
	<base target="_self" />
	
<%@ page 
language="java"
contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"
errorPage="ErrorPage.jsp"
import = "org.apache.log4j.Logger,consult.com.enumerations.LOGGERNAME"
import ="consult.com.enumerations.EXPORTPATH"
import ="javax.servlet.http.HttpSession"
import ="consult.fileUpload.ImageListHelper"
import ="org.json.JSONArray,org.json.JSONException"
import ="java.util.ArrayList"
import ="java.io.File"
import ="java.io.FileInputStream"
import ="javax.servlet.http.HttpServlet"
import ="javax.servlet.http.HttpServletRequest"
import ="javax.servlet.http.HttpServletResponse"
import ="consult.fileUpload.FileUploadBean"
import ="java.util.Hashtable"
import ="consult.com.exceptions.ConsultException"
import="java.util.*" 
import="com.oreilly.servlet.MultipartRequest"
import="consult.ejbs.authoring.cases.AvalueEntityHome"
import="javax.servlet.http.HttpServletRequest"
import="javax.ejb.EJBException"
import="javax.naming.InitialContext"
import="consult.ejbs.utility.others.JNDINames"
import="javax.naming.NamingException"
import="javax.rmi.PortableRemoteObject"
import="consult.service.to.UserTO"
%>


<script>
function fnOnload()
{	
	window.focus();
}
function fnOnUpload(){
	var filePath=document.getElementById('file').value;	
	var fileName=filePath.substring(filePath.lastIndexOf("\\")+1,filePath.length);	
	var fileExtn=fileName.substring(fileName.indexOf(".")+1,fileName.length);
	var fileLength=document.getElementById("fLength").value;
	var sameFilenameExist=false;	
	for(i=0;i<fileLength;i++){  	 
  			var imgName = 	document.getElementById(i).value;   			
    		if( fileName == imgName){
    			sameFilenameExist=true;
    		break;
    		}    		  	
  	}	
	if(fileName=="")
		alert("select a file");
	else if(sameFilenameExist == true)
		alert("File name exist,choose different file name");  
	else if(fileExtn!="jpg" && fileExtn!="JPG" && fileExtn!="bmp" && fileExtn!="BMP" && fileExtn!="gif" && fileExtn!="GIF" && fileExtn!="png" && fileExtn!="PNG" && fileExtn!="jpeg" && fileExtn!="JPEG")
		alert("Allowed File Formats: jpg, gif,jpeg and bmp");
	else if((fileName.indexOf("%20")>=0) || (fileName.indexOf("#")>=0) || (fileName.indexOf("^")>=0) || (fileName.indexOf("\'")>=0) || (fileName.indexOf("&")>=0))
		alert("Remove the following spcl charecters from the image name:- %20, ^, &,  ', #");
	else{
		document.getElementById('val').value="upload";
		document.getElementById("frmImgWin").submit();
	}
	document.getElementById('insrt').disabled=false;
	document.getElementById('delete').disabled=false;
	document.getElementById('upload').disabled=true;
}
function disableButtons(){
	document.getElementById('upload').disabled=false;
	document.getElementById('insrt').disabled=true;
	document.getElementById('delete').disabled=true;
}

function fnOnDelete(){
	var errMssg="Are you sure?";	


	var fileLength=document.getElementById("fLength").value;   
	var fileNames="";
	for(i=0;i<fileLength;i++)
  	{  	
  		if( document.getElementById(i).checked==true){
   			var imgName = 	document.getElementById(i).value;   			
    		fileNames 	+=	imgName+"|";
    		
    	}
  	}
  	if(fileNames.length<=0)
  		alert("select a file");
  	else if(confirm(errMssg)){  		
		document.getElementById('val').value="delete";
  		document.getElementById("images").value=fileNames;
 		//document.getElementById("images").value="0.jpg|18.jpg"; .....like this it will be saved
 		document.getElementById("frmImgWin").submit();
 	}

}  	

function onClick(chckboxid,clickedObject)
{	if (navigator.appName == "Netscape") {
		if(document.getElementById(chckboxid+'img').style.borderColor == 'BlueViolet')
			document.getElementById(chckboxid+'img').style.borderColor= 'white';
		else
			document.getElementById(chckboxid+'img').style.borderColor= 'BlueViolet';	
	}else{
		if(document.getElementById(chckboxid+'img').style.borderColor == '#8A2BE2')
			document.getElementById(chckboxid+'img').style.borderColor= 'white';
		else
			document.getElementById(chckboxid+'img').style.borderColor= '#8A2BE2';	
	}
	//document.getElementById(chckboxid+'img').style.borderColor= 'cccccc';		
	if(clickedObject!='chckbox'){//for type=checkbox, check & uncheck happens automatically
		if(document.getElementById(chckboxid).checked==true)
			document.getElementById(chckboxid).checked=false;
		else
			document.getElementById(chckboxid).checked=true;
	}
	document.getElementById('insrt').disabled=false;
	document.getElementById('delete').disabled=false;
	document.getElementById('upload').disabled=true;
}
</script>

</head>
<body id="advimage" onload="fnOnload();" style="display: none">
    <form id="frmImgWin" ENCTYPE='multipart/form-data' method='post' action='image.jsp?val=upload'> <!-- Parameter is passed to indicate that upload or delete opreation should be performed  -->		
		<input type='hidden' id='val' name='val' value='value'>
		<input type='hidden' id='lCaseId'  name='lCaseId' value=''>
		<input type='hidden' id='images' name='images' value='value'>		
		<input type='text' id='textmsg' name='textmsg' STYLE="width=600px;border:solid 4px white;font:9pt monospace;color:#800000;text-align:center;background-color:whitesmoke" value='Upload / Insert Image(s)'>		
		<table BGCOLOR='whitesmoke' style='padding:2px;border:solid 4px whitesomke;' align='center'>
	<% 			
			int MAX_UPLOAD_SIZE=10000000;	//in Bytes i.e. it equals to 10 MB
			boolean dltMsg=false;
			UserTO objUserTO = (UserTO)request.getSession().getAttribute("USER_TO");		
			long lOrgId = ((Long) session.getAttribute("ORGID")).longValue();
			out.println("<input type='hidden' name='hdnORGID' id='ORGID' value='"+lOrgId+ "'>");			
			String strAppId= null; //String.valueOf(objUserTO.getLAppId());//(String)session.getAttribute("appId");		
			long lAppId; //=objUserTO.getLAppId();
			//strAppId = Long.toString(lAppId);
			//Need to check from where will we get String CaseId in case of TinyMCE opened through Case-Editor
					
			strAppId = request.getParameter("hdnlAppId");
            if(strAppId != null && strAppId.trim() != "" && strAppId.trim() != "null" && strAppId.trim() != "undefined"){
                System.out.println("LCurrentAppId = "+strAppId);
                session.setAttribute("LCurrentAppId",strAppId);
            }else{
                strAppId = ((String)session.getAttribute("LCurrentAppId"));
                System.out.println("From Session LCurrentAppId = "+strAppId);
                if(strAppId == null || strAppId.trim() == "" || strAppId.trim() == "null" || strAppId.trim() == "undefined"){
                    session.setAttribute("LCurrentAppId","");
                    System.out.println("Unable to get lAppId of Current Selected Application");
                    strAppId = "0";
                    throw new ConsultException("INVALID-APP-ID");
                }
            }
           
           	lAppId = Long.parseLong(strAppId);
           	String strCaseId="0";		//(String)session.getAttribute("caseId");	
			long lCaseId=Long.parseLong(strCaseId);
			System.out.println("AppID = "+lAppId+"\n strAppID = "+strAppId);
			out.println("<input type='hidden' name='appId' id='appId' value='"+lAppId+ "'>");
			String strOrgId = String.valueOf(lOrgId);
            /*
            //Need to check from where will we get String CaseId in case of TinyMCE opened through Case-Editor
            String strCaseId="0";        //(String)session.getAttribute("caseId");   
            long lCaseId=Long.parseLong(strCaseId);
            System.out.println("AppID = "+lAppId+"\n strAppID = "+strAppId);
            out.println("<input type='hidden' name='appId' id='appId' value='"+strAppId+ "'>");
            String strOrgId = String.valueOf(lOrgId);
			*//*
			String strAppId = request.getParameter("hdnlAppId");
			if(strAppId != null || strAppId.trim() != "" || strAppId.trim() != "null" || strAppId.trim() != "undefined"){
				System.out.println("LCurrentAppId = "+strAppId);
				session.setAttribute("LCurrentAppId",strAppId);
			}else{
				strAppId = ((String)session.getAttribute("LCurrentAppId"));
				if(strAppId != null || strAppId.trim() != "" || strAppId.trim() != "null" || strAppId.trim() != "undefined"){
					session.setAttribute("LCurrentAppId","");
				}else{
					System.out.println("Unable to get lAppId of Current Selected Application");
					throw new ConsultException("INVALID-APP-ID");
				}
			}
			long lAppId = 0;
			//Need to check from where will we get String CaseId in case of TinyMCE opened through Case-Editor
			String strCaseId="0";		//(String)session.getAttribute("caseId");	
			long lCaseId=Long.parseLong(strCaseId);
			System.out.println("AppID = "+lAppId+"\n strAppID = "+strAppId);
			out.println("<input type='hidden' name='appId' id='appId' value='"+strAppId+ "'>");
			String strOrgId = String.valueOf(lOrgId);
			*/
			
			
			//In future need to be replaced with FILETYPE.FILE_SEPARATOR.
			String FILE_SEPARATOR = "\\";//for LINUX use String FILE_SEPARATOR = "//";
			String strPath = consult.com.enumerations.EXPORTPATH.ATTACHMENT_LOCATION + FILE_SEPARATOR + lOrgId + FILE_SEPARATOR + lAppId + FILE_SEPARATOR + "_X~Q@Q~X_"; 
			out.println("<input type='hidden' name='strPath' id='strPath' value='"+strPath+ "'>");			
			final String CLASS_METHODNAME = "Image.JSP";
			Logger objLogger = Logger.getLogger(LOGGERNAME.FILEUPLOAD);			
			String valup=" ";	//request.getParameter("val");				  	
			
			System.out.println("strPath = "+strPath);
			
			//***This part gets executed only when any action {upload,delete} has to be perform***//
			if(valup!=null && valup.length()>0){						
				System.out.print("************UPLOAD STARTS HERE*****************");				
			if (!(new File(EXPORTPATH.ATTACHMENT_LOCATION).exists())) {
				createConsultFolderForAttachments();
			}
			//create organization folder if it does not exists
			if (!(new File(EXPORTPATH.ATTACHMENT_LOCATION + "//" + lOrgId).exists())){
				createOrgIdFolder(strOrgId);
			}
			//create application folder if it does not exists
			if (!(new File(EXPORTPATH.ATTACHMENT_LOCATION + FILE_SEPARATOR + lOrgId + FILE_SEPARATOR + lAppId).exists())) {
				createAppIdFolder(strOrgId,strAppId);
			}
			//create Image folder --<_X~Q@Q~X_>--- if it does not exists
			if (!(new File(strPath).exists())) {
				createImageFolder(lOrgId,lAppId);
			}
			try{
				MultipartRequest multi=new MultipartRequest(request,strPath,MAX_UPLOAD_SIZE);//files automatically gets uploaded to the destination folder(strPath)							
				String btntype=multi.getParameter("val");				
				String imgLst=multi.getParameter("images");	//stores the list of files to be deleted
				String [] arrimgLst=imgLst.split("\\|");	//supports from jdk1.4 and onwards			

				System.out.println("imgLst = "+imgLst);

				System.out.println("arrimgLst = "+arrimgLst[0]);
				
				if(btntype.equals("delete")){					
					boolean flag=false;									
					AvalueEntityHome objAvalueEntityHome =null;
					objAvalueEntityHome = lookupAvalueEntityHome();				
					String strArr[]=objAvalueEntityHome.getDataFromImageTable(lAppId,lCaseId,lOrgId);	
					int imgLstLen=arrimgLst.length;
					int strArrLen=strArr.length;
					for(int i=0;i<imgLstLen;i++)
					{
						String image=(String)arrimgLst[i];
						String imageCmp=image.substring(0,image.indexOf("."))+image.substring(image.indexOf(".")+1,image.length());
						flag=false;
					 for(int j=0;j<strArrLen;j++)
					 {
					  	if(strArr[j].indexOf(imageCmp)>=0){
					  	flag=true;
					  	dltMsg=true;//to indicate that some files cannot be deleted,attached to a case(s)
					  	break;
					  }
					 }
					 if(!flag){//delete the file
						boolean blnDeleteFile = new File(strPath+"\\"+image).delete();
					 	if (!blnDeleteFile) {
							objLogger.error(CLASS_METHODNAME.concat(" Unable to delete the file"));
						}
					 }
					}
					
				}
				if(btntype.equals("upload")){%>
					<script>document.getElementById('textmsg').value="Uploaded successfully";</script>
				<%}else if(!dltMsg && btntype.equals("delete")){%>
					<script>document.getElementById('textmsg').value="File(s) deleted successfully";</script>
				<%}else if(dltMsg && btntype.equals("delete")){%>
					<script>document.getElementById('textmsg').value="File(s) attached to case(s)/attribute(s) are not deleted";</script>
					
				<%dltMsg=false;
				}
			}
			catch(Exception e){
							System.out.println("File too large. Max File Size Limit is 10 MB");
							//out.println("alert(\"File too large. Max File Size Limit is 10 MB\")");
							objLogger.error(".....Upload File Size crossed the define limit...MultiPartRequest Problem"+e);
						  	objLogger.debug(CLASS_METHODNAME+e);
				}		
			}			
			//This part loads the preloaded images in the Insert/Edit image editor
						
			ImageListHelper ImgLstHlp= new ImageListHelper();
			JSONArray fileList= new JSONArray();
			fileList=ImgLstHlp.getFileListForApplication(strPath);

			System.out.println("fileList = "+fileList);
			
			int fLength=fileList.length();
			int imgListLength=0;			
			try{			
			out.println("<tr><td colspan='190' align='centre'><div style='overflow:auto; background:whitesmoke; height:350px; width:570px;scrollbar-face-color: cccccc;scrollbar-3dlight-color: #cacaca;'>");			
			out.println("<table align='center' border='0'	cellpadding='4' cellspacing='2' width='99%' ><tr>");
			for(int i=0;i<fLength;i++){							
				String fileName=fileList.getString(i);				
				//String displayName="";
				//int fileLength=fileName.length();				
				//if (fileLength > 12)
				//displayName=fileName.substring(0,10)+fileName.substring(fileLength-4,fileLength);
				//else */
				//displayName=fileName;
				//System.out.print("Display Name:-" + displayName);
				String tempStrPath = consult.com.enumerations.EXPORTPATH.ATTACHMENT_LOCATION + "/" + strOrgId + "/" + strAppId + "/" + "_X~Q@Q~X_";
				String Extn	=  	fileName.substring(fileName.indexOf(".")+1,fileName.length());	
				String imgPath=tempStrPath+"/" + fileName.substring(0,fileName.indexOf(".")) + Extn + ".img";
				
				System.out.println("imgPath "+i+" = "+imgPath);

				System.out.println("fileName "+i+" = "+fileName);
				
				if((fileName.indexOf(".jpg")>0) || (fileName.indexOf(".JPG")>0)	|| (fileName.indexOf(".gif")>0)	|| (fileName.indexOf(".GIF")>0) || (fileName.indexOf(".png")>0) || (fileName.indexOf(".PNG")>0) || (fileName.indexOf(".bmp")>0) || (fileName.indexOf(".BMP")>0)){						
					if(imgListLength%5==0)						
					out.println("</tr><tr>");
					
					System.out.println("imgListLength "+i+" = "+imgListLength);
					
					out.println("<td><img src='"+imgPath+"' height='100' width='100' style='border:solid 4px white' id='"+imgListLength+"img' onclick=onClick("+imgListLength+",'img')><br><input type='checkbox' style='width:12' class='checkbox' name='chk"+imgListLength+"' id='"+imgListLength+"' value='"+fileName+"' onclick=onClick("+imgListLength+",'chckbox')><label style='text-transform: uppercase;' for='"+imgListLength+"'>"+fileName+"</td>");
					imgListLength++;
				}					
				}				
			out.println("</tr>");
			out.println("<input type='hidden' name='fLength' id='fLength' value='"+imgListLength+ "'>");			
   			out.println("</table>");
   			out.println("</div></td></tr>");
   			}
   			catch(JSONException jc){
								objLogger.error("JSONException"+ jc);
								objLogger.debug(CLASS_METHODNAME+jc);
			}   	 	
   	 
   	 	%>
	
   	 	       
	
	<tr><td style='padding:1px;border:solid 3px white;background:whitesmoke;' align='center'>
				<input type='file' name='file' id='file' STYLE="width=250;height=18;font-family: Arial;font-size: 11px;" onclick="disableButtons();">
				<input type="button"  style='background=url(images/button-template.gif);width=70;height=18;font-family: Arial;font-size: 11px;font-weight: bold;'disabled id="upload" name="insert" value="Upload" onclick="fnOnUpload();" /></td></tr>
	<tr><td style='padding:1px;border:solid 3px white;background:whitesmoke;'>
	
		<div class="mceActionPanel" align='center'>			
				
				<input type="button" class="button" id="insrt" name="insert" value="Insert" onclick="insertAction()" />
				
				<input type="button" class="button" id="delete" name="insert" value="Delete" onclick="fnOnDelete();" />			
				
				<input type="button" class="button" id="cancl" name="insert" value="Cancel" onclick="cancelAction();" />
				
		</div>		
			
		</td></tr>
		<tr><td align='center'><INPUT TYPE="text" STYLE="border: none;font:8pt monospace;color:#4682B4;text-align:center;width=600px"  id='mssg' name='mssg' value='Allowed File Formats: jpg, gif, jpeg, bmp'></td></tr>
		</table>	
    </form>
    
    
    
  
<%!	 	//ramyak..........the functions should be declared at class level so that they can be accessed from anywhere in the page
		Logger objLogger = Logger.getLogger(LOGGERNAME.FILEUPLOAD);
		String FILE_SEPARATOR = "\\";
		public void createConsultFolderForAttachments() 
			{
				final String CLASS_METHODNAME = "Image.JSP";
				
				objLogger.debug(CLASS_METHODNAME + " starts");
				boolean blnAttachmentFolderCreated = false;
				String path = EXPORTPATH.ATTACHMENT_LOCATION;
				blnAttachmentFolderCreated = new File(path).mkdir();

				if (blnAttachmentFolderCreated) {
					objLogger.debug(CLASS_METHODNAME + " Consult Attachment Folder created");
				} else {
					objLogger.debug(CLASS_METHODNAME + " error in creation of Consult Attachment Folder");
				}

			}
			
		public void createOrgIdFolder(String strOrgId) {
				final String CLASS_METHODNAME = "Image.JSP";
				objLogger.debug(CLASS_METHODNAME + "starts");
				boolean blnOrgIdFolderCreated = false;
				//createConsultFolderForAttachments();				

				String path = EXPORTPATH.ATTACHMENT_LOCATION + FILE_SEPARATOR + strOrgId;
				blnOrgIdFolderCreated = new File(path).mkdir();

				if (blnOrgIdFolderCreated) {
				objLogger.debug(CLASS_METHODNAME + "Org Id Folder created");
				} else {
				objLogger.debug(CLASS_METHODNAME + "error in creation of OrgId Folder");
				}
			}
			
		public void createAppIdFolder(String strOrgId,String strAppId) {
			final String CLASS_METHODNAME = "Image.JSP";
			objLogger.debug(CLASS_METHODNAME + " starts");

			boolean blnOrgIdFolderCreated = false;
			//createConsultFolderForAttachments();

			String path = EXPORTPATH.ATTACHMENT_LOCATION + FILE_SEPARATOR + strOrgId + FILE_SEPARATOR + strAppId;
			blnOrgIdFolderCreated = new File(path).mkdir();

			if (blnOrgIdFolderCreated) {
				objLogger.debug(CLASS_METHODNAME + " Appid Id Folder created");
			} else {
				objLogger.debug(CLASS_METHODNAME + " error in creation of Appid Folder");			}
		}
		
		public void createImageFolder(long strOrgId,long strAppId) {
			final String CLASS_METHODNAME = "Image.JSP";
			objLogger.debug(CLASS_METHODNAME + " starts");

			boolean blnOrgIdFolderCreated = false;
			//createConsultFolderForAttachments();

			String path = EXPORTPATH.ATTACHMENT_LOCATION + FILE_SEPARATOR + strOrgId + FILE_SEPARATOR + strAppId + FILE_SEPARATOR + "_X~Q@Q~X_";
			blnOrgIdFolderCreated = new File(path).mkdir();

			if (blnOrgIdFolderCreated) {
				objLogger.debug(CLASS_METHODNAME + " Image Folder --<_X~Q@Q~X_>--- created");
			} else {
				objLogger.debug(CLASS_METHODNAME + " error in creation of Image Folder --<_X~Q@Q~X_>--- ");			}
		}
		
		public AvalueEntityHome lookupAvalueEntityHome() {

			final String CLASS_METHODNAME = "Image.JSP:lookupAvalueEntityHome ";
			objLogger.debug(CLASS_METHODNAME + " starts");

			InitialContext initCtx = null;
			AvalueEntityHome home = null;
			try {
				initCtx = new InitialContext();
				home = (AvalueEntityHome) PortableRemoteObject.narrow(initCtx.lookup(JNDINames.CONSULT_AVALUE), AvalueEntityHome.class);
			} catch (NamingException ex) {
				objLogger.error(CLASS_METHODNAME + ex.toString());
				objLogger.debug(CLASS_METHODNAME, ex);
			} finally {
				try {
					if (initCtx != null) {
						initCtx.close();
					}
				} catch (NamingException ex) {
					objLogger.error(CLASS_METHODNAME + ex.toString());
					objLogger.debug(CLASS_METHODNAME, ex);
					throw new EJBException(ex);
				}
			}
			return home;
		}		
		
	%>
	
	  	
</body> 
</html> 

