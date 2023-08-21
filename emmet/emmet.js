
//Configure app to use NodeJS as the main scripting engine
//giving you the full power of Node directly in your app!
cfg.Node

//Configure for Material UI and light theme.
cfg.MUI, cfg.Light

//Make sure the required node modules are installed to ide.
//(This downloads modules from https://www.npmjs.com).
ide.AddModule( "emmet" )

//Called when application is started.
function OnStart()
{
app.SetOnError( OnError )
    //Set MUI primary color.
    app.InitializeUIKit( MUI.colors.teal.teal, "Light" )

    //Use the NodeJS 'moment' module to format date.
    emmet  = require('emmet')
    //import expapnd from 'emmet'
    var text =expand('p>a')
// emmet.expand('p10', { type: 'stylesheet' })) //"Hey"
    //Create a MUI card layout.
    lay = MUI.CreateLayout("Linear", "VCenter,FillXY")

    var options = { title: "Node Demo", body: text,
        buttonText: "SEE MORE", width: 0.94 }
    var card = MUI.CreateCard(options)
    card.SetOnButtonTouch( card_OnBtnTouch )
    lay.AddChild(card)

    //Add main layout to app.
    app.AddLayout(lay)
}

//Handle 'see more' button.
function card_OnBtnTouch(btnText, cardName)
{
    app.OpenUrl( "https://www.npmjs.com" )
}


function OnError( msg, line, file )
{
    var text =
        'Message: "' + msg + '"\n' +
        'Line: ' + line + '\n' +
        'File: "' + app.Uri2Path(file) + '"';

    app.Alert( text, "Received error message:" );
}