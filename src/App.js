import React, { Component } from "react";
import Listeners from './Listeners';
import Days from './Days';
import moment from 'moment';

class App extends Component {
  state = {
    loading: true,
    listeners: [],
    allDays: []
  }
  
  async componentDidMount() {
    // Decide the 7 days starting today
    const refDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const today = moment().format('dddd')
    const off = refDays.indexOf(today)
    var days = Array(7)
    for (var i=0; i<7; i++) {
      const j = (i+off)%7
      days[i] = refDays[j]
    }
    this.setState({
      allDays : days
    })

    // get all the listeners from db
    this.setState({
      loading: true
    })
    const url = 'https://ringbell-api.herokuapp.com/api/v1/listeners'
    const resp = await fetch(url)
    const data = await resp.json()
    const persons = data.data
    this.setState({
      loading: false,
      listeners : persons,
    })
  }

  render() {
    return (
      // <div>
      //   {this.state.loading ? <div>loading...</div> :
      //   <Listeners listeners={this.state.listeners} allDays={this.state.allDays}/>}
      // </div>
      <div>
        <Days allDays={this.state.allDays}/>
        <div> {this.state.loading ? <div>loading...</div> :
              <Listeners listeners={this.state.listeners} allDays={this.state.allDays}/>}
        </div>
      </div>
    );
  }
}

export default App;
