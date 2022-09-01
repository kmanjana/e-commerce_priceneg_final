import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Link, useNavigate } from "react-router-dom"
import '../styles/Single_shop_prods.css'
// import Button from 'react-bootstrap/Button'
import {BiRupee } from "react-icons/bi";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
import CardGroup from 'react-bootstrap/CardGroup'
import {Container,Row ,Card, Col, Button, Navbar,Form,FormControl} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'
import { FaSearch } from "react-icons/fa";

function Prod_By_Catg() {
    let navigate = useNavigate();
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
        getCatId(); 
      } , [] )

      const setSubCatId = (subcatgid) =>{
        console.log("subcatgid is "+ subcatgid);
        Axios.get("http://localhost:3002/getproducts/getproductsbysubcatg/"+subcatgid)
        .then((response)=>{
            let resp= response.data.result;
            console.log(resp);
            showProducts(resp);
        })
    
      }
      const [catg, setCatg] = useState();
    const getCatId = () =>{
        var catgId = localStorage.getItem("catg_Id");
        console.log(catgId);
        Axios.get("http://localhost:3002/getproducts/getproductsbycatg/"+catgId)
        .then((response)=>{
            let resp= response.data.result;
            console.log(resp);
            showProducts(resp);
            setCatg(catgId);
        })
      }
      console.log("catg " +catg);
      var opti=[];
      switch(catg){
        case '1' : 
        opti = [ { subcatg_name: "Bevarages", subcatg_id: 1 ,subcatg_img: "https://thumbs.dreamstime.com/b/bottles-assorted-global-soft-drinks-poznan-poland-may-drink-market-dominated-brands-few-multinational-companies-founded-96282438.jpg"},
                    { subcatg_name: "Dried fruits and Seeds", subcatg_id: 2, subcatg_img: "https://nutsexporters.com/wp-content/uploads/2020/06/d68a14e715e14692aa7e4bbe0d9e7b5c.w_1920h_497r_k-780x470.jpg" },
                    { subcatg_name: "Spices and Masalas", subcatg_id: 3,subcatg_img: "https://i.cdn.newsbytesapp.com/images/l253_33621637850970.jpg" }
                  ];
        break;
      case '2' : 
      opti = [ { subcatg_name: "Skincare", subcatg_id: 4, subcatg_img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-best-skincare-products-1628607809.png" },
                    { subcatg_name: "Haircare", subcatg_id: 5, subcatg_img: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_40/3416435/hair-products-tools-kr-2x1-tease-200930.jpg" },
                    { subcatg_name: "Makeup", subcatg_id: 6 ,subcatg_img: "https://assets.thehansindia.com/h-upload/2021/11/06/1120572-makeup.webp"}
                  ];
        break;
      case '3' : 
      opti = [ { subcatg_name: "Laundary Essentials", subcatg_id: 7,subcatg_img: "https://www.gannett-cdn.com/-mm-/7e5cadc652e15c78091f2643777c06cce3d2a364/c=222-0-4646-2500/local/-/media/2016/11/07/USATODAY/usatsports/Best-Detergent-TBRN-Hero.jpg" },
                    { subcatg_name: "Household Cleaners", subcatg_id: 8, subcatg_img: "https://i2-prod.gloucestershirelive.co.uk/incoming/article2388909.ece/ALTERNATES/s1200/1_Poundland-Promotion.jpg" },
                    { subcatg_name: "Air Freshners", subcatg_id: 9, subcatg_img: "https://image.made-in-china.com/2f0j00QeUVmGaZgcrj/Car-Air-Fresheners-Wholesale-From-China.jpg" }
                  ];
        break;
      default: 
      opti = [];  
            // options = [{name: datadisplay[i]["subcatg_name"], id: datadisplay[i]["subcatg_id"]}];
            
        
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
        console.log("name "+prod.p_name)
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
      <Form className="d-flex" style={{width:"50%",marginLeft:"25%",marginTop:"10px"}} onSubmit={search}>
    <FormControl type="search"  value={val} onChange={(e)=>{setVal(e.target.value)}} placeholder="Search for products..." style={{height:"40px",borderColor:"rgb(192 94 56 / 47%)"}} className="me-2" aria-label="Search" />
    <Button id='searchbutton' style={{margin:"0px", color:"rgb(192 94 56)", borderColor:"rgb(192 94 56)",backgroundColor:"white"}}><FaSearch/></Button>
  </Form><br></br>
    <div style={{backgroundColor:"rgb(243 234 218)"}}>
    <CardGroup style={{marginLeft:"4%"}}>
    {opti.map((opt => 
      <Card style={{border:"none",marginLeft:"1%",backgroundColor:"#f5edd952"}}><br></br>
      <Link to="/prodbycatg" style={{textDecoration:"none"}} onClick={()=>setSubCatId(opt.subcatg_id)}>
    <Card.Img variant="top" style={{borderRadius:"30% 30%",width:"60%",height:"80%", marginLeft:"20%"}} src={opt.subcatg_img} />
    <Card.Body>
      <Card.Title style={{textAlign:"center", fontWeight:"bold",color:"black"}}>{opt.subcatg_name}</Card.Title>
    </Card.Body>
    </Link><br></br>
  </Card>
    ))}
</CardGroup>
    </div>
    <br></br>
      <Row xs={2} md={4} className="g-4" style={{marginLeft:"30px", marginRight:"30px"}}>
  {products.map((product => 
    <Col>
      <Card key={product.pid}  className="box" style={{backgroundColor:"rgb(238 190 64 / 17%)",border: "1px solid #82837f73"}}>
        <Link to="/productdetail" onClick={()=>setProd(product)}style={{textDecoration:"none",color:"black"}}>
        <Card.Img variant="top" src={product.img}  /></Link>
        <Card.Body>
          <Card.Title style={{fontSize:"20px"}}>{product.p_name}</Card.Title>
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

export default Prod_By_Catg