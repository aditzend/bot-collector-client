import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { liveChat } from 'meteor/live-chat-meteor-client';

import './main.html';
// import './css/custom.css';
liveChat.init('YQ65fH4ZZFY4nBCq6');

console.log('livechat', liveChat.userSessionId);

liveChat.connection = new WebSocket('ws://echo.websocket.org');
// var connection = new WebSocket('ws://echo.websocket.org');

liveChat.connection.onopen = function () {
    console.log('connected to echo');
    liveChat.connection.send("hola");
    
    // connection is opened and ready to use
};

liveChat.connection.onerror = function (error) {
    console.log('error in echo connection');
    // an error occurred when sending/receiving data
};
let response = {
    position: 0,
    data: "null"
};

liveChat.connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    try {
        // var json = JSON.parse(message.data);
        console.log(" respuesta de echo >>> ", message.data);
        response.position ++;
        response.data = message.data;
        // liveChat.responses.push("new response " + message.data);
        liveChat.ddp.call('respondSame', message.data, liveChat.clientAppId, liveChat.userSessionId);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return;
    }
    // handle incoming message
};

let count = 0;

Meteor.setInterval(function() {
  
    // console.log("response is pos ", liveChat.responses[count]);
    // connection.send("holanda " + count);
    // count ++;
    // liveChat.ddp.call('askWs', response.data, clientAppId, userSessionId);
}, 2000);
