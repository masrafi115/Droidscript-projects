
//Called when application is started.
function OnStart()
{    
    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" )
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "V,FillXY" )
	layMain.SetBackground( "/Res/drawable/android" )
	CreateActionBar()
	//Create a text label and add it to main layout.
	//txt = app.CreateText( "<-- swipe from left" )
//	txt.SetTextSize( 24, "dip" )
//	layMain.AddChild( txt )
	
	//Create a drawer containing a menu list.

	CreateDrawer()
	CreateCodeView()
	//Add main layout and drawer to app.	
	app.AddLayout( layMain )
	app.AddDrawer( drawerScroll, "Left", drawerWidth )
}

//Create the drawer contents.
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.75;
    drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" )
    drawerScroll.SetBackColor( "White" )
	layDrawer = app.CreateLayout( "Linear", "Left" )
	drawerScroll.AddChild( layDrawer )
	
webTree = app.CreateWebView( 1,1)
webTree.LoadUrl( "tree.html" )
layDrawer.AddChild( webTree )
}

//Handle menu item selection.
function lstMenu_OnTouch( title, body, type, index )
{
    //Close the drawer.
    app.CloseDrawer( "Left" )
    
    //Highlight the chosen menu item in the appropriate list.
    if( this==lstMenu1 ) lstMenu2.SelectItemByIndex(-1)
    else lstMenu1.SelectItemByIndex(-1)
    this.SelectItemByIndex( index, true )
    
    app.ShowPopup( title )
}

//Called when a drawer is opened or closed.
function OnDrawer( side, state )
{
    console.log( side + " : " + state )
}

//Called when hardware menu key pressed.
function OnMenu( name )
{  
   app.OpenDrawer()
}

function CreateActionBar()
{
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layHoriz.SetBackColor( "#4285F4" );
    layMain.AddChild( layHoriz );
    
    //Create menu (hamburger) icon .
    txtMenu = app.CreateText( "[fa-bars]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,10,12,10, "dip" );
    txtMenu.SetTextSize( 28 );
    txtMenu.SetTextColor( "#eeeeee" );
    txtMenu.SetOnTouchUp( function(){app.OpenDrawer()} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( "Home", -1,-1, "Left" );
    txtBarTitle.SetMargins(0,10,0,0,"dip");
    txtBarTitle.SetTextSize( 22 );
    txtBarTitle.SetTextColor( "#ffffff" );
    layBarTitle.AddChild( txtBarTitle );
    
    /*    
    //Create search icon.
    txtSearch = app.CreateText( "[fa-search]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 12,2,12,10, "dip" );
    txtSearch.SetTextSize( 24 );
    txtSearch.SetTextColor( "#eeeeee" );
    txtSearch.SetOnTouchUp( function(){app.ShowPopup("Todo!")} );
    layHoriz.AddChild( txtSearch );
    */
}
function CreateCodeView(){

web = app.CreateWebView( 1, 1, "IgnoreErrors" );
  web.LoadUrl( "index.html" );
  layMain.AddChild( web );

}
