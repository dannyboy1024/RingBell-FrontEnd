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
        <div>
            <div>{'Matched Listener: ' + matchedListener.name}</div>
            <div>{'Appointment time: ' + matchedTimeSlot.timeID}</div>
            <Button variant="primary" onClick={handleConfirmBookingButton}>Confirm</Button>
            <Button variant="secondary" onClick={handleRescheduleButton}>Reschedule</Button>
            <Button variant="primary" onClick={handleCancelBookingButton}>Cancel booking</Button> 
        </div>
    )
}

export default MatchResult;