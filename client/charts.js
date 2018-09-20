import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';
import {
    liveChat
} from 'meteor/live-chat-meteor-client';

// import Chartist from  'meteor/mfpierre:chartist-js'

import './charts.html'

// import co from 'co'
// import generate from 'node-chartist'


// import {generate} from 'node-chartist'

Template.Charts.onCreated(function() {
    this.expenses = new ReactiveVar(null)
})

Template.Charts.onRendered(function() {
    const tmpl = this
    tmpl.autorun( () => {
        tmpl.expenses.set(liveChat.expenses)
    })
    //chartist
        // co(function * () {
        //     const options = { width:400, height:200 }
        //     const data = {
        //         labels: ['a','b','c'],
        //         series: [
        //             [1,2,3],
        //             [4,5,6]
        //         ]
        //     }
        //     const bar = yield generate('bar', options, data)
        // })
    //end chartist
})

Template.Charts.helpers({
    expenses() {
        const instance = Template.instance()
        return instance.expenses.get()
    }
})