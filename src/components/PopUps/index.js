import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PopUps(props) {
    return (
        <>
            <Modal style={{color:"#0f1828", fontWeight: "bold"}} show={props.show} onHide={props.handleClose}>
                <Modal.Header style={{backgroundColor:"orange"}} closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontWeight: "bold", backgroundColor:"orange"}}>
                    {(props.tipamount!=="NAN") ? (
                        <p>{props.modaltxt1}{props.bill}<br/>
                        {props.modaltxt2}{props.tipamount}<br/>
                        {props.modaltxt3}{props.total}</p>
                    ) : (
                        <p style={{color:"#2d0404", fontSize: "20px",textAlign:"center"}}>Enter Numbers Greater Than 0 Only!</p>
                    )}
                </Modal.Body>               
                <Modal.Footer style={{backgroundColor:"orange"}}>
                    <Button style={{backgroundColor:"#0f1828", fontWeight: "bold"}} variant="primary" onClick={props.handleClose}>    
                    Close                 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUps;