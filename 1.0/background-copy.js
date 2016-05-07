var url;

// Called when the user clicks on the browser action.
var specialElementHandlers = { "IMG" : function (element,renderer) {
		return true;
	},
	"IFRAME" : function (element,renderer) {
		return true;
	}
};
	
function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

function doStuffWithDOM(domContent) {

	$(document).ready(function (){
		var doc = new jsPDF('p', 'in', 'letter');

		domContent = replaceAll(String(domContent),'="//','="' + url.toString());
		domContent = replaceAll(String(domContent),'="/','="'+ url.toString());
		domContent = replaceAll(String(domContent),'=/','='+ url.toString());
		domContent = replaceAll(String(domContent),'=//','='+ url.toString());
		console.log("I received the following DOM content:\n" + domContent);
		
/*		doc.fromHTML(domContent, 0.5, 0.5, {
		'width': 7.5,
		'elementHandlers': specialElementHandlers
		}, function(dispose) {
			
/*			setTimeout(function(){
				if (navigator.msSaveBlob) {
					doc.output('dataurlnewwindow');
				} else {
					doc.output('datauri');
				}
			},5000);
			setTimeout(function(){
				doc.save('Test.pdf');
			},20000);
	//		var x = window.open();
	//		x.document.open();
	//		x.document.location=string;
	
		});*/
		doc.fromHTML(domContent, 0.5, 0.5, {
					'width': 7.5,
					'elementHandlers': specialElementHandlers
					}, {});
			//	doc.output('dataurlnewwindow');
				doc.save('Test.pdf');
		
		
	});	
	//doc.output('datauri'); */
};

/* When the browser-action button is clicked... */



chrome.browserAction.onClicked.addListener(function(tab) {

		chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
		   	url = tabs[0].url;
		   
		});
     
        /* send a message specifying a callback too */
        chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                doStuffWithDOM);
});