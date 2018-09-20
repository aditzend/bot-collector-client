liveChat = {
    init(clientAppId) {
        let self = this;
        // const endpoint = 'https://tramites-ctp-cm.herokuapp.com';
        const endpoint = 'localhost:4000';
        // const endpoint = 'https://live-chat-singulogic-host.herokuapp.com';
        // const endpoint = 'https://e42cf191.ngrok.io';
        // const endpoint = 'https://sing4host.herokuapp.com';
        this.userSessionId = Random.id();
        this.clientAppId = clientAppId;
        this.ddp = DDP.connect(endpoint);
        this.chatCollection = new Mongo.Collection('chat', {connection: this.ddp});
        this.expensesCollection = new Mongo.Collection('expenses', {connection: this.ddp});
        this.ddp.subscribe('Chat.messagesList', this.clientAppId, this.userSessionId);
        // this.ddp.subscribe('Expenses.ownList', this.clientAppId, this.userSessionId);
        this.ddp.subscribe('Expenses.clientList', this.clientAppId);
        this.messages = this.chatCollection.find({userSessionId: this.userSessionId}, {sort: {date: 1}});
        this.expenses = this.expensesCollection.find({}, {sort: {date: -1}})
        this.connection = {};
    }
};