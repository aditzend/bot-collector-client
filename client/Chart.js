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
        const data = [
            {name: 'a', cost:3000},
            {name: 'b', cost:2000},
            {name: 'c', cost:1000},
        ]
       
        return(
            <div>
                {/* <AreaChart width={730} height={250} data={this.props.reservations}>
                    <defs>
                        <linearGradient id="colorUser1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorUser2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDashArray="9 9" />
                    <Tooltip />
                    <Area type="monotone" dataKey="cost" stroke="#8884d8" fillOpacity={1} fill="url(#colorUser1)" />
                    <Area type="monotone" dataKey="double" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUser2)" />
                </AreaChart> */}
                <h3>Pasajeros por ciudad</h3>
                <PieChart width={730} height={250}>
                    <Pie data={this.props.sum} dataKey="pax" nameKey="city" cx="50%" cy="50%" outerRadius={50} label>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.props.colors[index]} />
                            ))
                        }
                    </Pie>
                    <Label position="top" />
                </PieChart>
                {/* <h3>Reservas por ciudad</h3>
                <PieChart width={730} height={250}>
                    <Pie data={this.props.nights} dataKey="nights" nameKey="city" cx="50%" cy="50%" outerRadius={50} label>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.props.colors[index]} />
                            ))
                        }
                    </Pie>
                    <Label position="top" />
                </PieChart> */}
            </div>
        )
    }
}

export default withTracker(() => {
    let agg = {Madrid:0, Barcelona:0}
    let nights = { Madrid: 0, Barcelona: 0 }

    liveChat.reservations.forEach( (reservation) => {
        agg[reservation.city] = agg[reservation.city] + reservation.pax
        nights[reservation.city] = nights[reservation.city] + reservation.nights
    }
  

    )
    return {
        colors: ["#8884d8", "#82ca9d"],
        reservations: liveChat.reservations.map( function(r) {
            return {
                city: r.city,
            }
        }),
        sum: [
            { city: "Madrid", pax: agg["Madrid"]},
            { city: "Barcelona", pax: agg["Barcelona"]},
        ],
        nights: [
            { city: "Madrid", nights: 30 },
            { city: "Barcelona", nights: 90 },
        ]
          
        
    }
}) (Chart)