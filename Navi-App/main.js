/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

//add a panel on the right and show in code structure of the current file opened
import { parse } from '/js/parse-js.js'
//parseJS = require("./parse-js"),
function Start(){
app.ShowPopup("Hello");

app.ShowPopup('Ok');
initialize();
/*import * as LibNamespace from '/js/esprima.js'
app.ShowPopup(Object.keys(LibNamespace))*/
// ['Employment', 'HolidayPopupContainer', 'default', 'DayView', 'Status']

}
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
var initialize = function() {
  
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