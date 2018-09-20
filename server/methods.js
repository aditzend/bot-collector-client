import { liveChat } from 'meteor/live-chat-meteor-client';

console.log('methods.js');

CLIENT_APP_ID = 'xhdDrr6hLB2q5vzRH';
liveChat.init(CLIENT_APP_ID);

console.log('livechat', liveChat.userSessionId);

// Meteor.methods({
//         insertExpense(req, res) {
//                 const cost = req.queryResult.parameters.costo
//                 const concept = req.queryResult.parameters.concepto
//                 console.log(`cost ${cost}`);
//                 Expenses.insert({
//                     cost: cost,
//                     concept: concept,
//                     createdAt: new Date(),
//                     session: liveChat.userSessionId
//                 })
//                 return {
//                     "fulfillmentText": `Gastaste ${cost}. Anotado en ${concept}!`
//                 }
//             }
// })