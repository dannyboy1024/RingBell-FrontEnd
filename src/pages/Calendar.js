import React, { Component } from "react";
import axios from "axios";
import "../styles/Calendar.css"
import TimeSlots from '../components/TimeSlots';
import Days from '../components/Days';
import moment from 'moment';

class Calendar extends Component {
  state = {
    // Show to users
    loading: true,
    listeners: [],
    allDays: [],
    // Get from users
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
    // Send all chosen time slot IDs to backend
    console.log("Choices confirmed!!!")
    // Compensate for day offset
    const refDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const today = moment().format('dddd')
    const off = refDays.indexOf(today)
    const chosenSlots = this.state.chosenSlots.map(slotId => {
      const day = (Math.floor(slotId/24)+off)%7
      const time = slotId%24
      return day*24+time
    })
    console.log({
      title: "User chosen time slot IDs",
      body: chosenSlots
    })

    const url = 'https://ringbell-api.herokuapp.com/api/v1/listeners/getMatch'
    axios.post(url, {
      title: "User chosen time slot IDs",
      body: chosenSlots
    })
    .then(response => console.log(response));
  }

  handleTimeSlotClick = (e) => {
    if (! this.state.confirming) {
      console.log("The choices are confirmed. Can't make more modifications!")
      return
    }
    // update the slot color
    e.target.style.backgroundColor = e.target.style.backgroundColor==='' ? '#1187c2' : '' 
    // update the chosenSlots
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
        <h1>Welcome to the Calendar Sample :)</h1>
        <div>
          <Days allDays={this.state.allDays}/>
          <div>
                {/* Displaying time slots */}
                {!this.state.confirming ? <div>Choices confirmed! Matching Listeners...</div> : 
                  this.state.loading ? <div>loading...</div> :
                  <TimeSlots listeners={this.state.listeners} allDays={this.state.allDays} handleTimeSlotClick={this.handleTimeSlotClick}/>}
                {/* Displaying confirm button */}
                {this.state.confirming && this.state.chosenSlots.length>0 ? <button className="timeSlotsConfirm" onClick={this.handleConfirmClick}>Confirm!</button> : 
                <div></div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
