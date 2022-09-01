import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'


function Form() {
    let navigate = useNavigate();
    const [usernameReg, setUsernameReg] = useState("");
    const [shopnameReg, setShopnameReg] = useState("");
    
    const register = (e)=> {

      e.preventDefault();
      Axios.post("http://localhost:3002/register", {
        username: usernameReg,
        shopname: shopnameReg
      })
      .then((response) =>{
        alert("signed");
        console.log(response);
        navigate("/login");
      });
    };

  return (
    <div>
        <form onSubmit={register}>
        <label>Username</label>
        <input type="text" value={usernameReg} onChange={(e)=>{setUsernameReg(e.target.value)}} />
        <label>Shop Name</label>
        <input type="text" value={shopnameReg} onChange={(e)=>{setShopnameReg(e.target.value)}} />
        <input type="submit" value="Signup"/>
        </form> 
    </div>
  )
}

export default Form


