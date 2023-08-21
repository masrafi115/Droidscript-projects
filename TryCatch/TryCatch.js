cfg.node
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello" )
	txt.SetTextSize( 32 )
	lay.AddChild( txt )
	app.SetOnError( OnError )
	//CreateError()
  //app.ShowPopup(myvar)
  
  var myvar = undefined
  app.ShowPopup(myvar.prop)

		//Add layout to app.
		 
	app.AddLayout( lay )
	
}

function CreateError(){
var myvar = undefined
try {
  app.ShowPopup(myvar.prop)
} catch (error) {
  app.ShowPopup("An error occurred: " + error.message);
}
}
function OnError( msg, line, file )
{
    var text =
        'Message: "' + msg + '"\n' +
        'Line: ' + line + '\n' +
        'File: "' + app.Uri2Path(file) + '"';

    app.Alert( text, "Received error message:" );
}