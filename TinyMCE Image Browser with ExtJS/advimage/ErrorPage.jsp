<%@ page isErrorPage="true" import="org.apache.log4j.Logger ,consult.com.enumerations.LOGGERNAME" %>
<HTML>
<HEAD><TITLE>Error Page</TITLE>
<LINK href='StyleSheet.css' type='text/css' rel='stylesheet'>
</HEAD>
<BODY>
<%
Logger objLogger = Logger.getLogger(LOGGERNAME.FILTER);
final String CLASS_METHODNAME="ErrorPage.jsp: ";
objLogger.debug(CLASS_METHODNAME+ "starts");

String sourcePage="";
if(request.getParameter("sourcePage")!=null){
sourcePage=(String)request.getParameter("sourcePage");
}
%>
<H2>Exception Information</H2>
<TABLE width=100%>

<tr class='trStyle' width=100%>
<td><LABEL class="BannerLabel">Error Occured</LABEL></td>
</tr>

<tr class='lightColor'>
<td>Message:</td>
</tr>
<tr class='lightColor'>
<td><%= exception.getMessage() %></td>
</tr>
</TABLE>
<!--<TABLE><TR><TD>
<a href=# onclick="redirectToHome();"><u>Click here to go to ApplicationBrowser Page</u></a>
</TD>
</TR></TABLE>-->
<%
//Logger object: Added by Shivangee for logger changes on 22nd sept 2006
//Logger objLogger = Logger.getLogger("ErrorPage"); //added by Sudarshan for log changes
//objLogger.error("ErrorPage.jsp:  SourcePage is"+sourcePage+"Error  is" + exception.toString());//added by Sudarshan for log changes

objLogger.error(CLASS_METHODNAME + "ErrorPage.jsp:  SourcePage is"+sourcePage+"Error  is" + exception.toString());
objLogger.debug(CLASS_METHODNAME,exception);
%>
</BODY>
</HTML>