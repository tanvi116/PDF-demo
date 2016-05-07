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
		var pdf = new jsPDF('p', 'pt', 'letter');

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
		var dc = "<!DOCTYPE html> <html> <body> <h1>My First Heading</h1> <p>My first paragraph.</p> </body> </html> ";
		margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
                    domContent, // HTML string or DOM elem ref.
                    margins.left, // x coord
                    margins.top, {// y coord
                        'width': margins.width, // max width of content on PDF
                        'elementHandlers': specialElementHandlers
                    },
            function(dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }
            , margins);		
		
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