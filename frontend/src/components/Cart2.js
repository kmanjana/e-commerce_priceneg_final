import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faArrowLeftLong, faCartShopping, faPlus, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Container,Row ,Card, Col, Button} from 'react-bootstrap';
import "../styles/cart2.css"
import {Link, useNavigate} from "react-router-dom"

function Cart2() {

  let navigate= useNavigate();
  let [prods,setProducts]= useState([]);
  let [negprods,setNegProducts]= useState([]);
  let [order,setOrder]= useState([]);
  let index = 0;
  let index2 =0;
  let cart_price=0
  let disable
  var new_price =0
  var total_price=0;
  // const [total_price,setTotal]= useState("");
  // const [p_name,setProd_name]=useState("");
  // const [pid,setPid]= useState("")
  // const [user_id,setUserId]=useState("");
  // const [price,setPrice]= useState("")
  // const [qnty,setQnty]=useState("");
  // const [brand,setBrand]= useState("")

  useEffect( ()=>{
    prod_display()
    negprod_display()
    // total()

    refresh();
    setTimeout(function() {
      refresh()
    }, 35000);
  },[])

  const refresh =()=>{
    // prod_display();
    order_display();
    total();
  }

  const prod_display = ()=>{
    // setPid(localStorage.getItem("pid")) 
    // setUserId(localStorage.getItem("user_id"))
    // setQnty(localStorage.getItem("qnty")) 
    // setPrice(localStorage.getItem("price")) 

    // console.log("local",pid);
    Axios.post("http://localhost:3002/cart",{
      command: "display",
      user_id: localStorage.getItem("user_id"),
      negotiated:0
    }).then((response)=>{
      setProducts(response.data)
      console.log(response.data)
      // itemRemove();
      // card_display(prod)
    })
       
        // card_display(prod[i]);
      }
     
  const total = (price)=>{

    total_price = parseFloat(total_price)+parseFloat(price)

  }


  const removetocart= (prod)=>{
    console.log(prod.cart_id)
    if(window.confirm("Are you sure you want to remove this item?")){
    Axios.post("http://localhost:3002/removetocart",{
     cart_id: prod.cart_id
    }).then((response)=>{
      console.log(response)
      window.location.reload();
    })}
 }
 const discountprice1 = (prod) =>{
  var profit = prod.price - prod.minprice; 
  var qnty_profit = (prod.qty * prod.price) - (prod.qty * prod.minprice);
  var extra_profit = qnty_profit - profit;
  new_price = ((prod.qty * prod.price) - (extra_profit * 0.1)).toFixed(2);
  // console.log("new "+new_price)
  if(prod.qty >1){
    return <div>
    <span><div style={{textDecoration:"line-through", color:"grey",fontWeight:"300",textDecorationThickness: "0.01em"}} >{(prod.qty * prod.price).toFixed(2)}</div>
    <div style={{fontWeight:"500"}}>{new_price}</div></span>
  </div>
  }
  else if(prod.qty = 1){
    return <div style={{fontWeight:"500"}}>
    {new_price}
  </div>
  }
  
}

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => 
                                              <option>{start + idx}</option>)
}
//  const [qnty,setQuantity]=useState("default");

const setQt = (prod,qty) =>{
// console.log("qn" + qty)
Axios.put("http://localhost:3002/qtySelect",{
 cart_id: prod.cart_id,
 user_id: localStorage.getItem("user_id"),
 qnty: qty
}).then((response)=>{
  console.log(response)
  window.location.reload();
})
}

