
import React, { useEffect, useRef,useState } from 'react';
import { Alert, Button, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import questiontoask from '../resources/inputs/talentregister';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import options from '../resources/lists';
import getUserGeolocationDetails from '../resources/detectlocation';
import contrycodes from '../resources/inputs/countrycodes';
import countrycodes from '../resources/inputs/countrycodes';
import { emailchecker, passwordchecker, validatenumber } from '../resources/inputs/checkers';
import { registeruser } from '../handlers/registration';
import axios from 'axios';
import api from '../api';
import Otprequired from './modals/Otpmodal';


function Register(props) {
    let [curentstep, setcurentstep] = React.useState(1);
    let [loading, setloading] = React.useState(false);
    let [typing, settyping] = React.useState(false);
    let [phoneotprequired, setphoneotprequired] = React.useState(false);

    let [error, seterror] = React.useState('');
    let inputka=useRef(null)
    const [selected, setSelected] = useState([]);
    
console.log(curentstep) 
    let [information, setinformation] = React.useState({
        name: '',
        email: '',
        address:'',
        age:'',
        phone:'',
        country:[],
        password1: '',
        password2: '',
        otp: '',
    })
    useEffect(()=>{
      getUserGeolocationDetails()
      .then(data=>{
           setinformation({...information,country:[data.country_name]})
      })
    },[])
   
    let handlechange = (e) => {
      settyping(true)
      seterror('')
      setinformation({
          ...information,
          [e?.target?.name]: e?.target?.value
      })
  }
  let handlenext = async() => {
   
      settyping(false)

    let clean=()=>{
     
      setloading(false)
      inputka.current.value=''
      inputka.current.focus()
      
    }
    seterror('')
    if (inputka.current.props?.id === 'countries') {

       let isvalid=information.country[0]!=='Russia'
    
      if (!isvalid) {
        seterror('sorry we do not allow russian users to register in our platform beacsue of the sanctions ') 
        clean()
        return;
      }
      else{
        setcurentstep(prev=>prev + 1)
      }
    }
    if (inputka.current.name === 'email') {
      setloading(true)
       let res=await api.isemailalreadyregistered(information.email)
       if (res.data.status!='success')  {
        seterror('someting went wrong please try again later') 
        setloading(false)
        clean()
        return;
      }
      
      if (res.data.message!=false)  {
        seterror('email already exist') 
        setloading(false)
        clean()

        return;
      }
      let isvalid=emailchecker(inputka.current.value) 
      if (!isvalid) {
        seterror('Email is not valid')
        setloading(false)
        clean()
        return;
      }
      else{
        setloading(false)
        let res=await api.sendotpbyemail(information.email)
        console.log(res)
        setcurentstep(prev=>prev + 1)
      }
    }
    if (inputka.current.name === 'password2') {
      let isvalid=inputka.current.value===information.password1
      if (!isvalid) {
        seterror('your passwords do not match')
        clean()
        return;
      }
      else{
        setcurentstep(prev=>prev + 1)
      }
    }
    if (inputka.current.name === 'phone') {
      let res= await api.sendotpbynumber(information.phone)
     setphoneotprequired(true)
      let isvalid=validatenumber(inputka.current.value)
      if (!isvalid.isValid) {
        seterror('Phone number is not valid')
        clean()
        return;
      }
      else{
        setinformation({...information,phone:isvalid.phoneNumber})
       
      }
    }
     if (inputka.current.name === 'password1') {
      let isvalid=passwordchecker(inputka.current.value) 
      if (!isvalid) {
        seterror('password should contain at least 8 characters long and contains at least one number and one letter')
        clean()
        return;
      }
      else{
        setcurentstep(prev=>prev + 1)
      }
    }
    if (inputka.current.name === 'name') {
      let isvalid=inputka.current.value.length>4
      if (!isvalid) {
        seterror('name should be at least 5 characters long')
        clean()
        return;
      }
      else{
        setcurentstep(prev=>prev + 1)
      }
    }
    if (inputka.current.name === 'otp') {
      
      let isvalid=await api.checkotp(information.email,inputka.current.value)
      console.log(isvalid.data.status)
      if (isvalid.data.status=='error') {
        seterror('otp is not valid please check your email and try again')
        clean()
        return;
      }
      else{
        setcurentstep(prev=>prev + 1)
      }
    }
    if (inputka.current.name === 'age') {
      let isvalid=inputka.current.value>18
      if (!isvalid) {
        seterror('you must be at least 18 years ')
        clean()
        return;
      }
      else{
        setcurentstep(prev=>prev + 1)
      }
    }
   
   


   

    
      
  }

       
    return (
       <Container style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'


       }}>
        {phoneotprequired && <Otprequired setcurentstep={setcurentstep} information={information} popupmessage='we have sent 6 digit cod to your number please enter here to verify our number' popuptitle='Verify your number' show={phoneotprequired} setshow={setphoneotprequired} />}
         <Row style={{
                   

             }}>
                 <img src='/logo.png' />
                   

             </Row>
      
       
             <Row style={{
                    width: '80%',
                    height: '90%',
                    display: 'flex',
                    overflow: 'hidden',
                    justifyContent: 'center',

                    
             }}>
                <h1 style={{display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',}}>let's start with the basic information</h1>
                            
                  {questiontoask.filter((item)=>item.step===curentstep).map((item, index) => {
                      return(
                        <div key={item.step} style={{
                            width: '80rem',
                            height: '100%',
                            display: 'flex',
                            padding: '10px',
                            alignItems: 'center',
                            flexDirection: 'column',
                            margin: '10px',
                          
                        }}>
                            <h2>{item.question}</h2>
                           {/* boostrap inputs*/}
                           <div style={{
                            width: '800px',
                            height: '300px',
                            margin: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                           
                            flexDirection: 'column',

                           }}>
                           <InputGroup  style={{
                            marginBottom: '10px',
                           }} size="lg">
        
      </InputGroup>
      {item.name=='country'? <>
      <Typeahead
      style={{
        height:'50px',

      }}
      id="countries"
      
      onChange={(e)=>{
        console.log('jkjh',e[0])
        // set information coutry
        setinformation({
          ...information,
          country: e
        })
        console.log('hi',information.country[0])
      }}
      options={options}
      selected={information.country}
      aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={item.name=='otp'?'enter the otp':item.question}
          ref={inputka}
          
          type={item.type}
          required
          name={item.name}
          defaultSelected={information.country}
          

      
    />
      </>:<Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={item.name=='otp'?`Enter the 6-digit code that we sent to your email ${information.email}`:item.question}
          ref={inputka}
          type={item.type}
          required
          name={item.name}
          onChange={handlechange}
          value={information[item.name]}
          style={{
            height:'50px',
    
          }}
         
          
        />}
     
  <Button type='submit'  style={{
            marginTop:'12px'
    
          }} onClick={handlenext} disabled={curentstep==8?true:false} >{loading?'checking ...':'Next'} </Button>
          {curentstep!==1 && <Button onClick={()=>{
            setcurentstep(prev=>prev - 1)
          }} variant='link'>Go back</Button>}
      {curentstep===questiontoask.length && <Button style={{
            marginTop:'12px'
    
          }} type='submit' variant='success' onClick={async()=>{
            let isvalid=inputka.current.value===information.password1
           if (!isvalid) {
             seterror('your passwords do not match')
             inputka.current.value=''
             inputka.current.focus()
             return;
           }
           else
           {
            let res=await registeruser(information)
            console.log(res)
            if (res){
              alert('great you are now registered')

            }
            else{
              alert('something went wrong please try again')
            }
            
           }

      }}  >{loading?'submitting ...':'submit'}</Button>}
      <Alert style={{
          marginTop: '10px',

      }} variant='danger' show={error?true:false}>{error}</Alert>
     
                           </div>
                        {typing &&    <Spinner animation='grow'/>}

                        </div>
                    )
                  }
                    )}
                   
                
            
                </Row>

       </Container>
    );
}

export default Register;