
//Configure app to use NodeJS as the main scripting engine
//giving you the full power of Node directly in your app!
cfg.Node

//Configure for Material UI and light theme.
cfg.MUI, cfg.Light

//Make sure the required node modules are installed to ide.
//(This downloads modules from https://www.npmjs.com).
ide.AddModule( "esprima" )

//Called when application is started.
function OnStart()
{
app.ShowPopup( 'Demon' )
	app.SetOnError( OnError )
    //Set MUI primary color.
    //app.InitializeUIKit( MUI.colors.teal.teal, "Light" )
   /* var parser = require('parse-js');
    text = parser.parse('function fun(){return "Dem"}');*/
    var esprima = require('esprima.min.js')
    performAnalysis();
    app.ShowPopup( "Dyno" )
    //Use the NodeJS 'moment' module to format date.
    /*moment = require('moment')
    var text = moment().format() + "\n"
     + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n"
     + moment().format("ddd, hA") + "\n"
     + moment().format("[Today is] dddd") + "\n"
     */
    //Create a MUI card layout.
    lay = app.CreateLayout("Linear", "VCenter,FillXY")

    /*var options = { title: "Node Demo", body: text,
        buttonText: "SEE MORE", width: 0.94 }
    var card = MUI.CreateCard(options)
    card.SetOnButtonTouch( card_OnBtnTouch )*/
    
    
    card = app.CreateButton( "Hey" )
    lay.AddChild(card)

    //Add main layout to app.
    app.AddLayout(lay)
}



function  esprimaAnalysis(node, tree) {

  if (node && node.type !== undefined) {

    switch (node.type) {
      case "Program":
        tree += "<li >program</li>";
        $.each(node.body, function(i, subNode) {
          tree = esprimaAnalysis(subNode, tree);
        });
        break;

      case "ExpressionStatement":
        //tree += "<li >ExpressionStatement</li>";
        tree = esprimaAnalysis(node.expression, tree);
        break;

      case "CallExpression":
        //tree += "<li >CallExpression</li>";
        $.each(node.arguments, function(i, subNode) {
          tree = esprimaAnalysis(subNode, tree);
        });

        tree = esprimaAnalysis(node.callee, tree);
        break;

      case "Identifier":
        //tree += "<li >Identifier " + node.name + " (stop)</li>";
        break;

      case "FunctionExpression":
        //tree += "<li >FunctionExpression</li>";
        tree += "<ul>";
        $.each(node.params, function(i, subNode) {
          tree = esprimaAnalysis(subNode, tree);
        });

        tree = esprimaAnalysis(node.body, tree);
        tree += "</ul>";
        break;

      case "BlockStatement":
        //tree += "<li >BlockStatement</li>";
        $.each(node.body, function(i, subNode) {
          tree = esprimaAnalysis(subNode, tree);
        });
        break;

      case 'VariableDeclaration':
        //tree += "<li >VariableDeclaration</li>";
        $.each(node.declarations, function(i, subNode) {
          tree = esprimaAnalysis(subNode, tree);
        });
        break;

      case "VariableDeclarator":
        // tree += "<li>VariableDeclarator</li>";
        // tree = esprimaAnalysis(node.id, tree);
        tree += "<li>var " + node.id.name + "; </li>";

        tree = esprimaAnalysis(node.init, tree);
        break;

      case "FunctionDeclaration":
        tree += "<li class='tree-function'>" + node.id.name + "</li>";
        $.each(node.params, function(i, subNode) {
          tree = esprimaAnalysis(subNode, tree);
        });
        tree += "<ul>";
        tree = esprimaAnalysis(node.body, tree);
        tree += "</ul>";
        break;

      default:
        //tree += "<li >unsupported type</li> " + node.type;
    }

  } else {
    //tree += "<li>problem, node : " + node + "</li>";
  }

  return tree;
};


 function performAnalysis() {
//TODO: add code
//console.log("analysis started");
app.ShowPopup( "analyze" )
  var documen = 'const name = "Demk"; function fname(arg) {}'
  //navigatorMsgDisplay(false);
app.ShowPopup( "log before" )
//var mydem = undefined
//app.ShowPopup( mydem.prop)
  var node = esprima.parse(documen, { comment: true })
  app.ShowPopup( "log after" )
    treeRender = "<ul>";

  treeRender += esprimaAnalysis(node, treeRender);

  treeRender += "</ul>";

  //$navigatorTree.html(treeRender);
  //alert(treeRender);
  app.ShowPopup(  treeRender);

};

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