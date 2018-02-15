
// Meteor.setTimeout(function() {
//     liveChat.ddp.call('testEcho', "FROM CLIENT OKALIS");
// }, 1000);


Template.liveChatBox.onCreated(function () {
    this.liveChatMessages = new ReactiveVar(null);
});

Template.liveChatBox.onRendered(function () {
    const tmpl = this;
    const messages = tmpl.$('.js-chat-messages');
    const input = tmpl.$('.js-chat-submit-input');
    const data = Template.currentData();
    const userSessionId = data && data.userSessionId;
    tmpl.autorun(() => {
        if (liveChat.messages.count()) {
            tmpl.liveChatMessages.set(liveChat.messages);
        }
    });
});

Template.liveChatBox.events({
    'keydown .js-chat-submit-input'(e) {
        const msg = $(e.currentTarget).val();
        const clientAppId = liveChat.clientAppId;
        const userSessionId = liveChat.userSessionId;
        const key = e.keyCode || e.which;
        if (key === 13 && !e.shiftKey) {
            e.preventDefault();
            if (msg.trim() !== '') {
                // liveChat.connection.send(msg);
                liveChat.ddp.call('addIncomingMsg', userSessionId, clientAppId, userSessionId);
                // liveChat.ddp.call('testEcho', msg, clientAppId, userSessionId);
                $(e.currentTarget).val('');
            }
        }
    }
});

Template.liveChatBox.helpers({
    liveChatMessages() {
        const instance = Template.instance();
        return instance.liveChatMessages.get();
    }
});