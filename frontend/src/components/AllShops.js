import React, {useEffect,useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container,Row ,Card, Col, Button, Navbar,Form,FormControl} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom"
// import '../styles/displayProd.css'
// import { Crefresh } from './Navbar'
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'
import { FaSearch, FaWindows } from "react-icons/fa";

function AllShops() {

  const dispatch = useDispatch() 

  let [prods,setProducts]= useState([]);
  let navigate = useNavigate();
  let [disabled , showDisabled] = useState();
    
    const userLoggedin = ()=>{
      if(localStorage.getItem("user_id")){
        showDisabled(false)
      }
      else{
        showDisabled(true)
      }
    }

  useEffect( ()=>{
    
    userLoggedin();
    prod_display()
    shops();
    getShopDetails()
  },[])


  const prod_display = ()=>{
    const shopid = localStorage.getItem("allshop_shopid");
    Axios.post("http://localhost:3002/shopProd",{
      shopid: shopid 
    }).then((response)=>{
      setProducts(response.data.result)
      console.log(response.data.result)
    })
    
        // card_display(prod[i]);
      
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

  const negotiate = (prod)=>{
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
    Axios.post("http://localhost:3002/search_inshop/",{
      val:val,
      shopid: localStorage.getItem("allshop_shopid")
    })
    .then((response)=>{
      // console.log(response.data.result)
      setProducts(response.data.result)
    })
  }
  const [shps,showShops]= useState([]);

  const shops = () =>{
    Axios.get("http://localhost:3002/allshops")
    .then((response)=>{
        showShops(response.data.result)
       console.log(response.data.result)
        // card_display(prod)
      })
      
  }
  
    const setShopId = (shopid)=> {
      // console.log("shop "+ shopid)
      localStorage.setItem("allshop_shopid", shopid)
      window.location.reload();
    }

    const [shopname, setShopName]=useState('')
    const [shopaddr, setShopAddr]=useState('')
    const getShopDetails = ()=>{
      
      Axios.post("http://localhost:3002/getshopd",{
        shopid:localStorage.getItem("allshop_shopid")
      })
      .then((response)=>{
        setShopName(response.data.result[0].shop_name)
        setShopAddr(response.data.result[0].shop_addr)

        //   showShops(response.data.result)
         console.log(response.data.result[0].shop_name)
          // card_display(prod)
        })
    }
    const [sel,setsel]= useState("default")
  return (
    <div>
      

      <div>
      <Form className="d-flex" style={{width:"60%",marginLeft:"15%",marginTop:"10px"}} onSubmit={search}>
      <select value={sel} onChange={(e)=>{setShopId(e.target.value);setsel()}} style={{borderColor:"rgb(192 94 56 / 57%)" ,backgroundColor:"rgb(191 141 151 / 8%)"}}>
              <option value="default" disabled hidden>Shops in ShopHunt</option>
            {shps.map((shp =>
              <option  value = {shp.shop_id}>
              {shp.shop_name}
              </option>
            ))}
            </select>
        <FormControl type="search"  value={val} onChange={(e)=>{setVal(e.target.value)}} placeholder="Search for products in this shop..." style={{height:"40px",borderColor:"rgb(192 94 56 / 47%)"}} className="me-2" aria-label="Search" />
        <Button id='searchbutton' style={{margin:"0px", color:"rgb(192 94 56)", borderColor:"rgb(192 94 56)",backgroundColor:"white"}}><FaSearch/></Button>
      </Form>
      
      </div> <br></br>
      <div style={{textAlign:"center", fontWeight:"bold",fontSize:"40px"}}>{shopname}</div>
      <div style={{textAlign:"center", fontWeight:"200",fontSize:"20px"}}>{shopaddr}</div>
      <br></br>
<div class="grid" style={{position: "relative", minHeight: "650px"}}>
      <div style={{fontFamily:"serif",fontWeight: "bold", fontSize:"24px", borderRadius:"25px" }}>Showing Results for "{localStorage.getItem("item")}" ({prods.length})
      </div>
      {/* <Container className='p-4'> */}
        <Row xs={2} md={4} className="g-4" style={{marginLeft:"30px", marginRight:"30px"}}>
        {prods.map((prod=>
        <div>
          <Col>
            <Card key={prod.pid} className="box" style={{backgroundColor:"rgb(238 190 64 / 17%)",border: "1px solid #82837f73",marginBottom:"0px",paddingBotton:"0px"}}>
              {/* <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}> */}
              <Link to="/productdetail" onClick={()=>setProd(prod)}style={{textDecoration:"none",color:"black"}}>
            <Card.Img  variant="top" src={prod.img} /></Link>
            {/* </div> */}
            {/* <Card.Body > */}
              {/* <div class="card-text-body" > */}
              <Card.Body>
              <Link to="/productdetail" onClick={()=>setProd(prod)}style={{textDecoration:"none",color:"black"}}>
                
              <Card.Title>{prod.p_name}</Card.Title>
              <Card.Subtitle style={{marginTop:"10px"}}>Sold by {shopname}</Card.Subtitle>
              </Link>

            <Card.Subtitle>
                <Col>{prod.subcatg_name}</Col>
              </Card.Subtitle>
            <Card.Text>
            <Row md={2}  style={{margin:"2px"}}>
            <Col>₹{prod.price}</Col>
            <Col md={{offset: -2}}><Button disabled={disabled} onClick={()=>negotiate(prod)} style={{backgroundColor:"rgb(93 56 54)",border:"none",fontSize:"19px"}}>Negotiate</Button></Col>
            </Row>
              
            <Card.Body className='last_section' style={{marginTop: "0px"}}>
            <Button disabled={disabled} style={{backgroundColor:"#c05e38", border: "none"}}>Buy Now</Button>
            <Button disabled={disabled} onClick={()=>addtoCart(prod)} style={{backgroundColor:"#e07b3c"}}>Add to Cart</Button>
            </Card.Body>
            </Card.Text>
            
              {/* </div> */}
            </Card.Body>
            </Card>
          </Col>
        </div>
          ))}
          </Row>
      {/* </Container> */}
      
    </div>
    </div>
    
  )
}

export default AllShops