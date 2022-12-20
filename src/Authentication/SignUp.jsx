import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function SignUp(){

    const [logDatas, setLogDatas] = useState({email:'',phone:'',address:'',dob:'', password:'',confirm:'',profile:''})
    function getValues(vals){
        var {name, value} = vals.target;
        setLogDatas(prev => {
            return{
                ...prev,
                [name]: value,
            }
        })
    }
    function handleClick(){
        localStorage.setItem(logDatas.email, JSON.stringify(logDatas))          //saving the user details in localstorage
        console.log(logDatas)
        if(logDatas.password===logDatas.confirm){                               //confirm and password should be same for proceed to next step
            emailjs.send("service_u4b1n5v","template_5d59kuf",{                 //emailjs for sending the confimation mail
                to_email: logDatas.email,
                },'2ivqwepktUEzNazVV').then((response)=> window.location.href = "/",(error) => {
                    alert('Something Wrong with your Mail id')
                })   
        }
    }

    return(
        <div className="login" style={{top:'1rem'}}>
            <Typography variant="h3">Create your acount</Typography>
            <input 
                type='email' 
                placeholder='Email id' 
                name="email"
                value={logDatas.email}
                onChange={getValues} />
              <input 
                type='text' 
                placeholder='Phone no' 
                name="phone"
                value={logDatas.phone}
                onChange={getValues} />
            <input 
                type='text' 
                placeholder='Address' 
                name="address"
                value={logDatas.address}
                onChange={getValues} />
            <input 
                type='date' 
                placeholder='Date of Birth' 
                name="dob"
                value={logDatas.dob}
                onChange={getValues} />
            <input 
                type='password' 
                placeholder='Password'
                name="password"
                value={logDatas.password} 
                onChange={getValues} />
            <input 
                type='password' 
                placeholder='Confirm'
                name="confirm"
                value={logDatas.confirm} 
                onChange={getValues} />
            <input 
                type='file' 
                placeholder='profile' 
                name="profile"
                value={logDatas.profile}
                onChange={getValues} />
            <Button variant='contained' size="large" onClick={handleClick}>SignUp</Button>
        </div>
    )
}

export default SignUp;