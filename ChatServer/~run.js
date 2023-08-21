
try 
{   
    //Load modules
    vm = require('vm') 
    fs = require('fs')
    net = require('net')
    
    //Handle exceptions from events.
    process.on('uncaughtException', (err,origin)=>{
        console.log( "Script Error: " + err.stack )
    });

    //Create context for user scripts.
    parent = { msgServ: null }
    context = vm.createContext({
        parent,console,require,process,setTimeout,setInterval
    });

    //Create command server.
    const server = net.createServer(function(stream) {
      stream.on('data', function(c) {
        //console.log('data:', c.toString());
        var cmds = c.toString().split("|")
        if( cmds[0]=="run" ) run( cmds[1] )
        else if( cmds[0]=="js" ) runJs( unescape(cmds[1]) )
        else if( cmds[0]=="add" ) addModule( cmds[1], cmds[2] )
      });
      stream.on('end', function() {
        console.log('cmd client disconnected');
      });
    });

    //Start command server.
    const args = process.argv.slice(2)
    const pipe = args[0]
    console.log( "cmd pipe = " + pipe )
    if( fs.existsSync( pipe ) ) fs.unlinkSync( pipe )
    server.listen( pipe );

    //Create message server.
    msg_cb = null
    parent.msgServ = net.createServer(function(stream) {
        parent.msgStream = stream
        stream.on('data', function(c) {
            if( msg_cb ) msg_cb( c.toString() )
        });
        stream.on('end', function() {
            console.log('msg client disconnected');
        });
    });

    //Start message server.
    var msgPipe = process.env.MSG_PIPE
    console.log( "msg pipe = " + msgPipe )
    if( fs.existsSync( msgPipe ) ) fs.unlinkSync( msgPipe )
    parent.msgServ.listen( msgPipe );

    //Allow sending of messages from user scripts via 'parent' global.
    parent.SendMessage = function( msg ) { parent.msgStream.write(msg)  }
    parent.SetOnMessage = function( cb ) { msg_cb = cb }

    //Tell plugin we are ready.
    setTimeout( function(){console.log( "_READY_" )}, 1 )
}
catch(e) { console.log( "Script Error: " + e ) }

//Run a script file.
function run( file )
{
    process.chdir( file.substr(0, file.lastIndexOf("/")) )
    script = new vm.Script( fs.readFileSync(file), file )
    script.runInContext( context )
    setTimeout( function(){console.log( "_DONE_" )}, 1 )
}

//Run some javascript.
function runJs( js )
{
    script = new vm.Script( js )
    script.runInContext( context )
    setTimeout( function(){console.log( "_DONE_" )}, 1 )
}

//Add a node module.
function addModule( path, name )
{
    console.log('Installing '+name+'...')
    const { PluginManager } = require('live-plugin-manager')
    const manager = new PluginManager( { cwd: path, pluginsPath: path+"/node_modules"} )
    
    async function install() {
        await manager.install( name )
        console.log( name+' installed!')
        setTimeout( function(){console.log( "_DONE_" )}, 1 )
    }
    install()
}

