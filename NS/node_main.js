
/*
You can add node modules to your project using the !addmodule command
in the debug tab of the WiFi editor (eg. !addmodule express)
*/

//Set html response.
var html = "Hello World!"

//Create a simple web server
var http = require('http')
http.createServer( function (req,res) {
  res.write( html )
  res.end()
  parent.SendMessage( "Got HTTP request" )
}).listen( 3000 )

//Handle messages from app.AddImage( )
parent.SetOnMessage( function( msg ) {
    console.log("msg:"+msg)
    html = msg
})

parent.SendMessage( "HTTP server running!" )