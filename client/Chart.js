import React, { Component } from 'react'
import { render } from 'react-dom'
import { LineChart,
         Line,
        CartesianGrid,
        AreaChart,
        Area,
        PieChart,
        Pie,
        Sector,
        Legend,
        Cell,
        Label
     } from 'recharts'
import { withTracker } from 'meteor/react-meteor-data'
import {
    liveChat
} from 'meteor/live-chat-meteor-client';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import moment from 'moment'
import Tooltip from 'recharts/lib/component/Tooltip';
import { emit } from 'cluster';

const _ = require('lodash')



class Chart extends Component {
    // getExpenses() {
    //     return [
    //         {_id:1, concept: 'super', cost:100},
    //         {_id:2, concept: 'super', cost:200},
    //         {_id:3, concept: 'super', cost:300},
    //     ]
    // }
   
    renderExpenses() {
        return this.props.reservations.map( (r) => (
            <li>{r.city} || {r.pax}</li>
        ))
    }

  

    render() {
    
       
        return(
            <div>



             <AreaChart width={730} height={250} data={this.props.pps}>
                    <defs>
                        <linearGradient id="colorUser1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={this.props.colors[0]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={this.props.colors[0]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorUser2" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor={this.props.colors[1]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={this.props.colors[1]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                 <XAxis dataKey="checkIn" />
                 <YAxis />
                 <CartesianGrid strokeDashArray="9 9" />
                 <Tooltip />
                    <Area type="monotone" dataKey="paxBarcelona" stroke={this.props.colors[0]} fillOpacity={1} fill="url(#colorUser1)" />
                 <Area type="monotone" dataKey="paxMadrid" stroke={this.props.colors[1]} fillOpacity={1} fill="url(#colorUser2)" />
             </AreaChart>



                {/* <h3>Pasajeros por ciudad</h3>
                <PieChart width={730} height={250}>
                    <Pie data={this.props.nightsPerSede} dataKey="pax" nameKey="sede" cx="50%" cy="50%" outerRadius={50} label>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.props.colors[index]} />
                            ))
                        }
                    </Pie>
                    <Label position="top" />
                </PieChart> */}
                <h3>Reservas por ciudad</h3>
                <PieChart width={730} height={250}>
                    <Pie data={this.props.nightsPerSede} dataKey="nights" nameKey="sede" cx="50%" cy="50%" outerRadius={50} label>
                        {
                            this.props.nightsPerSede.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.props.colors[index]} />
                            ))
                        }
                    </Pie>
                    <Label position="top" />
                </PieChart>
            </div>
        )
    }
}

export default withTracker(() => {
    let agg = {Madrid:0, Barcelona:0}
    let nights = { Madrid: 0, Barcelona: 0 }
    let madrid = 10
    let barcelona = 20
    let x = 21
    let pps = [{}]

    liveChat.reservations.forEach( (reservation) => {

        let  i = _.findIndex(pps, r => r.checkIn === reservation.checkIn)
        if (i < 0) { 
            pps.push({checkIn: reservation.checkIn, paxMadrid: 0 , paxBarcelona: 0})
            i = pps.length - 1
        } 
        const nights = Number(reservation.nights) || 0
        if (reservation.sede === "Madrid") {
            const oldPax = pps[i].paxMadrid
            pps[i].paxMadrid = oldPax + reservation.pax
            madrid = madrid + nights
        } else {
            const oldPax = pps[i].paxBarcelona
            pps[i].paxBarcelona = oldPax + reservation.pax
            barcelona = barcelona + nights

        }
       
    }
  

    )
    return {
        colors: ["#b31a1f", "#727272"],
        reservations: liveChat.reservations.map( function(r) {
            return {
                givenName: r.givenName,
                pax: r.pax,
                checkIn: r.checkIn,
                nights: r.nights,
                sede: r.sede,
            }
        }),
        sum: [
            { sede: "Madrid", pax: 2},
            { sede: "Barcelona", pax: 3},
        ],
        nightsPerSede: [
            { sede: "Madrid", nights: 23 },
            { sede: "Barcelona", nights: x },
        ],
        nightsPerSede: [
            { sede: "Madrid", nights: madrid },
            { sede: "Barcelona", nights: barcelona },
        ],
        pps:pps,
        
    }
}) (Chart)