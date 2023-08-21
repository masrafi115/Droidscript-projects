
//Called when application is started.
function OnStart()
{
app.LoadScript("./libs/require-2.3.6.min.js");

	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	txt = app.CreateButton( "Test AMD" )
	txt.SetTextSize( 20)
	txt.SetOnTouch(doStuff);
	
	lay.AddChild( txt )
	app.SetOnError( OnError );
	//Add layout to app.	
	app.AddLayout( lay );
	
	// Load the "math" module

}
function OnError( msg, line, file )
{
    var text =
        'Message: "' + msg + '"\n' +
        'Line: ' + line + '\n' +
        'File: "' + app.Uri2Path(file) + '"';

    app.Alert( text, "Received error message:" );
}
function loadModule(){
// Load the "math" module

var math = require('/modules/math.js');
// Use the functions from the "math" module
var sum = math.add(2, 3);
var product = math.multiply(4, 5);

// Display the results
app.ShowPopup('Sum: ' + sum + '\nProduct: ' + product);

}

function doStuff(){
// Load requirejs module

// Define a new module by invoking define method
define('myModule', function () {
  var myModule = {};
  
  myModule.greeting = 'Hello there';
  
  myModule.sayHello = function () {
    app.ShowPopup(myModule.greeting);
  };
  
  return myModule;
});

// Load the defined module using require method
require(['myModule'], function (myModule) {
  myModule.sayHello(); // Outputs "Hello there"
});


}