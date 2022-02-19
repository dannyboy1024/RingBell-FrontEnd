import React, { Component } from "react";
import axios from "axios";
import "../styles/Calendar.css"
import TimeSlots from '../components/TimeSlots';
import Days from '../components/Days';
import MatchDialog from '../components/MatchDialog';
import MatchResult from '../components/MatchResult';
import CircularProgress from '@mui/material/CircularProgress';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StylesProvider } from "@material-ui/core";
import moment from 'moment';
import {clone} from 'lodash';

class Calendar extends Component {
  state = {
    // Loading stage
    loading: true,
    timeSlots: [],
    allDays: [],
    bellringer: '',
    dayOff: 0,
    // Displaying stage
    displaying: false,
    numChosenSlots: 0,
    chosenSlots: [],
    // Matching stage
    matching: false,
    matchedListener: '',
    matchedTimeSlot: '',
    // success stage, a listener is matched!
    success: false,
    // failure stage, no listener is matched...
    failure: false,
    // confirming stage
    confirming: false,
    // confirmed stage
    confirmed: false,
    // cancelled stage
    cancelled: false
  }

  async componentDidMount() {

    // get the bellringer chosen university
    console.log('bellringer_info', JSON.parse(window.sessionStorage.getItem("bellringer_info")))
    const chosenUni = JSON.parse(window.sessionStorage.getItem("bellringer_info")).matchUni.search('Toronto')!==-1 ? 'uoft' : "western"

    // get all the time slots from backend
    console.log("Getting time slots of the chosen university from backend!")
    const url = 'https://ringbell-api.herokuapp.com/api/v1/listeners/timeSlotsInWeek'
    const resp = await axios.get(url)
    var uniTimeSlots = resp.data.data
    // axios.post(url, {
    //   title: "Chosen University",
    //   body: chosenUni
    // }).then (response => uniTimeSlots = response.data.data)
    console.log(uniTimeSlots)
    
    // organize time slots through their local dates
    var slotSetMp = {}
    var date_timeID_Mp = {}
    for (const timeSlot of uniTimeSlots) {
      const timeSlotDate = new Date(timeSlot.date)
      const dateStr = timeSlotDate.getFullYear().toString()+'-'+(timeSlotDate.getMonth()+1).toString()+'-'+timeSlotDate.getDate().toString()
      if (! (dateStr in slotSetMp)) {
        slotSetMp[dateStr] = new Set()
      }
      // check if the university is the one user has chosen
      const uni = timeSlot.university.search('Toronto')!==-1 ? 'uoft' : 'western'
      if (chosenUni === uni) {
        slotSetMp[dateStr].add(timeSlot.date)
        date_timeID_Mp[timeSlot.date] = timeSlot.timeID
      }
    }
    var slotMp = {}
    for (const [key,val] of Object.entries(slotSetMp)) {
      slotMp[key] = new Array()
      for (const item of val) {
        console.log('check item/timeID', item, date_timeID_Mp[item])
        slotMp[key].push({time: item, timeID: date_timeID_Mp[item], isChosen: false})
      }
    }
    console.log('slotMp: ', slotMp)

    this.setState({
      loading: false,
      displaying: true,
      bellringer: JSON.parse(window.sessionStorage.getItem("bellringer_info")),
      timeSlots: slotMp
    })
    console.log(this.state.timeSlots)
    console.log(this.state.bellringer)
  }

  async componentDidUpdate() {
    if (this.state.displaying) {
      console.log("Making choices...")
      return
    }
    if (this.state.matching) {
      // Choices confirmed! 
      var chosenSlots = Array()
      for (const [key,val] of Object.entries(this.state.timeSlots)) {
        for (const item of val) {
          if (item.isChosen) {
            chosenSlots.push({"date": item.time, "timeID": item.timeID})
          }
        }
      }
      console.log({
        title: "User chosen time slot IDs",
        body: chosenSlots
      })

      // manually added a delay here to see if matching state is handled properly, will delete later
      await new Promise(r => setTimeout(r, 1000)); 

      const url = 'https://ringbell-api.herokuapp.com/api/v1/listeners/getMatch'
      axios.post(url, {
        title: "User chosen time slot IDs",
        body: chosenSlots // a list of dates with TimeIDs
      }).then (response => this.setState({
          matching : false,
          success : true,
          matchedListener : response.data.data.listener,
          matchedTimeSlot : response.data.data.timeSlot
      }))
      
      return
    }
    if (this.state.success) {
      console.log("Found a matched listener!")
      console.log(this.state.matchedListener)
      console.log(this.state.matchedTimeSlot)
      console.log(this.state.bellringer)

      console.log("Compute the time string including time zone offset suffix")
      const localDateObj = new Date(this.state.matchedTimeSlot)
      const localHour = localDateObj.getHours()
      const hourValue = localHour<=12 ? localHour : (localHour-12)
      const localHourStr = hourValue.toString() + ":00" + (localHour<=12 ? 'am' : 'pm')
      const timeZoneOffset = Math.floor(localDateObj.getTimezoneOffset() / 60)
      const offsetSign = timeZoneOffset > 0 ? '-' : '+'
      const offsetSuffix = timeZoneOffset===5 ? " EST" : ("  GMT" + offsetSign + Math.abs(timeZoneOffset).toString() + ":00")
      const yearMonthDate = localDateObj.getFullYear().toString()+'/'+(localDateObj.getMonth()+1).toString()+'/'+localDateObj.getDate().toString()+" "
      const userLocaltimeStr = yearMonthDate + localHourStr + offsetSuffix
      console.log("Local time string to send through email: ", userLocaltimeStr)

      return
    }
    if (this.state.confirming) {
      console.log("Confirming the appointment time...")
      return
    }
    if (this.state.confirmed) {

      console.log("Compute the time string including time zone offset suffix")
      const localDateObj = new Date(this.state.matchedTimeSlot)
      const localHour = localDateObj.getHours()
      const hourValue = localHour<=12 ? localHour : (localHour-12)
      const localHourStr = hourValue.toString() + ":00" + (localHour<=12 ? 'am' : 'pm')
      const timeZoneOffset = Math.floor(localDateObj.getTimezoneOffset() / 60)
      const offsetSign = timeZoneOffset > 0 ? '-' : '+'
      const offsetSuffix = timeZoneOffset===5 ? "  EST" : ("  GMT" + offsetSign + Math.abs(timeZoneOffset).toString() + ":00")
      const yearMonthDate = localDateObj.getFullYear().toString()+'/'+(localDateObj.getMonth()+1).toString()+'/'+localDateObj.getDate().toString()+" "
      const userLocaltimeStr = yearMonthDate + localHourStr + offsetSuffix
      console.log("time string to send through email: ", userLocaltimeStr)

      console.log("Sending confirmation back to backend...")
      const url = 'https://ringbell-api.herokuapp.com/api/v1/listeners/confirmMatch'
      console.log(
        { "timeSlot" : this.state.matchedTimeSlot, 
          "listener" : this.state.matchedListener, 
          "bellRinger" : this.state.bellringer,
          "localTime" : userLocaltimeStr
        })
      axios.post(url, {
        title: "User confirmed time slot ID and Listener",
        body: {"timeSlot" : this.state.matchedTimeSlot, 
               "listener" : this.state.matchedListener, 
               "bellRinger" : this.state.bellringer,
               "localTime" : userLocaltimeStr
              }
      }).then (response => console.log(response.data))
    }
  }

