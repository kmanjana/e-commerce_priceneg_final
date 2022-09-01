


import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'
import '../styles/Loginpages.css';
import {Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';  
// import {Container,Row,Col} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import 'font-awesome/css/font-awesome.min.css';

//import image from './lohh.jpg';
function Loguser() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const[password,setPassword]=useState("");
    
    const login = (e)=> {
      e.preventDefault();
      Axios.post("http://localhost:3002/handleSubmits/loguser", {
        email:email,
        password:password
      })
      .then((response) =>{
        
        console.log(response.data);
        console.log(response.data.first_name);
        var first_name=response.data.first_name;
        localStorage.setItem('first_name',first_name);
        var user_id=response.data.user_id;
        localStorage.setItem('user_id',user_id);

        navigate("/");
        if(response.data.message!=="Email not registered" && response.data.message!=="Password does not match")
       {alert("Successful Login");
      }
      else
      {if(response.data.message=="Password does not match")
        {
          alert("Wrong password!please try again");
          navigate("/loguser")
        }

        {
          alert("Unauthorised  access!!Please register to continue!!!");
          navigate("/Regisuser");
          
        }}
      })
    };

  return (
    
    
   
    <div className='loginback'>
      {/* <h1>USER LOGIN PAGE</h1> */}
      <br>
      </br>
      {/* <div className='img'>
        <img src={image} alt="login pic"/>
     
    </div> */}
    
        
       
        <form onSubmit={login} className="borderboxlogin">
       
       
      <h2 className='formhead'>Welcome back,</h2>
       
      
       
        <input className='inputloginfont'  placeholder=" &#xf0e0; Enter your email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <br></br>
        
        <input  className='inputloginfont'  type="password" placeholder="&#xf023; Enter your password"value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <br></br>
        
        <input  className='btn'  type="submit" value="Login" style={{backgroundColor:"#776a1d"}}/>
        <Link to="/Regisuser">NOT YET REGISTERED!!! GO TO REGISTRATION PAGE</Link><br></br>
        <Link to="/forgotpassword">Forgot password?</Link>
        
        
        </form> 
        </div>
    
    
    
  )
}

export default Loguser;

