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
    return (
        <div className = "matchResult">
            <ul className = "matchResultGroup">
                <i class="bi bi-calendar-check-fill"></i>
                <li>{'Monday, November 15, 2021'}</li>
                <li>{'6.00-7.00am'}</li>
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