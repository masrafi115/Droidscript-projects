
//Called when application is started.
function OnStart()
{
    //Create main layout.
    lay = app.CreateLayout( "Linear", "VCenter,FillXY" )
    lay.SetChildMargins( 0, 0.1, 0, 0 )

    //Show the server address in a text control.
    var s = "Type the following address into your" +
            " browser\n\n" + app.GetIPAddress() +":3000";
    txt = app.AddText( lay, s, 0.8, -1, "MultiLine" )


    //Add an 'Update' button.
    btn = app.AddButton( lay, "Turn On", 0.3 )
	btn.SetOnTouch( btn_OnTouch )

	//Add main layout to app.
	app.AddLayout( lay )

    //Create Node instance.
    node = app.CreateNode()
    node.SetOnReady( node_OnReady )
    node.SetOnMessage( node_OnMessage )
}

//Handle the 'Update' button press.
function btn_OnTouch()
{
    //Send a message to the node script telling
    //it to update the html response.
    //node.SendMessage( edt.GetText() )
  /*  if(turnedOn){
    app.
    } else {
    node = app.CreateNode(  )
    
    }*/
    //app.ShowPopup( "Refresh your browser" )
}

//Called when Node is ready.
function node_OnReady()
{
    //Run our node script.
    node.Run( "node_main.js" )
}

//Handle messages from our node script.
function node_OnMessage( msg )
{
    console.log( msg )
}