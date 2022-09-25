import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OtpInput from 'react-otp-input';
import api from '../../api';

export default function Otprequired({popuptitle,popupmessage,show,setshow,information,setcurentstep}) {
let [otp,setotp]=useState('')
  const handleClose = () => setshow(false);
  let handlesubmit=async()=>{
    let res= await api.checkotpnumber(information.phone,otp)
    if (res.data.status=='success'){
      setcurentstep(prev=>prev+1)
      setshow(false)
    }
  }


  return (
    <>


      <Modal style={{
        opacity: 1,
        display: 'block',
        width: '100%',
      }} show={show} >
        <Modal.Header closeButton>
          <Modal.Title>{popuptitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{popupmessage}</Modal.Body>
        <OtpInput shouldAutoFocus containerStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            
            
        }}
        inputStyle={{
            width: '3rem',
            height: '3rem',
            margin: '0 1rem',
            fontSize: '2rem',
            borderRadius: 4,
            border: '2px solid rgba(0,0,0,0.3)',

        }}
        value={otp}
        onChange={otp => setotp(otp)}
       
        numInputs={6}
      />
    <hr/>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handlesubmit}>
            verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

