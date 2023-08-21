//Called when application is started.


app.Script('parser-js.js')
app.Script( 'jquery-3.6.0.js' )

function OnStart()
{
   //import { parse } from '/js/parse-js.js'
   lay = app.CreateLayout("linear", "VCenter,FillXY")

   //Create an edit box. 
   edt = app.CreateTextEdit("", 0.96, 0.8)
   edt.SetBackColor("#333333")
   lay.AddChild(edt)

   //Create a horizontal layout for buttons. 
   layBut = app.CreateLayout("Linear", "Horizontal")
   lay.AddChild(layBut)

   //Create an Load button. 
   btnLoad = app.CreateButton("Load", 0.23, 0.1)
   btnLoad.SetOnTouch(btnLoad_OnTouch)
   layBut.AddChild(btnLoad)

   //Create an save button. 
   btnSave = app.CreateButton("Save", 0.23, 0.1)
   btnSave.SetOnTouch(btnSave_OnTouch)
   layBut.AddChild(btnSave)





   app.AddLayout(lay);

   layDrawer = app.CreateLayout("Linear", "FillXY,VCenter");
   layDrawer.SetBackColor('#000000')
   var data = "Folder:folder,Audio:audio,Photo:photo,Video:video";
   lst = app.CreateList(data, 0.8, 0.4);
   lst.SetOnTouch(lst_OnTouch);
   layDrawer.AddChild(lst);



   app.AddDrawer(layDrawer, "left", 0.8);
}

function lst_OnTouch(title, body, type, index)
{
   app.ShowPopup("Touched Item = " + title);
}

function txt1_OnTouch()
{
   //if(app.GetDrawerState("left") == "Closed")
   app.OpenDrawer("left");
   //else // "Open"
   //app.CloseDrawer( "left" );
}

function btnLoad_OnTouch()
{
   var txt = app.ReadFile("/sdcard/testfile.txt")
   edt.SetText(txt)
}

//Called when user touches save button. 
function btnSave_OnTouch()
{
   var txt = edt.GetText()
   addNavigator();
   
   app.OpenDrawer("left");
   app.WriteFile("/sdcard/testfile.txt", txt)
   
}





function addNavigator(){



 app.ShowPopup('Ok');
initialize();
}
/*import * as LibNamespace from '/js/esprima.js'
 app.ShowPopup(Object.keys(LibNamespace))*/
// ['Employment', 'HolidayPopupContainer', 'default', 'DayView', 'Status']


//import {esprima} from '/js/esprima.js'
// esprima = require("./esprima"),
var $toolBarButn = $('<a href="#" id="toolbar-navigator" title="navigator"></a>'),
  navigatorTemplate = $(navigatorTemplate),
  $toolBarButn = $('<a href="#" id="toolbar-navigator" title="navigator"></a>'),
  $navigatorPanel = $(navigatorTemplate),
  $content = $(".content"),
  $mainView = $(".main-view"),
  $navigatorMsg = $navigatorPanel.find("#navigator-msg"),
  $navigatorTree = $navigatorPanel.find("#navigator-tree"),
  isPanelOpen = false,
  language;


/**
 * show/hide msg and write text if defined
 */



var esprimaAnalysis = function(node, tree) {

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


/**
 * perform analysis of the file
 */

var performAnalysis = function() {
//TODO: add code
 app.ShowPopup("analysis started");
  var documen = 'const name = "Demk"; function fname(arg) {}'
  //navigatorMsgDisplay(false);

  var node = esprima.parse(documen, { comment: true }),
    treeRender = "<ul>";

  treeRender += esprimaAnalysis(node, treeRender);

  treeRender += "</ul>";

  //$navigatorTree.html(treeRender);
   app.ShowPopup(treeRender);

};


var activeEditorChangeHandler = function(event, focusedEditor, lostEditor) {
  performAnalysis();
};

var documentOnSave = function() {
  if (isPanelOpen) {
    performAnalysis();
  }
};

/**
 * init extension (only if stylesheet is loaded ... see at the bottom)
 */
 function initialize () {
  app.ShowPopup( 'Init' );
  app.ShowPopup( $toolBarButn )
  // add button in the toolbar
  $toolBarButn.appendTo($("#main-toolbar .buttons"));

  // add panel on the right
  $content.after($navigatorPanel);
  performAnalysis();
  
  // listen to click event on the button to show/hide navigator


}

/**
 * load stylesheet and then init extension
 */




//Called when application is started