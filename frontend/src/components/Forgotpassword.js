import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'
import '../styles/forgotpassword.css';
import {Link } from "react-router-dom";
function Forgotpassword()
{let navigate = useNavigate();
  const[email,setEmail]=useState("");
  const[recovery,setRecovery]=useState("");

const forgotpassword = (e)=> {
    e.preventDefault();
     
    Axios.post("http://localhost:3002/handleSubmits/forgotpassword", {
        email:email,
        recoveryque:recovery
})
.then((response) =>{
    console.log(response.data);
    console.log(response);
    
    
    if(response.data.message==="unauthorised access")
    {
        alert("invalid email/verification question,Register or input correct email to continue!!");
        navigate("/signup");
    }
    if(response.data.message==="authorised access")
    {  var user_id=response.data.user_id;
      var middle_name=response.data.middle_name;
      var first_name=response.data.firstname;
      var email=response.data.emails;
      var last_name=response.data.last_name;
      var recoveryque=response.data.recoveryques;
      var home_addr=response.data.home_addr;
      var phno=response.data.phno;
      
      localStorage.setItem('user_id',user_id);
      localStorage.setItem('middle_name',middle_name);
      localStorage.setItem('last_name',last_name);
      localStorage.setItem('first_name',first_name);
      localStorage.setItem('email',email);
      localStorage.setItem('recoveryque',recoveryque);
      localStorage.setItem('home_addr',home_addr);
      localStorage.setItem('phno',phno);
      alert("successful");
       navigate("/newlogin");
    }


})
.catch((err)=>{
    console.log(err)
    alert('fail');
    console.log(err.respose)
    alert(err.respone.data.error.message)
  })
};
return (
    
    <div className='forgotbody' >
        
    
        <form onSubmit={forgotpassword} className="borderboxlogin">
        <h2 className='forgothead'> User Confirmation Page</h2>
        <input className='inputloginfont' placeholder="Enter the mail address" type="email" value={email}
         onChange={(e)=>{setEmail(e.target.value)}} />
        <br></br>
        <input className='inputloginfont' placeholder="Enter the verification question" type="text" value={recovery}
         onChange={(e)=>{setRecovery(e.target.value)}} />
        <br></br>
        
        <input  className='btn'  type="submit" value="Verification check"/>
        </form>
        </div>
)}
export default Forgotpassword