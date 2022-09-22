import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Route, useNavigate } from 'react-router-dom';

function Agreement({show,hide}) {
const navigate = useNavigate();
// generate a random string for the state parameter
// simple method to generate a random string
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};



  return (
    
    <>
     
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>How we use your data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2 >Information automatically collected</h2>
 Some information such as your Intent Protocol (1P) address and/or browser and device characteristics-is collected automatically when you visit our Services.
We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (ike your name or contact intormation) but
may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country,
location, information about how and when you use our Services, and other technical information. This information Is primarily needed to maintain the security and operation of our
Services, and for our internal analytics and reporting purposes.
Like many businesses, we also collect information through cookies and similar technologies.
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" >
            Contact us
          </Button>
          <Button onClick={()=>{
            hide(false)
            navigate('/register/'+generateRandomString(100)+'?accepted=true && newuser=true',{
              state:{
                type:'talent'
              }
            })
            
          }} variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Agreement;