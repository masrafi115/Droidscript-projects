
//Configure app to use NodeJS as the main scripting engine
//giving you the full power of Node directly in your app!
cfg.Node

//Configure for Material UI and light theme.
cfg.MUI, cfg.Light

//Make sure the required node modules are installed to ide.
//(This downloads modules from https://www.npmjs.com).
ide.AddModule( "lodash" )

//Called when application is started.
function OnStart()
{
    //Set MUI primary color.
    app.InitializeUIKit( MUI.colors.teal.teal, "Light" )

    //Use the NodeJS 'moment' module to format date.
    _ = require('lodash')
    // Load the fp build.
var fp = require('lodash/fp')

// Load a method category.
var object = require('lodash/fp/object')

// Load a single method for smaller builds with browserify/rollup/webpack.
var extend = require('lodash/fp/extend')

    var text = _.map(['6', '8', '10'], parseInt)

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