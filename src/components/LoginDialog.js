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
import './LoginDialog.css'

const LoginDialog = ({buttonDisabled,buttonName,processing,success,fail,message,paragraph,handleSubmit}) => {
    const [show, setShow] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const handleSubmitButton = (e) => {
        handleSubmit(e);
        setShow(true);
    }
    const handleFailureDialogOkClose = () => {
        setShow(false);
    }
    return (
        <div className="form-group">
            {
                buttonName==='Register' ?
                <Button onClick={handleSubmitButton} disabled={buttonDisabled} variant="primary" type="submit">
                    Register
                </Button> :
                <Button onClick={handleSubmitButton} disabled={buttonDisabled} className="btn btn-dark form-submit-btn">
                    {buttonName}
                </Button>
            }
            <Dialog open={show} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle id="customized-dialog-title">
                    {message}
                </DialogTitle>
                {
                    processing || success ? 
                    <DialogActions>
                        <DialogContent>
                            <div className="bouncing-loader">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </DialogContent> 
                    </DialogActions> : 
                    fail && paragraph==='' ?
                    <DialogActions>
                        <Button autoFocus onClick={handleFailureDialogOkClose}> Ok </Button>
                    </DialogActions> :
                    fail && paragraph!=='' ?
                    <DialogActions>
                        <DialogContent>
                            <DialogContentText>
                                {paragraph}
                            </DialogContentText>
                        </DialogContent>
                        <Button autoFocus onClick={handleFailureDialogOkClose}> Ok </Button>
                    </DialogActions> :
                    <div></div>
                }
            </Dialog>      
        </div>
    )
}

export default LoginDialog;