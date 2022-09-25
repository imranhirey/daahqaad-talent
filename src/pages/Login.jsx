
import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

function Login(props) {

const clientId = "297652155185-45jtmikcfhs0hnk1hfuttpm9ot2khml3.apps.googleusercontent.com"
useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
})

const onSuccess = async(res) => {
  let reps= await axios.post('http://localhost:4000/login/bygoogle', {token:res.profileObj})
  console.log(reps)};
const onFailure = (err) => {
  console.log('failed:', err);
};
    return (
        <Container>
        <Row style={{
            width: '100%',
            height: '30vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
        <Col>
        <img width={300} height={300} src='/logo.png'/></Col>
        </Row>
        <Row style={{
           
            width: '100%',
            height: '60vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}>
          <Col style={{
                
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
           

          }}>
          <Form style={{
            width: '80%',
          }}>
            <Form.Group style={{
              
            }} controlId="formBasicjjkEmail">
                <Form.Label>Email address or phone number </Form.Label>
                <Form.Control className="form-control form-control-lg" type="email" placeholder="Enter email" />
                <br/>
                <Form.Label>Password</Form.Label>
                <Form.Control className="form-control form-control-lg" type="password" placeholder="Enter Your Pasword" />
                <Button style={{
                    marginTop: '10px',
                    width: '100%',
                }} variant="primary" type="submit">
                    Login
                </Button>
                <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
  );
                
               

            </Form.Group>
            

          </Form>
          © 2022 DAAHQAAD INC.
          </Col>
          
        </Row>
      </Container>
    );
}

export default Login;