import { liveChat } from 'meteor/live-chat-meteor-client';

console.log('methods.js');

CLIENT_APP_ID = 'mNmFAroncz6N4p8xc';
liveChat.init(CLIENT_APP_ID);

console.log('livechat', liveChat.userSessionId);