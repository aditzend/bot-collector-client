import './last5bookings.html'

import {
    liveChat
} from 'meteor/live-chat-meteor-client';

Template.Last5Bookings.onCreated(function() {
    this.top5reservations = new ReactiveVar(null)
})

Template.Last5Bookings.onRendered( function() {
    const tmpl = this
    tmpl.autorun(() => {
        tmpl.top5reservations.set(liveChat.top5reservations)
    })
})

Template.Last5Bookings.helpers({
    bookings() {
        const instance = Template.instance();

        return instance.top5reservations.get()
    }
})