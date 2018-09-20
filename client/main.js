import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { liveChat } from 'meteor/live-chat-meteor-client';

import './main.html';
// import './charts.js'
// import './css/custom.css';
liveChat.init('iWZYqELkHENCz76Sb');

console.log('userSessionId', liveChat.userSessionId);
console.log('clientAppId', liveChat.clientAppId);
