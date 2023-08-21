
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertical and horizontal. just like 
	// Sketchware
	lay = app.CreateLayout( "Linear", "V,H" )

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello",1,0.07 )
	txt.SetTextSize( 32 )
		// Set Layout Position
		txt.SetBackColor( "#cc22cc" )
txt.SetPosition( 0.9,0.9,0.6,0.2)


//var layout = app.CreateLinearLayout("Vertical");

// Set the layout height and width to wrap content


// Add the layout to the view

	lay.AddChild( txt )
	//Add layout to app.	
	app.AddLayout( lay )
}