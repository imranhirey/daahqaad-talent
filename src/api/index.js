import axios from "axios";

// set the base url to localhost:4000
const api = axios.create({
    baseURL: "http://localhost:4000",
})

class Api{
    registeruser=async(data)=>{
        const response = await api.post("/register",{data});
        return response.data;

    }
    isemailalreadyregistered=async(email)=>{
        let res=await api.post('/isexist/email',{email:email})
        return res
    }
    sendotpbyemail=async(email)=>{
        let res=await api.post('/sendotp/email',{email:email})
        return res
    }
    sendotpbynumber=async(number)=>{
        let res=await api.post('/sendotp/phonenumber',{number:number})
        return res
    }
    
    checkotp=async(email,otp)=>{
        let res=await api.post('/checkotp/email',{email:email,otp:otp})
        return res
    }
    checkotpnumber=async(number,otp)=>{
        let res=await api.post('/checkotp/number',{number:number,otp:otp})
        return res
    }
  

}


// export the api object
export default new Api();