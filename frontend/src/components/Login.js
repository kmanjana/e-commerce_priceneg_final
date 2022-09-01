import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'


function Login() {
    let navigate = useNavigate();
    const [usernameLog, setUsernameLog] = useState("");
    
    const login = (e)=> {
      e.preventDefault();
      // alert(`The name you entered was: ${usernameLog}`)
      Axios.post("http://localhost:3002/login", {
        username: usernameLog
      })
      .then((response) =>{
        console.log(response);
        var shop_id=response.data.shopid;
        localStorage.setItem('shop_ID',shop_id);
        // alert('sucesss');
        navigate("/single_shop_prods");
      })
      .catch((err)=>{
        console.log(err)
        alert('fail');
        console.log(err.respose)
        alert(err.respone.data.error.message)
      })
    };

  return (
    <div>
        <form onSubmit={login}>
        <label>Username</label>
        <input type="text" value={usernameLog} onChange={(e)=>{setUsernameLog(e.target.value)}} />
        <input type="submit" value="Login"/>
        </form> 
    </div>
  )
}

export default Login

