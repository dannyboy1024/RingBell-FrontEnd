import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MatchDialog = ({numChosenSlots,message,handleNextClick,handleSuccessDialogOkClick}) => {
    const [show, setShow] = React.useState(false);
    const handleNextButton = () => {
        handleNextClick();
        setShow(true);
    }
    const handleSuccessDialogOkClose = () => {
        handleSuccessDialogOkClick();
        setShow(false);
    }
    return (
        <div>
            { numChosenSlots>0 ?
            <div>
                <Button className = "timeSlotsConfirm" variant="Info" onClick={handleNextButton}>Next</Button> 
                <Modal show={show}>
                <Modal.Header>
                <Modal.Title>{message}</Modal.Title>
                </Modal.Header>
                {
                    message==='Matching is done!' ?
                    <div>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleSuccessDialogOkClose}>Ok</Button>
                        </Modal.Footer>
                    </div> :
                    <div></div>
                }
                </Modal>
            </div> : 
            <div>
                <Button className = "disabledTimeSlotsConfirm" variant="secondary" disabled>Next</Button>
            </div>
            }           
        </div>
    )
}

export default MatchDialog;