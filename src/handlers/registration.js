import api from "../api"

let registeruser=async(data)=>{
    let res= await api.registeruser(data)
    if (res.status=='success'){
      return true
    }
    else{
      return false
    }
}



export{
    registeruser
}