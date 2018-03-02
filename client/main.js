import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { liveChat } from 'meteor/live-chat-meteor-client';

import './main.html';
// import './css/custom.css';
CLIENT_APP_ID = 'Tmm68iQqvvziMJ2p4';
liveChat.init(CLIENT_APP_ID);

console.log('livechat', liveChat.userSessionId);