  handleTimeSlotClick = (e) => {

    // update time slot chosen status
    const timeSlotDate = new Date(e.target.id)
    const dateStr = timeSlotDate.getFullYear().toString()+'-'+(timeSlotDate.getMonth()+1).toString()+'-'+timeSlotDate.getDate().toString()
    var curTimeSlots = clone(this.state.timeSlots)
    var curNumChosenSlots = this.state.numChosenSlots
    for (var i=0; i<curTimeSlots[dateStr].length; i++) {
      const slot = curTimeSlots[dateStr][i]
      if (slot.time === e.target.id) {
        curNumChosenSlots += slot.isChosen ? -1 : 1
        curTimeSlots[dateStr][i] = {time : slot.time, timeID : slot.timeID, isChosen : !slot.isChosen}
        break
      }
    }
    this.setState({
      timeSlots : curTimeSlots,
      numChosenSlots : curNumChosenSlots
    })
  }
  handleNextClick = (e) => {
    this.setState({
      displaying : false,
      matching: true
    })
  }
  handleSuccessDialogOkClick = (e) => {
    this.setState({
      success : false,
      confirming : true,
    })
  }
  handleConfirmBookingClick = (e) => {
    this.setState({
      confirming: false,
      confirmed: true 
    })
  }
  handleRescheduleClick = (e) => {
    // reset all the time slots to be not chosen
    var rstTimeSlots = {}
    for (const [key,val] of Object.entries(this.state.timeSlots)) {
      rstTimeSlots[key] = new Array()
      for (var i=0; i<val.length; i++) {
        var item = val[i]
        item.isChosen = false
        rstTimeSlots[key].push(item)
      }
    }
    this.setState({
      confirming: false,
      displaying: true,
      timeSlots: rstTimeSlots,
      numChosenSlots: 0
    })
  }
  handleCancelBookingClick = (e) => {
    this.setState({
      confirming: false,
      cancelled: true
    })
  }
  handleCancelBookingDialogOkClose = (e) => {
    this.props.history.push("/:position");
  }
  handleConfirmBookingDialogOkClose = (e) => {
    this.props.history.push("/:position");
  }
  render() {
    return (
      this.state.loading ? 
        <div className="loading-container">
          <div class="text-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
          </div> 
        </div> :
        <StylesProvider injectFirst>
        <div className="calendar-container">
          {
            this.state.displaying ?
            <div>
              <div className="calendar-top">EmpowerChange Online Listening Service</div>
              <TimeSlots timeSlots={this.state.timeSlots} handleTimeSlotClick={this.handleTimeSlotClick}/>
            </div> : 
            this.state.confirming || this.state.confirmed || this.state.cancelled ? 
            <div>
              <div className="calendar-top">EmpowerChange Online Listening Service</div>
              <div className="matched-top">{"Almost done! Upcoming booking for " + this.state.bellringer.name}</div>
              <MatchResult matchedListener={this.state.matchedListener} 
                           matchedTimeSlot={this.state.matchedTimeSlot}
                           matchResultConfirmed={this.state.confirmed} 
                           handleConfirmBookingClick={this.handleConfirmBookingClick} 
                           handleRescheduleClick={this.handleRescheduleClick} 
                           handleCancelBookingClick={this.handleCancelBookingClick}
                           handleCancelBookingDialogOkClose={this.handleCancelBookingDialogOkClose}
                           handleConfirmBookingDialogOkClose={this.handleConfirmBookingDialogOkClose}/> 
            </div> :
            <div></div>
          }

          {
            this.state.displaying||this.state.matching||this.state.success ? 
            <MatchDialog numChosenSlots={this.state.numChosenSlots} message={this.state.success?'Matching is done!':'Matching in progress...'} handleNextClick={this.handleNextClick}handleSuccessDialogOkClick={this.handleSuccessDialogOkClick}/> : 
            <div></div>
          }
        </div></StylesProvider>

    );
  }
}

export default Calendar;
