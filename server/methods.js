import { liveChat } from 'meteor/live-chat-meteor-client';

console.log('methods.js');

CLIENT_APP_ID = 'xhdDrr6hLB2q5vzRH';
liveChat.init(CLIENT_APP_ID);

console.log('livechat', liveChat.userSessionId);