liveChat = {
    init(clientAppId) {
        let self = this;
        const endpoint = Meteor.settings.public.endpoint
        // const endpoint = 'https://mitcredit-manager.herokuapp.com';
        // const endpoint = 'localhost:4000'
        // const endpoint = 'https://e42cf191.ngrok.io';
        // const endpoint = 'https://sing4host.herokuapp.com';
        this.userSessionId = Random.id();
        this.clientAppId = clientAppId;
        this.ddp = DDP.connect(endpoint);
        this.chatCollection = new Mongo.Collection('chat', {connection: this.ddp});
        this.expensesCollection = new Mongo.Collection('expenses', {connection: this.ddp});
        this.reservationsCollection = new Mongo.Collection('reservations', {connection: this.ddp});
        this.applicationsCollection = new Mongo.Collection('applications', {connection: this.ddp});
        this.ddp.subscribe('Chat.messagesList', this.clientAppId, this.userSessionId);
        // this.ddp.subscribe('Expenses.ownList', this.clientAppId, this.userSessionId);
        // this.ddp.subscribe('Expenses.clientList', this.clientAppId);
        // this.ddp.subscribe('Reservations.all');
        this.messages = this.chatCollection.find({userSessionId: this.userSessionId}, {sort: {date: 1}});
        this.expenses = this.expensesCollection.find({}, {sort: {date: -1}})
        this.reservations = this.reservationsCollection.find({}, {})
        this.top5applications = this.applicationsCollection.find({}, {limit:3, sort: {createdAt: -1}})
        this.top5reservations = this.reservationsCollection.find({}, {limit:3, sort: {createdAt: -1}})
        this.connection = {};
    }
};