const setProd = (prod)=> {
  localStorage.setItem('product_Details',JSON.stringify(prod));
}
//---------------------------------------------
const buyNow = (pid)=>{

  localStorage.setItem("buyNow","cart")
  Axios.post("http://localhost:3002/block",{
    user_id: localStorage.getItem("user_id"),
    command: "cart"
   }).then((response)=>{
     
     console.log("blocked")
     // window.location.reload();
    //  refresh()
   })
   navigate('/buy')
 }
 const showOrder=(ord)=>{
    if(order.length==0){
      return <div>No Orders</div>
    }
    else{
      return <table className="table table-hover text-center table-responsive-sm caption-top" style={{marginLeft:"20px",marginRight:"10px",width:"95%"}}>
      <caption className='text-dark bg-light'>Your Orders</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ordered Product</th>
          <th scope="col">Product Name</th>
          <th scope="col">Date and Time</th>
          <th scope="col">Delivered</th>
          <th scope="col">More Details</th>
          
        </tr>
      </thead>
      <tbody>
        {
          order.map((ord =>

            < tr key={ord.order_id}>
              {/* {showOrder(ord)} */}
              <th scope="row">{++index2}</th>
              <td><img src={ord.img} style={{ width: '4rem' }} /></td>
              <td>{ord.p_name}</td>
              <td>{dateTime(ord.order_date)}</td>
              <td>{ord.delivered}</td>
              <td><button onClick={()=>localStorage.setItem('order_id',ord.order_id)}><Link to="/bill">View Details</Link></button></td>
            </tr >
          ))}
      </tbody>
    </table>
    }
    
  
 }
 const order_display=()=>{
  Axios.post("http://localhost:3002/orderlist",{
    command: "user",
    user_id: localStorage.getItem("user_id")
  }).then((response)=>{
    console.log(response.data)
    setOrder(response.data)
  })
}
 const dateTime=(s)=>{
  let d = new Date(s);
  return (d.toLocaleString('en-IN')) 
  // console.log(d.toUTCString())
}


 const shopping_cartdisp = ()=>{
   if(prods.length > 0){
    document.getElementById("shopcart").style.display = "block";
    // document.getElementById("shopspace").style.height = "350px";
    document.getElementById("full").style.height = "0px";
    document.getElementById("full").style.display = "none";
     return <div>
    <Container className='mt-2'>
      <Row className='mt-3'>
        <table className="table table-hover text-center table-responsive-sm caption-top">
          <caption className='text-dark bg-light'>Shopping Cart <FontAwesomeIcon icon={faCartShopping} /></caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              prods.map((prod =>
                    
                < tr key={prod.pid}>
                  <th scope="row">{++index}</th>
                  <th scope="row">
                    <img src={prod.img} style={{ width: '4rem' }} />
                  </th>

                  <td>
                  <Link to="/productdetail" onClick={()=>setProd(prod)}style={{textDecoration:"none",color:"black"}}>
                    {prod.p_name}<br></br>
                  <div style={{fontWeight:"200"}}>Sold by {prod.shop_name}</div>
                  </Link>
                  </td>
                  
                  <td>
                    {discountprice1(prod)}
                    {total(new_price)}
                  </td>
                <td>
                  <tr>
                  <td>
                  <select id="select" value={prod.qty} onChange={(e)=>{setQt(prod,e.target.value)}}  style={{fontWeight:"500"}}>
                      <option value="default" disabled hidden>{prod.qty}</option>
                    {range(1,prod.qnty)}
                    </select>
            
                  </td>
                  </tr>
                </td>
                  <td>
                    <button onClick={() => removetocart(prod)} className="btn btn-danger" style={{backgroundColor:"#a20d0d"}}>
                      <FontAwesomeIcon icon={faTrash} />
                      </button>
                  </td >
                </tr >
              ))}
          </tbody>
        </table>
      </Row>
      {/* <Row>
        <Col className="text-center">
          <h4>TOTAL: {total_price}</h4>
        </Col>
      </Row> */}
      </Container>
     </div>
   }
 }
 //------------------------------------------
const negprod_display = ()=>{
  Axios.post("http://localhost:3002/cart",{
    command: "display",
    user_id: localStorage.getItem("user_id"),
    negotiated:1
  }).then((response)=>{
    setNegProducts(response.data)
    console.log(response.data)
  })
} 
   
 const negprodcart_disp = ()=>{

  if(negprods.length > 0){
    
   document.getElementById("negcart").style.display = "block";
   document.getElementById("shopspace").style.height = "0px";
  //  document.getElementById("negspace").style.height = "350px";
   document.getElementById("full").style.height = "0px";
    document.getElementById("full").style.display = "none";
    return <div>
   <Container className='mt-2'>
    <Row className='mt-3'>
      <table className="table table-hover text-center table-responsive-sm caption-top">
        <caption className='text-dark bg-light'>Negotiated Products</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            negprods.map((negprod =>
               
              < tr key={negprod.pid}>
                <th scope="row">{++index}</th>
                <th scope="row">
                  <img src={negprod.img} style={{ width: '4rem' }} />
                </th>
                <td>{negprod.p_name}<br></br>
                <div style={{fontWeight:"200"}}>Sold by {negprod.shop_name}</div>
                  </td>
                <td>{discountprice1(negprod)}</td>
                {total(new_price)}
                {/* <td>{negprod.price}</td> */}
                {/* <td style={{textAlign:"center"}}>
                    {negprod.qty}
                </td> */}
                <td>
                  <tr>
                  <td>
                    <select id="select" value={negprod.qty} onChange={(e)=>{setQt(negprod,e.target.value)}}  style={{fontWeight:"500"}}>
                      <option value="default" disabled hidden>{negprod.qty}</option>
                    {range(1,negprod.qnty)}
                    </select>
                  </td>
                  </tr>
                </td>
                <td>
                  <button onClick={() => removetocart(negprod)} className="btn btn-danger" style={{backgroundColor:"#a20d0d"}}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td >
              </tr >
            ))}
        </tbody>
      </table>
    </Row>
    {/* <Row>
      <Col className="text-center">
        <h4>TOTAL: {total_price}</h4>
      </Col>
    </Row> */}
    </Container>
    </div>
  }
}

  return (
    <div style={{maxHeight:"1500px"}}>
  <div id = 'full' style={{height:"500px",textAlign:"center",paddingTop:"50px"}}>
    No items in cart!
  </div>
  <div className='cart-div' id='shopcart' style={{display:"none"}}>
      {shopping_cartdisp()}
      
  </div>
    <div id = "shopspace" ></div>
    <div className='cart-div' id = 'negcart' style={{display:"none"}}>
    {negprodcart_disp()}
    <div id = "negspace"></div>
    </div>
    <Row>
        <Col className="text-center">
          <h4>TOTAL: {total_price}</h4>
        </Col>
      </Row>
    <Row>
      <Col className="text-center">
        <button onClick={() => buyNow()} className='btn btn-success' style={{backgroundColor:"#e76022",border:"none"}}>Buy Now</button>
        </Col>
      </Row>
      <Row className='mt-3'>
        {showOrder()}
      </Row>
    </div>
    
    
  )
}

export default Cart2