/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
//	var pageInfo = {"URL" : window.document.href};
//	chrome.runtime.sendMessage(pageInfo);
	if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing 
           the web-pages DOM content as argument 
		var body1 = document.body.innerHtml;
		var head1 = document.head.innerHtml;
		var AllCSS = "";
		var stylesheet = document.styleSheets;
		if(stylesheet.length)
		{
			for(i=0;i<stylesheet.length;i++)
			{
			   cssrules = stylesheet[i].cssRules;
			   if(cssrules.length)
			   {
					for(j=0;j<cssrules.length;j++)
				   {
						AllCSS += cssrules[j].cssText;
				   }
				}
				else AllCSS += cssrules.cssText;
			}
		}
		else 
		{
			cssrules = stylesheet.cssRules;
			if(cssrules.length)
			{
			   for(j=0;j<cssrules.length;j++)
			   {
					AllCSS += cssrules[j].cssText;
			   }
			}
			else AllCSS += cssrules.cssText;
		}
		head1 = head1 + AllCSS;
		
		var JSONobj = { body : body1, head: head1 };*/
		
		sendResponse(document.all[0].outerHtml);		
    }
	
});