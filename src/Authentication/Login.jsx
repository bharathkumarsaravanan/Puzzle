import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LoginPage(){

    const [logDatas, setLogDatas] = useState({email:'', password:''});
    const [validateData, setValidateData] = useState();

    function getValues(vals){
        var {name, value} = vals.target;
        setLogDatas(prev => {
            return{                         
                ...prev,
                [name]: value                                                                //getting data from input and save in variable 
            }
        })
        if(localStorage.getItem(logDatas.email)=== null){                                    //check the email and password is there in localstorage
            console.log(null)                                             
        }else{
            setValidateData(JSON.parse(localStorage.getItem(logDatas.email)));
        }
    }
    function handleClick(){
        console.log(validateData)
        console.log(logDatas);
        if(logDatas.email===validateData.email && logDatas.password===validateData.password){
            window.location.href = "/"+logDatas.email+"/home"                                   //if user is authenticated they will move into home page
        }else{
            alert('User not found')
        }
    }
    return(
        <div className="login">
            <Typography variant="h3">Login</Typography>
            <input 
                type='email' 
                placeholder='Email id' 
                name="email"
                value={logDatas.email}
                onChange={getValues} />
            <input 
                type='password' 
                placeholder='Password'
                name="password"
                value={logDatas.password} 
                onChange={getValues} />
            <Button variant='contained' size="large" onClick={handleClick}>Login</Button>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}
export default LoginPage;