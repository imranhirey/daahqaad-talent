import React from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import Agreement from '../components/Agreement';
import Registerinfotaker from '../components/Agreement';

function Start(props) {
  let [regsterstarted, setregsterstarted] = React.useState(false);
  return (
           
    <Container style={{
       
        height: '100vh',
        width: '100vw'
    }} fluid>
    <Row >
      <Col  style={{height:'700px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} sm={12} md={12} lg={6}>
      <img src='/logo.png' />
       <div style={{width:'60%'}}>
       <h3 style={{display:'flex',justifyContent:'center'}}>Do you have a passion for creative work? </h3>
       <ButtonGroup className="d-grid gap-2">
            <Button onClick={()=>{
              setregsterstarted(true)
              
            }} size='lg' variant='primary'>Register As Talent</Button>
            <Button size='lg' variant='secondary'>Show Your Talent</Button>
        </ButtonGroup>
       </div>
        
      </Col>
      <Col  style={{}} sm={12} md={12} lg={6}>
        <img src='/coder.jpg' width="100%" height="100%"/>

      </Col>
    </Row>
    {regsterstarted && <Agreement hide={setregsterstarted} show={regsterstarted}/>}
  </Container>
        
   
)
}

export default Start;