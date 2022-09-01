

import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'
import '../styles/Loginpages.css';
// import image from './log.jpg';
import {Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const[password,setPassword]=useState("");
    
    const login = (e)=> {
      e.preventDefault();
     
      Axios.post("http://localhost:3002/login", {
        username: username,
        password:password
      })
      .then((response) =>{
        console.log(response.data);
        console.log(response);
        var shop_id=response.data.shopid;
        localStorage.setItem('shop_ID',shop_id);
      if(response.data.message!=="User doesn't exist"&& response.data.message!=="Password does not match")
        {alert("successful login")
        navigate("/")
        //  console.log(response.data.password);
        }
        else{

        
        if(response.data.message==="Password does not match")
        {
          alert("Wrong password!please try again");
          navigate("/logshop")
        }
        else
        {
          alert("Unauthorised  access!!Please register to continue!!!");
          navigate("/signup");
          
        }}
      })
      .catch((err)=>{
        console.log(err)
        alert('fail');
        console.log(err.respose)
        alert(err.respone.data.error.message)
      })
    };

  return (
    
    <div className='loginback' >
        
        {/* <div className='img'>
        <img src={image} alt="login pic"/>
     
    </div> */}
        <form onSubmit={login} className="borderboxlogin">
        <h2 className='formhead'>Welcome back,</h2>
        <input className='inputloginfont' placeholder="  &#xF007; username" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <br></br>
        
        <input  className='inputloginfont'  type="password" placeholder="&#xf023;  password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <br></br>

        <input  className='btn'  type="submit" value="Login" style={{backgroundColor:"#776a1d"}}/>
        <Link to="/Signup">NOT YET REGISTERED!!! GO TO REGISTRATION PAGE</Link><br></br>
        <Link to="/forgotpasswordshop">Forgot password?</Link>
        </form> 
    </div>
    
  )
}

export default Login

