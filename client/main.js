import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { liveChat } from 'meteor/live-chat-meteor-client';
import React from 'react'
import { render } from 'react-dom'



import './main.html';
import './charts.js'
import './last5bookings'
// import './css/custom.css';
liveChat.init('iWZYqELkHENCz76Sb');

console.log('userSessionId', liveChat.userSessionId);
console.log('clientAppId', liveChat.clientAppId);

Meteor.startup( () => {
    // render(<h1>hello react</h1>, document.getElementById('react-container'))
})