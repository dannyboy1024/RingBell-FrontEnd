import React from "react";
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


const MatchDialog = ({numChosenSlots,message,handleNextClick,handleSuccessDialogOkClick}) => {
    const [show, setShow] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const handleNextButton = () => {
        handleNextClick();
        setShow(true);
    }
    const handleSuccessDialogOkClose = () => {
        handleSuccessDialogOkClick();
        setShow(false);
    }
    console.log('Actual #chosen slots = ', numChosenSlots)
    return (
        <div>
            { numChosenSlots>0 ?
                <div>
                    <Button className="next" variant="Info" onClick={handleNextButton}> Next </Button>
                    <Dialog open={show} fullWidth={fullWidth} maxWidth={maxWidth}>
                        <DialogTitle id="customized-dialog-title">
                            {message}
                        </DialogTitle>
                        {
                            message==='Matching is done!' ?
                            <div>
                                <DialogContent>
                                    <DialogContentText>
                                        Click Ok to check the matching result.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleSuccessDialogOkClose}> Ok </Button>
                                </DialogActions>
                            </div> : 
                            <div className="matching-loading-container">
                                <div class="text-center">
                                    <div class="spinner-border text-warning" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div> 
                            </div>
                        }
                    </Dialog>
                </div> : 
                <div>
                    <Button className = "disabledNext" variant="secondary" disabled>Next</Button>
                </div>
            }           
        </div>
    )
}

export default MatchDialog;