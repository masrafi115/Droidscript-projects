
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello" )
//	txt.SetTextSize( 32 )
	lay.AddChild( txt )
	//txt.SetOnTouch( txt_OnTouch )
txt.SetOnTouch(ShowWindow_Popup)
	//Add layout to app.	
	app.AddLayout( lay )
}

function ShowWindow_Popup(){
app.ShowPopup( "Ok" )

//Create dialog window.
    var dlgPub = app.CreateDialog( "Symbols" )
    var layPub = app.CreateLayout( "linear", "vertical,fillxy" )
    layPub.SetPadding( 0.05, 0.05, 0.05, 0 )
    

//load html content into a webview
var webview = app.CreateWebView(0.6, 0.4,0.0,0.4)

//webview.LoadHtml("<html><body><h1>Hello World!</h1></body></html>")

//add the webview to popup window
//layPub.AddLayout(webview)
app.ShowPopup( "Is it" )
    
    //Create close button.
    var btnContact = app.CreateButton( "Close", 0.3, 0.1 )
    btnContact.SetMargins( 0,0,0,0.02 );
    btnContact.SetOnTouch( this.btnClose_OnTouch )
    layPub.AddChild( btnContact )
    
    //Add dialog layout and show dialog.
    dlgPub.AddLayout( layPub )
dlgPub.Show()


//show the popup window
//popup.ShowAt(-1, -1, 500, 500); //adjust the position and size as per your requirement
}

function btnClose_OnTouch(){

}

