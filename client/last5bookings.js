import './last5bookings.html'

import {
    liveChat
} from 'meteor/live-chat-meteor-client';

Template.Last5Bookings.onCreated(function() {
    this.bookings = new ReactiveVar(null)
})

Template.Last5Bookings.onRendered( function() {
    const tmpl = this
    tmpl.autorun(() => {
       tmpl.bookings.set(liveChat.reservations)
    })
})

Template.Last5Bookings.helpers({
    bookings() {
        const instance = Template.instance();

        return instance.bookings.get()
    }
})