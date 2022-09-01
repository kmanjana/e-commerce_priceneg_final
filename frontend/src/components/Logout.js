import React from 'react'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

function Logout() {
    let navigate = useNavigate();
    const logout= ()=>{
        localStorage.removeItem("shop_ID");
        localStorage.removeItem("catg_Id");
        localStorage.removeItem("brand_name");
        localStorage.removeItem("minprice");
        localStorage.removeItem("item");
        localStorage.removeItem("maxprice");
        localStorage.removeItem("final_price");
        localStorage.removeItem("round");
        localStorage.removeItem("user_id");
        localStorage.removeItem("quantity");
        localStorage.removeItem("first_Name");
        localStorage.removeItem("roundend");
        localStorage.removeItem("counteroffer");
        localStorage.removeItem("negotiation");
        localStorage.removeItem("discount");
        localStorage.removeItem("discount_given");
        localStorage.removeItem("product_Details");
        localStorage.removeItem("pid");
        localStorage.removeItem("qnty");
        localStorage.removeItem("price");
        navigate("/");
    }
    const gotoCart = ()=>{
      
      navigate("/cart2")
    }
  return (
    <div >
      <Button variant="contained" onClick={gotoCart} style={{float:"right",backgroundColor:"brown"}}>CART</Button>
      <Button variant="contained" onClick={logout} style={{float:"right",backgroundColor:"brown"}}>LOGOUT</Button>
    </div>
  )
}

export default Logout
