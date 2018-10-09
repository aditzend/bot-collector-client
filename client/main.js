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
    let pps = [{}] //pasajeros por sede
    pps.push({ checkIn: "2018-10-01", paxMadrid: 2 })
    pps.push({ checkIn: "2018-10-02", paxBarcelona: 5 })
    pps.push({ checkIn: "2018-10-03", paxBarcelona: 8 })
    pps.push({ checkIn: "2018-10-04", paxMadrid: 4 })
    console.log(`me estas jodiendo ${pps[1].checkIn}`)
    // render(<h1>hello react</h1>, document.getElementById('react-container'))
})