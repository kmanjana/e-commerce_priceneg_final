import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'
import '../styles/forgotpassword.css';
import {Link } from "react-router-dom";
function Forgotpasswordshop()
{let navigate = useNavigate();
        const[email,setEmail]=useState("");
        const[recovery,setRecovery]=useState("");
      
      const forgotpasswordshop = (e)=> {
          e.preventDefault();
          Axios.post("http://localhost:3002/forgotpasswordshop", {
            email:email,
            recoveryque:recovery
    })
    .then((response) =>{
        console.log(response.data);
        console.log(response);
        
        
        if(response.data.message==="unauthorised access")
        {
            alert("invalid email/verification question,Register or input correct email to continue!!");
            navigate("/Regisuser");
        }
        if(response.data.message==="authorised access")
        { var shop_name =response.data.shop_name;
          var adm_name=response.data.adm_name;
          var email=response.data.emails;
          var recoveryque=response.data.recoveryques;
          var shop_addr=response.data.shop_addr;
          var phno=response.data.phno;
          var shop_id=response.data.shop_id;
          localStorage.setItem('shop_name',shop_name);
          localStorage.setItem('adm_name',adm_name);
          localStorage.setItem('shop_id',shop_id);
          localStorage.setItem('email',email);
          localStorage.setItem('recoveryque',recoveryque);
          localStorage.setItem('shop_addr',shop_addr);
          localStorage.setItem('phno',phno);
          alert("successful");
           navigate("/newloginshop");
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
            
        
            <form onSubmit={forgotpasswordshop} className="borderboxlogin">
            <h2 className='forgothead'>Shopkeeper Confirmation Page</h2>
            <input className='inputloginfont' placeholder="enter the mail address" type="email" value={email}
             onChange={(e)=>{setEmail(e.target.value)}} />
            <br></br>
            <input className='inputloginfont' placeholder="enter the verification question" type="text" value={recovery}
             onChange={(e)=>{setRecovery(e.target.value)}} />
            <br></br>
            
            <input  className='btn'  type="submit" value="Verification check"/>
            </form>
            </div>
    )}
    export default Forgotpasswordshop
