const WebSocket = require('ws');
const uuid = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });

connected_users_w_id = {} // list of connected users with their correspding UUID
connected_users = {}      // list of connected users
removedIndeces = []       // list of indices, which were removed from connected_users_w_id, used in getUser()
numUsers = 0              // holds the number of users in a session

// Returns true if the passed in value is a JSON object
// https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
function isJSON (something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
}

// This method returns the corresponding name of the UUID that
// was passed in. Also it deletes the value from both connected user
// lists.
function getUserAndDelete(id){
    var name
    connectedUsrsLenth = countProperties(connected_users_w_id)
    for(var i = 0; i < numUsers; i++){
      if(removedIndeces.includes(i) === false){
        if(id === connected_users_w_id[i].UUID){

          name = connected_users_w_id[i].name
          delete connected_users_w_id[i]
          delete connected_users[i]
          removedIndeces.push(i)
          break
      }
    }
  }

    if(connectedUsrsLenth === 1){
      numUsers = 0
      removedIndeces = []
    }
    return name
}

// This method rerturns the correspding UUID of the user name that was
// passed.
function getID(name){
  connectedUsrsLenth = countProperties(connected_users_w_id)
  for(var i = 0; i < numUsers; i++){
    if(removedIndeces.includes(i) === false){
      if(name === connected_users_w_id[i].name)
        id = connected_users_w_id[i].UUID
    }
  }
  return id
}

// Returns the number of items in an object
//https://stackoverflow.com/questions/956719/number-of-elements-in-a-javascript-object
function countProperties(obj) {
    return Object.keys(obj).length;
}

// start connection
wss.on('connection', function connection(ws, request) {

  ws.client_id = uuid.v4();

  ws.send('Your client Id:' + ws.client_id)

  // recieve messages
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);

    // Check if received message is a JSON object. If yes, then that means
    // that the message is a conversation message and it needs to be sent
    // out to all clients. If no, then the message is a connection confirmation
    // message. (NOTE: the only time a message will not be a JSON object, is
    // the first message from every client.)
    if(isJSON(message) === true){

      // Check if message is a private message, if the message is private. If
      // the 'Private Message Recipient' field is set to NULL, then the message
      // is for every client. If the field contains a name, then the message is
      // private and the name is the correspding private message recipient.
      if(JSON.parse(message).prvtMsgRecipient === "NULL"){
        // send message to all clients
        wss.clients.forEach(function each(client){
          if(client.readyState === WebSocket.OPEN){
            client.send(message)
          }
        })
      } else {
        // get id of client having private message being sent to
        clientsID = getID(JSON.parse(message).prvtMsgRecipient)

        //send to correspding UUID and self
        wss.clients.forEach(function each(client){
          if(client.readyState === WebSocket.OPEN && (client.client_id === clientsID || client === ws) ){
            client.send(message)
          }
        })
      }

    } else{
      // get the name of the name of the newly connected client, by getting
      // a substring from the recieved message, since the clients name will
      // always be the first word in the confirmation message
      var pos = message.indexOf(" ")
      var clientName = message.substring(0, pos)

      // add client name the corresponding UUID to the list
      var userWid = {name: clientName, UUID: ws.client_id} // user with UUID
      connected_users_w_id[numUsers] = userWid
      // add client to the list
      connected_users[numUsers] = clientName

      // This object is sent out to every newly connected client. The purpose
      // of sending out this object is because it contains a list of
      // the currently connected users, which is used for displaying
      // the current users in the side bar, in the chat view.
      var makeConnections = {
        dataType: "makeConnections",
        message: "NULL",
        name: clientName,
        UUID: ws.client_id,
        connectedUsers: connected_users,
        prvtMsgRecipient: "NULL"
      }

      // This object is sent out to all clients, except the newly connected
      // client, every time a new clients connects to the chat session. The
      // purpose of sending out this object is because it contains the name
      // of the newly connected client, so they can add it to their user display
      // lists.
      var addUsr = {
        dataType: "addUsr",
        message: "NULL",
        name: clientName,
        UUID: ws.client_id,
        connectedUsers: {},
        prvtMsgRecipient: "NULL"
      }

      // sending data to clients
      wss.clients.forEach(function each(client){
        // send to self
        if(client === ws && client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify(makeConnections))
        }
        // send to all but self
        if(client !== ws && client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify(addUsr))
        }
      })
        numUsers++
    }
  })


  ws.on('close', function(){
    console.log('client droped:', ws.client_id)

    //get username of user which disconnected
    var userName = getUserAndDelete(ws.client_id)

    // This object is sent out to all remaining clients, notifying them
    // that this client has disconnected. The clients use this data
    // to remove this client from their user display lists.
    var disconnectData = {dataType: "usrDisconnect",
                          message: "NULL",
                          name: userName,
                          UUID: ws.client_id,
                          connectedUsers: []
                        }

    // Send data to clients
    wss.clients.forEach(function each(client){
      //send to all but self
      if(client !== ws && client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify(disconnectData))
      }
    })

  });

});