import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { liveChat } from 'meteor/live-chat-meteor-client';

import './main.html';
// import './css/custom.css';
liveChat.init('YQ65fH4ZZFY4nBCq6');

console.log('livechat', liveChat.userSessionId);
