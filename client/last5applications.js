import './last5applications.html'

import {
    liveChat
} from 'meteor/live-chat-meteor-client';

Template.Last5Applications.onCreated(function() {
    this.top5applications = new ReactiveVar(null)
})

Template.Last5Applications.onRendered( function() {
    const tmpl = this
    tmpl.autorun(() => {
        tmpl.top5applications.set(liveChat.top5applications)
    })
})

Template.Last5Applications.helpers({
    applications() {
        const instance = Template.instance();

        return instance.top5applications.get()
    },
    status(data) {
        if ( data.seniority.unit === "mes" || data.amount > 5000 ) {
            return "RECHAZADO"
        } else {
            return "PRE APROBADO"
        }
    },
    rangeTranslator(num) {
        switch (num) {
            case "1":
                return "Entre 0 y $5.000,00/mes"
                break
            case "2":
                return "Entre $5.000,00/mes y $10.000,00/mes"
                break
            case "3":
                return "Más de $15.000,00/mes"
                break
            default:
                return "No definido"

        }
    }
})