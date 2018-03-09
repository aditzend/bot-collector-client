

Template.liveChatBox.onCreated(function () {
    this.liveChatMessages = new ReactiveVar(null);
});

Template.liveChatBox.onRendered(function () {
    const tmpl = this;
    const messages = tmpl.$('.js-chat-messages');
    const input = tmpl.$('.js-chat-submit-input');
    const data = Template.currentData();
    const userSessionId = data && data.userSessionId;
    let lastCount = 0;
    
    tmpl.autorun(() => {
        if (liveChat.messages.count()) {

            tmpl.liveChatMessages.set(liveChat.messages);

            if (liveChat.messages.count() > lastCount) {
                lastCount++;
                console.log('messages :', lastCount);
                let h = 0;

                $(".message").each(function (i, val) {
                    h += parseInt($(this).height());
                });
                h += "";
                console.log("total height ", h);
                $("#live-chat-messages").animate({ scrollTop: h }, "slow");

            }
            
           
            
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
            $(".message").each(function(i,val){
                h += parseInt($(this).height());
            });
            h += 80;
            h += "";

            // $("#live-chat-messages").scrollTop($("#live-chat-messages")[0].scrollHeight - 250);
            // let divHeight = $("#live-chat-messages").height();
            // console.log('DIV HEIGHT', divHeight);
            // $("#live-chat-item").animate({scrollTop: $("#chat-end")}, "slow");
            if (msg.trim() !== '') {
                // liveChat.connection.send(msg);
                liveChat.ddp.call('addIncomingMsg', msg, clientAppId, userSessionId);
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