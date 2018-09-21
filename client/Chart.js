import React, { Component } from 'react'
import { render } from 'react-dom'
import { LineChart,
         Line,
        CartesianGrid,
        AreaChart,
        Area,
        PieChart,
        Pie,
        Legend,
        Cell
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
    getExpenses() {
        return [
            {_id:1, concept: 'super', cost:100},
            {_id:2, concept: 'super', cost:200},
            {_id:3, concept: 'super', cost:300},
        ]
    }
   
    renderExpenses() {
        return this.props.expenses.map( (expense) => (
            <li>{expense.concept} || {expense.cost}</li>
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
                <AreaChart width={730} height={250} data={this.props.expenses}>
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
                </AreaChart>
                <h3>Gastos por concepto</h3>
                <PieChart width={730} height={250}>
                    <Pie data={this.props.sum} dataKey="cost" nameKey="concept" cx="50%" cy="50%" outerRadius={50} label>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={this.props.colors[index]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </div>
        )
    }
}

export default withTracker(() => {
    let agg = {Gimnasio:0, Super:0}
    liveChat.expenses.forEach( (e) => {
        agg[e.concept] = agg[e.concept] + e.cost
    }

    )
    return {
        colors: ["#8884d8", "#82ca9d"],
        expenses: liveChat.expenses.map( function(e) {
            return {
                cost: e.cost,
                double: e.cost * 2,
                concept: e.concept,
                date: moment(e.date).format("HH:mm")
            }
        }),
        sum: [
            { concept: "Gimnasio", cost: agg["Gimnasio"]},
            { concept: "Super", cost: agg["Super"]},
        ]
          
        
    }
}) (Chart)