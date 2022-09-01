import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Link } from "react-router-dom"
import '../styles/Single_shop_prods.css'
// import Button from 'react-bootstrap/Button'
import {BiRupee } from "react-icons/bi";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
import {Container,Row ,Card, Col, Button, Navbar,Form,FormControl} from 'react-bootstrap';
import Category from './Category'
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'
import { FaSearch } from "react-icons/fa";


function Prod_By_Brand() {

  const dispatch = useDispatch() 
  
    let [products , showProducts] = useState([]);
    let [disabled , showDisabled] = useState();
    
    const userLoggedin = ()=>{
      if(localStorage.getItem("user_id")){
        showDisabled(false)
      }
      else{
        showDisabled(true)
      }
    }


    useEffect( () =>{
      userLoggedin();
      getBrandName(); 
      } , [] )

    const getBrandName = () =>{
        var brandName = localStorage.getItem("brand_name");
        console.log(brandName);
        Axios.get("http://localhost:3002/getproducts/getproductsbybrand/"+brandName)
        .then((response)=>{
            let resp= response.data.result;
            console.log(resp);
            showProducts(resp);
        })
      }
      const setProd = (prod)=> {
        localStorage.setItem('product_Details',JSON.stringify(prod));
      }
      
      const addtoCart = (prod)=>{
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
        })
        // navigate('/cart2');
      }  
    
      const itemRemove = ()=>{
        localStorage.removeItem("pid");
        localStorage.removeItem("qnty");
        localStorage.removeItem("price")
      }

      const negotiate = (prod)=>{
        setProd(prod);
        Axios.post("http://localhost:3002/alreadyincart",{
          pid: prod.pid,
          userid: localStorage.getItem("user_id")
        }).then((response)=>{
          if(response.data.msg == "already in cart"){
            alert("Item is already in cart!")
          }
          else{
            localStorage.setItem("maxprice", prod.price)
            localStorage.setItem("minprice",prod.minprice)
            localStorage.setItem("negotiation", 1)
        const data = {
          command: "###nego",
          text: "Negotiate",
          pid: prod.pid
      }
      dispatch(chatbotActions.textQueryAction(data))
        openForm()
          }
          // card_display(prod)
        })
        
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

    const [val,setVal]= useState("")

  const search = (e)=>{
    e.preventDefault()
    console.log("val is "+ val)
    Axios.get("http://localhost:3002/search_allproducts/"+val)
    .then((response)=>{
      // console.log(response.data.result)
      showProducts(response.data.result)
    })
  }

  return (
    <div>  
      <Category/><br></br>
      <Form className="d-flex" style={{width:"50%",marginLeft:"25%",marginTop:"10px"}} onSubmit={search}>
    <FormControl type="search"  value={val} onChange={(e)=>{setVal(e.target.value)}} placeholder="Search for products..." style={{height:"40px",borderColor:"rgb(192 94 56 / 47%)"}} className="me-2" aria-label="Search" />
    <Button id='searchbutton' style={{margin:"0px", color:"rgb(192 94 56)", borderColor:"rgb(192 94 56)",backgroundColor:"white"}}><FaSearch/></Button>
  </Form><br></br>
      <Row xs={2} md={4} className="g-4" style={{marginLeft:"30px", marginRight:"30px"}}>
  {products.map((product => 
    <Col>
      <Card key={product.pid}  className="box" style={{backgroundColor:"rgb(238 190 64 / 17%)",border: "1px solid #82837f73",marginBottom:"0px",paddingBotton:"0px"}}>
        <Link to="/productdetail" onClick={()=>setProd(product)}style={{textDecoration:"none",color:"black"}}>
        <Card.Img variant="top" src={product.img}  /><br></br><br></br>
        <Card.Title style={{fontSize:"20px"}}>{product.p_name}</Card.Title></Link>
        <Card.Body>
          
          <Card.Subtitle>{product.brand}</Card.Subtitle>
          <Card.Text>
          <div className="text">
                    {/* <div className="rating_reviews">
                        <div className="rating">
                            <input type="radio" name="rating" value="5" id="5" />
                            <label htmlFor='5'>☆</label>
                            <input type="radio" name="rating" value="4" id="4" />
                            <label htmlFor='4'>☆</label>
                            <input type="radio" name="rating" value="3" id="3" />
                            <label htmlFor='3'>☆</label>
                            <input type="radio" name="rating" value="2" id="2" />
                            <label htmlFor='2'>☆</label>
                            <input type="radio" name="rating" value="1" id="1" />
                            <label htmlFor='1'>☆</label>
                        </div>
                        <Card.Text>4.7</Card.Text>
                        <Card.Text>32 reviews</Card.Text>
                    </div> */}
                    <div className="price" style={{paddingTop:"2%",paddingRight:"10%"}}>
                        <h5 style={{fontWeight:'bold'}}><BiRupee style={{fontSize: '23px'}}/>{product.price}</h5>
                        {/* <div className="qty">
                            <i onClick={DecBag}><FaMinus/></i>
                            <Card.Text>{addcart}</Card.Text>
                            <i onClick={AddCart}><FaPlus/></i>
                        </div> */}
                        <Button disabled={disabled} onClick={()=>negotiate(product)} style={{backgroundColor:"rgb(93 56 54)",border:"none",fontSize:"19px",marginRight:"0px"}}>Negotiate</Button>
                    </div>
                    
                    <Card.Body className="last_section" style={{marginTop:"0px"}}>
                      <Button disabled={disabled} style={{backgroundColor:"#c05e38"}}>Buy Now</Button>
                      <Button disabled={disabled} onClick={()=>addtoCart(product)} style={{backgroundColor:"#e07b3c"}}> Add to cart</Button>
                    </Card.Body>
                </div>
          </Card.Text>
        </Card.Body>
        
      </Card>
    </Col>
  ))}
</Row>
    </div>
  )
}

export default Prod_By_Brand
