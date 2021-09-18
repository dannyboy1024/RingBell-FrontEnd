import React, { Component } from "react";
import Listeners from './Listeners';
import Days from './Days';
import moment from 'moment';

class App extends Component {
  state = {
    // To display
    loading: true,
    listeners: [],
    allDays: [],
    // To interact
    confirming: true,
    chosenSlots: []
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

  async componentDidUpdate() {
    if (this.state.confirming) {
      console.log("Still confirming the choices...")
      return
    }
    console.log("Choices confirmed!!!")
    // Run the matching algorithm based on the chosen slots from the user 
    // Matched Listener = matching()
    // console.log("Listener matched!!!")
    
    // Reset the chosen slots
    // this.setState({
    //   confirming: true,
    //   chosenSlots: []
    // })
  }

  handleSlotClick = (e) => {
    if (! this.state.confirming) {
      console.log("The choices are confirmed. Can't make more modifications!")
      return
    }
    // update the slot color
    e.target.style.backgroundColor = e.target.style.backgroundColor==='' ? '#1187c2' : '' 
    // update the state chosenSlots
    var updChosenSlots = this.state.chosenSlots.filter(id => {return id!==parseInt(e.target.id)})
    if (updChosenSlots.length===this.state.chosenSlots.length) {
      updChosenSlots.push(parseInt(e.target.id))
    }
    this.setState({
      chosenSlots : updChosenSlots
    })
  }
  handleConfirmClick = (e) => {
    this.setState({
      confirming : false
    })
  }
  render() {
    return (
      <div>
        <Days allDays={this.state.allDays}/>
        <div> 
              {/* Displaying time slots */}
              {!this.state.confirming ? <div>Choices confirmed! Matching Listeners...</div> : 
                this.state.loading ? <div>loading...</div> :
                <Listeners listeners={this.state.listeners} allDays={this.state.allDays} handleSlotClick={this.handleSlotClick}/>}
              {/* Displaying confirm button */}
              {this.state.confirming && this.state.chosenSlots.length>0 ? <button className="timeSlotsConfirm" onClick={this.handleConfirmClick}>Confirm!</button>:<div></div>}
        </div>
      </div>
    );
  }
}

export default App;
