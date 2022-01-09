import React from "react";
import Button from 'react-bootstrap/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {MuiPickersUtilsProvider, 
        KeyboardDatePicker, 
        StaticDatePicker, 
        DatePicker,
        DateRangePicker, 
        Calendar} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import SelectTimezoneMaterialUi from 'input-material-ui';

const TimeSlots = ({timeSlots,handleTimeSlotClick}) => {

    // Use selectedDate to display corresponding slots
    const [selectedDate, setSelectedDate] = React.useState(
        new Date()
    )
    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const dateStr = selectedDate.getFullYear().toString()+'-'+(selectedDate.getMonth()+1).toString()+'-'+selectedDate.getDate().toString()
    console.log((dateStr))
    
    const timeSlotsInOneDay = (dateStr in timeSlots) ? timeSlots[dateStr] : Array()
    console.log('timeSlots in One day: ', timeSlotsInOneDay)

    // Create one-hour slots
    var displayedSlots = Array()
    for (const slot of timeSlotsInOneDay) {
        const dateObj = new Date(slot.time)
        var start = dateObj.getHours()
        var end = (start+1)%24
        const suffix = end<12 ? 'am' : 'pm'
        start -= start>12 ? 12 : 0
        end -= end>12 ? 12 : 0
        const timeStr = start.toString()+':00-'+end.toString()+':00 '+suffix
        displayedSlots.push({time : timeStr, id : slot.time, isChosen : slot.isChosen})
        // displayedSlots.push({time : timeStr, id : slot.time, isChosen : slot.isChosen})
        // displayedSlots.push({time : timeStr, id : slot.time, isChosen : slot.isChosen})
        // displayedSlots.push({time : timeStr, id : slot.time, isChosen : slot.isChosen})
        // displayedSlots.push({time : timeStr, id : slot.time, isChosen : slot.isChosen})
    }

    // Create slot buttons
    const TimeSlotListInOneDay = displayedSlots.map(displayedSlot => {
        return (
            // <Button className={displayedSlot.isChosen?"chosenTimeSlot":"timeSlot"} variant="Secondary" id={displayedSlot.id} key={displayedSlot.id} onClick={handleTimeSlotClick}>{displayedSlot.time}</Button>
            <button className={displayedSlot.isChosen?"chosenTimeSlot":"timeSlot"} id={displayedSlot.id} key={displayedSlot.id} onClick={handleTimeSlotClick}>{displayedSlot.time}</button>
        )
    })

    const disableDate = (date) => {
        // Disable the days beyond 7 days from now
        const isBeyond = Math.floor((date - new Date()) / (1000*60*60*24)) >= 6
        return isBeyond
    }

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','Octobor','November','December']
    const date = selectedDate.getDate()
    const day = days[selectedDate.getDay()]
    const month = months[selectedDate.getMonth()]
    return (
        <div className="CalendarPage">
            <div className="date-slot-wrapper">
                <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker">
                    <DatePicker
                    disablePast
                    disableToolbar
                    shouldDisableDate={disableDate}
                    orientation = 'portrait'
                    variant = 'static'
                    format = 'MM/dd/yyyy'
                    margin = 'normal'
                    id = 'date-picker'
                    label = 'Date Picker'
                    value = {selectedDate}
                    onChange = {handleDateChange}/>
                </MuiPickersUtilsProvider>
                <div className="CalendarHint">
                    * Please select all your available time slots. We will pick one for you.
                </div>
            </div>

            <div className="TimeSlotListsInOneDay">
                <div className="TimeSlotTitle">{day+', '+month+' '+date.toString()}</div>
                <div className={displayedSlots.length>0?"TimeSlotButtons":"NoAvailSlotsMessage"}>
                    {displayedSlots.length>0 ? TimeSlotListInOneDay : 'Oops, no available slots... Please try another date.'}
                </div>
            </div>
        </div>
    )
}


export default TimeSlots;