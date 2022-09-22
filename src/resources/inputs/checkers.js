import {phone} from 'phone';

const countreis = require("../lists");


export const passwordchecker=(password)=>{
    // make sure the password is at least 8 characters long and contains at least one number and one letter
 
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
        return true;
    }
    else {
        return false;

    }
}
export const emailchecker=(email)=>{
    // make sure the email is valid
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
        return true;
    }
    else {
        return false;
    }
}
export const validatenumber=(number)=>{
    // check if the number is valid number can be greater than 10 upto 15 but not smaller than 10
   let n=phone(number)
   return n

    
    
    
}

export const detectuserlocation=()=>{
    // detect user location and return the location
    let location = window.navigator && window.navigator.geolocation
    if (location) {
        location.getCurrentPosition((position) => {
            return position
        }, (error) => {
            return null;
        })
    }


}


    