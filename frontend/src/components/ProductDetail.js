import React, { useEffect, useState } from 'react'
import '../styles/ProductDetail.css'
import {Link,useNavigate } from "react-router-dom"
import {Row ,Card, Col, Button, Image} from 'react-bootstrap'
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'
// import { useNavigate } from 'react-router';
// import Button from 'react-bootstrap/Button'
// import { FaPlus } from "react-icons/fa";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row"
// import Image from 'react-bootstrap/Image'
import Category from './Category'
// import Button from 'react-bootstrap/Button'


function ProductDetail() {
    let [disabled , showDisabled] = useState();
    let [prods,setProducts]= useState([]);
    let navigate = useNavigate();
    let [cqty,setQty]=useState("")
    let [left,setLeft]=useState("")

    const dispatch = useDispatch() 
    const userLoggedin = ()=>{
      if(localStorage.getItem("user_id")){
        showDisabled(false)
      }
      else{
        showDisabled(true)
      }
    }
    useEffect( () =>{
      localStorage.setItem("negotiation",0)
        userLoggedin();
        other_prods();
        } , [] )

    function showProd(){
        let prod_details = localStorage.getItem('product_Details');
        if(prod_details){
            return JSON.parse(prod_details);
        }
        else{
            return []
        }
  } 
  const setBrandName = (brandname) =>{
    console.log("brandname is "+ brandname);
    localStorage.setItem("brand_name",brandname);

  }

  const other_prods = ()=>{
    const p_name = showProd().p_name
    const pid = showProd().pid
    Axios.post("http://localhost:3002/otherSeller",{
      pid: pid,
      p_name: p_name
    }).then((response)=>{
      setProducts(response.data)
      // console.log(prods[2].p_name)
      // card_display(prod)
    })
  }

  const negotiate = ()=>{
    Axios.post("http://localhost:3002/bufferItem",{
      pid: showProd().pid,
      qnty:showProd().qnty
    }).then((response)=>{
      console.log("great",response.data.left) 
      setLeft(response.data.left)
      setQty(response.data.qty)
      let signal = response.data.signal
    if(signal==1){
      alert("Cannot negotiate!")
    }
    else{
      Axios.post("http://localhost:3002/alreadyincart",{
      pid: showProd().pid,
      userid: localStorage.getItem("user_id")
    }).then((response)=>{
      if(response.data.msg == "already in cart"){
        alert("Item is already in carttttt!!")
      }
      else{
        localStorage.setItem("maxprice", showProd().price)
        localStorage.setItem("minprice",showProd().minprice)
        localStorage.setItem("negotiation", 1)
    const data = {
      command: "###nego",
      text: "Negotiate",
      pid: showProd().pid
  }
  dispatch(chatbotActions.textQueryAction(data))
  console.log("name "+showProd().name)
    openForm()
      }
      
    })
    }})
    
  }

  const openForm = () =>{
    document.getElementById("notif").style.display = "none";
    document.getElementById("chat-wrapper").style.minHeight= "600px";
    document.getElementById("chat-wrapper").style.opacity= "1";
    document.getElementById("chat-wrapper").style.transform= "translate3d(0px, 0px, 0px) scale(1, 1)";
    document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in"; 
    document.getElementById("open").style.height= "60px"; 
    document.getElementById("open").style.bottom= "25px"; 
    document.getElementById("open").style.width= "60px"; 
    document.getElementById("image").style.height= "40px"; 
    document.getElementById("image").style.width= "40px"; 
    document.getElementById("image").style.paddingBottom= "6px"; 
    document.getElementById("open").style.animation= "none"; 
    // console.log("hi");
}
  const addtoCart = (prod)=>{
    Axios.post("http://localhost:3002/bufferItem",{
      pid: prod.pid,
      qnty:prod.qnty
    }).then((response)=>{
      console.log("great",response.data.left) 
      setLeft(response.data.left)
      setQty(response.data.qty)
      let signal = response.data.signal
    if(signal==1){
      alert("Cannot add to cart")
    }
    else{
      Axios.post("http://localhost:3002/cart",{
        command: "insert",
        pid: prod.pid,
        user_id:localStorage.getItem("user_id"),
        qnty: 1,
        price:prod.price,
        negotiated: 0
      }).then((response)=>{
        // setProducts(response.data)
        if(response.data.msg == "Item already in cart"){
          alert("Item is already in cart! Added one more!");
        }
        else if (response.data.msg == "Negotiated item already in cart"){
          alert("This item's price was previously negotiated!")
        }
        else{
          alert("Item added to cart successfully!");
        }
        
        console.log(response.data)
        // card_display(prod)
      })
    }})

    
    
    
    // navigate('/cart2');

  } 
  const setProd = (prod)=> {
    localStorage.setItem('product_Details',JSON.stringify(prod));
  }
  return (
    <div>
        <Category/>
        <Row className='.g-0'>
            <Col md={5}><Image src={showProd().img} fluid="true" className="imgstyle" style={{height:"40rem",width:"39rem"}} alt='Not available'/></Col>
            <Col style={{fontFamily:"'Poppins', sans-serif"}} md={4}>
                   <h2 className='prodname'>{showProd().p_name}</h2>
                   <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName(showProd().brand)}>Visit {showProd().brand} Store</Link>
                   <br></br><br></br><br></br>
                   <Row>
                       <Col className='title'>Price</Col>
                       <Col>{showProd().price}</Col>
                   </Row>
                   <Row>
                       <Col className='title'>Brand</Col>
                       <Col>{showProd().brand}</Col>
                   </Row>
                   <Row>
                       <Col className='title'>Category</Col>
                       <Col>{showProd().catg_name}, {showProd().subcatg_name}</Col>
                   </Row>
                   <Row>
                       <Col className='title'>Sold by</Col>
                       <Col>{showProd().shop_name}</Col>
                   </Row>
                   <br></br>
                   <Row>
                       <Col className='title'>About this item</Col><br></br>
                    </Row>
                       <pre style={{whiteSpace: "pre-wrap"}}>{showProd().description}</pre>
                       <Row>
                       <Col md={2}><Button disabled={disabled} onClick={negotiate} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate</Button></Col>
                       <Col md={6}><Button disabled={disabled} onClick={()=>addtoCart(showProd())} style={{backgroundColor:"#e07b3c",border:"none"}}>Add to Cart</Button></Col>
                       </Row>
                       
                       
            </Col >
            <Col className='p-3 mb-5 bg-white rounded mx-auto' md={3} >
                 <Card className="box" >
                   <Card.Header>Other Sellers on ShopHunt</Card.Header>
                   {prods.map((prod=>
                   <div>
                      <Link to="/productdetail" onClick={()=>setProd(prod)}style={{textDecoration:"none",color:"black"}}>
                    <Card.Body>
                      
                    <Card.Title>₹ {prod.price}</Card.Title> 
                    
                    <Card.Subtitle>Sold by: {prod.shop_name} </Card.Subtitle>
                    <Card.Text>
                      <Row>
                      <Card.Body className='last_section' style={{marginTop: "0px"}}>
                      {/* <Button disabled={disabled} onClick={negotiate} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate</Button> */}
                      <Button disabled={disabled} onClick={()=>addtoCart(prod)} style={{backgroundColor:"#e07b3c"}}>Add to Cart</Button>
                     </Card.Body>
                     </Row>
                    </Card.Text>
                  </Card.Body>
                  </Link>
                   </div>
                   
                    ))}
                   
                 </Card>
            </Col>
        </Row>
      
    </div>
  )
}

export default ProductDetail

