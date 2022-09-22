import React, { useEffect, useRef,useState } from 'react';
import { Alert, Button, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import questiontoask from '../resources/inputs/talentregister';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import options from '../resources/lists';
import getUserGeolocationDetails from '../resources/detectlocation';
import contrycodes from '../resources/inputs/countrycodes';
import countrycodes from '../resources/inputs/countrycodes';
import { emailchecker, passwordchecker, validatenumber } from '../resources/inputs/checkers';


function Register(props) {
    let [curentstep, setcurentstep] = React.useState(1);
    let [loading, setloading] = React.useState(false);
    let [typing, settyping] = React.useState(false);

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
  let handlenext = () => {
      settyping(false)

    let clean=()=>{
     
      setloading(false)
      inputka.current.value=''
      inputka.current.focus()
      
    }
    if (inputka.current.name === 'email') {
      let isvalid=emailchecker(inputka.current.value) 
      if (!isvalid) {
        seterror('Email is not valid')
        clean()
        return;
      }
      else{
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
      let isvalid=validatenumber(inputka.current.value)
      if (!isvalid.isValid) {
        seterror('Phone number is not valid')
        clean()
        return;
      }
      else{
        setinformation({...information,phone:isvalid.phoneNumber})
        setcurentstep(prev=>prev + 1)
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
      let isvalid=inputka.current.value==8888
      if (!isvalid) {
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
    if (inputka.current.name == 'country') {
      alert(inputka.current.value)
      // dont allow russian users
      let isvalid=inputka.current.value!=='Russia'
      alert(isvalid)
      if (!isvalid) {
        seterror('sorry we do not allow russian users to register in our platform beacsue of the sanctions ') 
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
      id="basic-example "
      
      onChange={(e)=>{
        console.log('jkjh',e[0])
        // set information coutry
        setinformation({
          ...information,
          country: e[0]
        })
        console.log('hi',information.country)
      }}
      options={options}
      selected={information.coutry}
      aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={item.name=='otp'?'enter the otp':item.question}
          ref={inputka}
          
          type={item.type}
          required
          name={item.name}
          defaultSelected={information.country}
          onFocus={()=>{
            setinformation({
              ...information,
              country: ''
            })

          }}
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
          style={{
            height:'50px',
    
          }}
         
          
        />}
     
    {curentstep!==questiontoask.length &&  <Button type='submit'  style={{
            marginTop:'12px'
    
          }} onClick={handlenext} disabled={loading} >{loading?'checking ...':'Next'} </Button>}
      {curentstep===questiontoask.length && <Button style={{
            marginTop:'12px'
    
          }} type='submit' variant='success' onClick={()=>{
             handlenext()

      }} disabled={loading} >{loading?'submitting ...':'submit'}</Button>}
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