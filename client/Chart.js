import React, { Component } from 'react'
import { render } from 'react-dom'
import { LineChart, Line } from 'recharts'
import { withTracker } from 'meteor/react-meteor-data'
import {
    liveChat
} from 'meteor/live-chat-meteor-client';

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
                <ul>{this.renderExpenses()}</ul>
                <LineChart width={400} height={400} data={this.props.expenses}>
                    <Line type="monotone" dataKey="cost" stroke="#8884d7" />
                </LineChart>
            </div>
        )
    }
}

export default withTracker(() => {
    return {
        expenses: liveChat.expenses.fetch()
    }
}) (Chart)