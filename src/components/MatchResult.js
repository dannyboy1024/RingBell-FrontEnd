import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const MatchResult = ({matchedListener,matchedTimeSlot,matchResultConfirmed,handleConfirmBookingClick,handleConfirmBookingDialogOkClose,handleRescheduleClick,handleCancelBookingClick,handleCancelBookingDialogOkClose}) => {
    const [show, setShow] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    
    const handleConfirmBookingButton = () => {
        handleConfirmBookingClick();
        setShow(true);
    }
    const handleConfirmBookingDialogButton = () => {
        handleConfirmBookingDialogOkClose();
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
    const handleCancelBookingDialogButton = () => {
        handleCancelBookingDialogOkClose();
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
    const localDateObj = new Date()
    const timeZoneOffset = Math.floor(localDateObj.getTimezoneOffset() / 60)
    const offsetSign = timeZoneOffset<=0 ? '+' : '-' 
    const timeZoneOffsetStr = " (" + (timeZoneOffset===5 ? "EST" : ("GMT " + offsetSign + Math.abs(timeZoneOffset).toString() + ":00")) + ")"
    const timeDisplayed = start.toString()+':00-'+end.toString()+':00 '+suffix+timeZoneOffsetStr
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
                <div className = "matchResultButtonGroupWrapper">
                <Button className="reschedule" variant="Info" onClick={handleRescheduleButton}>Reschedule</Button>
                <Button className="cancel-booking" variant="Info" onClick={handleCancelBookingButton}>Cancel</Button>
                <Button className="confirm" variant="Info" onClick={handleConfirmBookingButton}>Confirm</Button>
                <Dialog open={show} fullWidth={fullWidth} maxWidth={maxWidth}>
                    <DialogTitle id="customized-dialog-title">
                        {
                            matchResultConfirmed ?
                            "Thank you for booking with us!" :
                            "Appointment cancelled!"
                        }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {
                                matchResultConfirmed ?
                                "You will get an email confirmation in a second. Click Ok to go to the main page." :
                                "Click Ok to go to the main page."
                            } 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={matchResultConfirmed ? handleConfirmBookingDialogButton : handleCancelBookingDialogButton}> Ok </Button>
                    </DialogActions>
                </Dialog>
                </div>  
            </div>
        </div>
    )
}



export default MatchResult;