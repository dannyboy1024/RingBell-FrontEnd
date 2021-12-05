import React from "react";
import Button from 'react-bootstrap/Button';

const MatchResult = ({matchedListener,matchedTimeSlot,handleConfirmBookingClick,handleRescheduleClick,handleCancelBookingClick}) => {
    const [show, setShow] = React.useState(false);
    const handleConfirmBookingButton = () => {
        handleConfirmBookingClick();
        setShow(true);
    }
    const handleRescheduleButton = () => {
        handleRescheduleClick();
        setShow(true);
    }
    const handleCancelBookingButton = () => {
        handleCancelBookingClick();
        setShow(true);
    }

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','Octobor','November','December']
    const matchedDate = new Date(matchedTimeSlot)
    const day = days[matchedDate.getDay()]
    const month = months[matchedDate.getMonth()]
    const date = matchedDate.getDate().toString()
    const year = matchedDate.getFullYear().toString()
    const dateDisplayed = day+', '+month+' '+date+', '+year
    var start = matchedDate.getHours()
    var end = (start+1)%24
    const suffix = end<12 ? 'am' : 'pm'
    start -= start>12 ? 12 : 0
    end -= end>12 ? 12 : 0
    const timeDisplayed = start.toString()+':00-'+end.toString()+':00 '+suffix
    return (
        <div className = "matchResult">
            <ul className = "matchResultGroup">
                <i class="bi bi-calendar-check-fill"></i>
                <li>{dateDisplayed}</li>
                <li>{timeDisplayed}</li>
                <i class="bi bi-person-fill"></i>
                <li>{matchedListener.name}</li>
            </ul> 
            <div className = "matchResultButtonGroup">
                <Button className="reschedule" variant="Info" onClick={handleRescheduleButton}>Reschedule</Button>
                <Button className="cancel-booking" variant="Info" onClick={handleCancelBookingButton}>Cancel booking</Button> 
                <Button className="confirm" variant="Info" onClick={handleConfirmBookingButton}>Confirm</Button>
            </div>
        </div>
    )
}



export default MatchResult;