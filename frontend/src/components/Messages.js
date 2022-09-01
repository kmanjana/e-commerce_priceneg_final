import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Container,Row ,Card, Col, Button} from 'react-bootstrap';
import Axios from 'axios'

const Messages = () => {


    const messages = useSelector(state => state.chatbot.messages)
    const [butres , setButres] = useState("")
    const [butres1 , setButres1] = useState("")
    const [butres2 , setButres2] = useState("")
    const [endneg , endneg_button] = useState("")
    const [butcounterless , setButcounterless] = useState("")

  const addtocart= (fp)=>{
    let prod_details = JSON.parse(localStorage.getItem('product_Details'))
    console.log("h")
    Axios.post("http://localhost:3002/cart",{
      command: "insert",
      pid: prod_details.pid,
      user_id:localStorage.getItem("user_id"),
      qnty: 1,
      price:fp,
      negotiated:1
    }).then((response)=>{
      // setProducts(response.data)
    //   alert("Item added to cart successfully!");
      console.log(response.data)
      // card_display(prod)
    })
    console.log("response")
  }
    const firstbuttonpress = (message) =>{
        // var difference = message.text - message.useroffer;
        var maxpr = localStorage.getItem("maxprice")
        var minpr = message.minprice
        var diff = (maxpr- message.minprice)/2
        var new_acceptable_minp = parseInt(minpr) + parseInt(diff)
        console.log(message.useroffer )
       // window.location.reload(false);
       if(butres1 == '1'){
           document.getElementById("end1").style.display = "block";
           document.getElementById('buttonstyyes1').setAttribute("disabled","disabled");
           document.getElementById('buttonstyno1').setAttribute("disabled","disabled");
           document.getElementById("buttonstyyes1").style.backgroundColor = "grey";
           document.getElementById("buttonstyno1").style.backgroundColor = "grey";

           var final_price = localStorage.getItem("counteroffer");
           localStorage.setItem("final_price",final_price);
           localStorage.removeItem("round")
           localStorage.removeItem("counteroffer")
           localStorage.setItem("negotiation",0)
           // setButres("")
           return <div>
            <div class="messages_text_df">
           Item added to cart!
           {/* {
           setTimeout(function() {
            window.location.reload()
          }, 2000)} */}
          </div>
          <div id="viewcart">
          <Link to="/cart2">View Cart</Link>
          </div>
       
       </div>
       }
       else if (butres1 == '0' && message.useroffer >= new_acceptable_minp){
           document.getElementById("end1").style.display = "block";
           document.getElementById('buttonstyyes1').setAttribute("disabled","disabled");
           document.getElementById('buttonstyno1').setAttribute("disabled","disabled");
           document.getElementById("buttonstyyes1").style.backgroundColor = "grey";
           document.getElementById("buttonstyno1").style.backgroundColor = "grey";

           // localStorage.removeItem("round")
           // localStorage.removeItem("counteroffer")
           // setButres("")
       return <div>
           <div class="messages_text_df">
           Dear customer! You can avail this product at Rs {message.useroffer}.<br></br>
            Do you want to proceed?<br></br>
            <span>
                <button  onClick={()=>{setButres2(1);addtocart(message.useroffer)}} value={butres2} id="buttonstyyes2" >Yes</button>
            <button  onClick={()=>setButres2(0)} value={butres2} id="buttonstyno2" >No</button>
            </span>
           </div>
            <div id="end2"  style={{display:"none", marginTop:"10px"}}>
                {buttonpress2(message)}
            </div>
       </div>
       }
       else if (butres1 == '0' && message.useroffer < new_acceptable_minp){
        document.getElementById("end1").style.display = "block";
        document.getElementById('buttonstyyes1').setAttribute("disabled","disabled");
        document.getElementById('buttonstyno1').setAttribute("disabled","disabled");
        document.getElementById("buttonstyyes1").style.backgroundColor = "grey";
        document.getElementById("buttonstyno1").style.backgroundColor = "grey";

        // localStorage.removeItem("round")
        // localStorage.removeItem("counteroffer")sounds
        // setButres("")
    return <div class="messages_text_df">
         Dear customer! Your chance for negotiation is now over!
    </div>
    }
       else{
           return
       }
       
       
   }
    const buttonpress = (msg) =>{
        // var round = localStorage.getItem("round");
        console.log("r"+msg.round)
        // window.location.reload(false);
        if(butres == '1'){
            
            document.getElementById("end").style.display = "block";
            document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes").style.backgroundColor = "grey";
            document.getElementById("buttonstyno").style.backgroundColor = "grey";

            var final_price = localStorage.getItem("counteroffer");
            localStorage.setItem("final_price",final_price);
            localStorage.removeItem("round")
            localStorage.removeItem("counteroffer")
            localStorage.setItem("negotiation",0)

            return <div>
                <div class="messages_text_df">
                Item added to cart! &nbsp;
                </div>
            
            {/* {
           setTimeout(function() {
            window.location.reload()
          }, 2000)} */}
          <div id="viewcart">
          <Link to="/cart2">View Cart</Link>
          </div>
          
        </div>
        }
        else if (butres == '0' && msg.round == 4){
            console.log("haii")
            document.getElementById("end").style.display = "block";
            document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes").style.backgroundColor = "grey";
            document.getElementById("buttonstyno").style.backgroundColor = "grey";

            // localStorage.removeItem("round")
            // localStorage.removeItem("counteroffer")
            // setButres("")
            return <div class="messages_text_df">
             Dear customer! Your chance for negotiation is now over!
        </div>
        }
        else if (butres == '0' && msg.round < 4){
            document.getElementById("end").style.display = "block";
            document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes").style.backgroundColor = "grey";
            document.getElementById("buttonstyno").style.backgroundColor = "grey";

            return <div class="messages_text_df">
             Dear customer! Please enter a price!
        </div>
        }
        else{
            return
        }
        
        
    }
    //at round end
    const buttonpress2 = (message) =>{  
        // window.location.reload(false);
        if(butres2 == '1'){
            console.log("yes")
            document.getElementById("end2").style.display = "block";
            document.getElementById('buttonstyyes2').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno2').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes2").style.backgroundColor = "grey";
            document.getElementById("buttonstyno2").style.backgroundColor = "grey";

            localStorage.setItem("final_price",message.useroffer);
            localStorage.removeItem("round")
            localStorage.removeItem("counteroffer")
            localStorage.setItem("negotiation",0)
            // setButres("")
            
            return <div >
                <div class="messages_text_df">
                Item added to cart!
                </div>
            
            {/* {
           setTimeout(function() {
            window.location.reload()
          }, 2000)} */}
          <div id="viewcart">
          <Link to="/cart2">View Cart</Link>
          </div>
        </div>
        }
        else if (butres2 == '0'){
            console.log("haii")
            document.getElementById("end2").style.display = "block";
            document.getElementById('buttonstyyes2').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno2').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes2").style.backgroundColor = "grey";
            document.getElementById("buttonstyno2").style.backgroundColor = "grey";


            // localStorage.removeItem("round")
            // localStorage.removeItem("counteroffer")
            // setButres("")
            return <div class="messages_text_df">
             Dear customer! Your chance for negotiation is now over!
        </div>
        }
        else{
            return
        }
        
        
    }
    const item_display = (message)=>{
        let df_intent = message.intent
        localStorage.setItem("item",message.item)
        if(df_intent== "product_search"){
            return <button type='submit' class="messages_text_df" style={{cursor:"pointer",border:"none"}}>
                <Link to="/products">{message.item}</Link>
            </button>
        }
        // if(df_intent== "accept_negprice"){
        //     return <div>
        //         <span>
        //         <button  onClick={()=>buttonRes(1)}>Yes</button>
        //     <button type='submit' onClick={()=>buttonRes(0)}>No</button>
        //     </span>
        //         </div>
            
        // }no
    }
    const pricedisplay = (msg) =>{

            var finalprice = localStorage.getItem("counteroffer");
        return<div >
            <div class="messages_text_df">
            Are you sure you want to proceed with Rs {finalprice}?
            <br></br>
            <span>
                <button  onClick={()=>{setButres(1);addtocart(finalprice)}} value={butres} id="buttonstyyes">Yes</button>
            <button  onClick={()=>setButres(0)} value={butres} id="buttonstyno">No</button>
            </span>
            </div>
            <div id="end"  style={{display:"none", marginTop:"10px"}}>
                {buttonpress(msg)}
            </div>
            
        </div>

        
    }
    const endnegbuttonpress = () =>{
        if(endneg=='1'){
            document.getElementById("endneg").style.display = "block";
            document.getElementById('buttonstyyes2').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno2').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes2").style.backgroundColor = "grey";
            document.getElementById("buttonstyno2").style.backgroundColor = "grey";
            localStorage.setItem("negotiation",0)
            
            return <div>
                Negotiation ended!
            </div>
        }
        else if (endneg=='0'){
            document.getElementById("endneg").style.display = "block";
            document.getElementById('buttonstyyes2').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno2').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes2").style.backgroundColor = "grey";
            document.getElementById("buttonstyno2").style.backgroundColor = "grey";
            return <div>
                Dear Customer! Please enter a price!
            </div>
        }
    }

    const counterofferless = (msg) => {
        var m = msg.text - msg.useroffer
        console.log( " m is "+m)
        if(msg.text<msg.useroffer || m<1|| msg.text>msg.maxprice){
            return <div>
                <div  class="messages_text_df">
                Sounds great! You can avail this product at Rs {msg.useroffer}.<br></br>
            Do you want to proceed?<br></br>
            <span>
                <button  onClick={()=>{setButcounterless(1);addtocart(msg.useroffer)}} value={butcounterless} id="butcntlessyes" >Yes</button>
            <button  onClick={()=>setButcounterless(0)} value={butcounterless} id="butcntlessno" >No</button>
            </span></div>
            <div id="cntless" class="messages_text_df" style={{display:"none", marginTop:"10px"}}>
                {counterless(msg)}
            </div>
            </div>
        }
        else{
            if(msg.round < 3){
                return <div class="messages_text_df" >How about Rs {msg.text} ?</div>
   
            }
            else if(msg.round == 3){
                return <div>
                <div class="messages_text_df" >How about Rs {msg.text} ?</div>
                <div class="messages_text_df" style={{marginTop:"10px"}}>Dear Customer! Next round will be the final negotiation round<br></br></div>
            </div>
            }
            else if(msg.round == 4){
                return <div>
                     <div class="messages_text_df" style={{display:"block"}}>How about Rs {msg.text} ?<br></br>
                        <span>
                            <button  onClick={()=>{setButres1(1); addtocart(msg.text)}} value={butres1} id="buttonstyyes1" >Yes</button>
                            <button  onClick={()=>setButres1(0)} value={butres1} id="buttonstyno1">No</button>
                        </span>
                        </div>
                        <div id="end1"  style={{display: "none" ,marginTop:"10px"}}>
                       {firstbuttonpress(msg)}
                       </div>
                </div>
            }
            
        }
    }
const counterless = (msg) => {

  console.log("r"+msg.round)

  if(butcounterless == '1'){
      
      document.getElementById("cntless").style.display = "block";
      document.getElementById('butcntlessyes').setAttribute("disabled","disabled");
      document.getElementById('butcntlessno').setAttribute("disabled","disabled");
      document.getElementById("butcntlessyes").style.backgroundColor = "grey";
      document.getElementById("butcntlessno").style.backgroundColor = "grey";

      var final_price = localStorage.getItem("counteroffer");
      localStorage.setItem("final_price",final_price);
      localStorage.removeItem("round")
      localStorage.removeItem("counteroffer")

      return <div>
      Item added to cart!
  </div>
  }
  else if (butcounterless == '0'){
      document.getElementById("cntless").style.display = "block";
      document.getElementById('butcntlessyes').setAttribute("disabled","disabled");
      document.getElementById('butcntlessno').setAttribute("disabled","disabled");
      document.getElementById("butcntlessyes").style.backgroundColor = "grey";
      document.getElementById("butcntlessno").style.backgroundColor = "grey";

      return <div>
       Dear customer! Your chance for negotiation is now over!
  </div>
  }
  else{
      return
  }
    }

    // ..--------------------------------------------------------------------
    const displayMessage = (message, index)=>{
        if(message.speak == "user"){
            return  <div key={index} class ="messages_user">
                        <div class ="messages_text_user">{message.text}</div>
                    </div>
        }
        else if (message.speak == "nego"){
            var proddetails = JSON.parse(localStorage.getItem("product_Details"));
            var quanty = proddetails.qnty;
            return <div>
                <div key={index} class="messages_neg">
                        <div class="messages_text_neg">
                            <Card className='box' key={message.pid}>
                            <Card.Header className="negneg" style={{fontSize: "14px", fontWeight: "bolder", fontFamily:"serif", backgroundColor:"rgb(236 216 203)", borderTopRightRadius: "0.8rem",
    borderTopLeftRadius: "0.8rem"}}>
                                {message.p_name}
                            </Card.Header>
                            <Card.Img  variant="top" src={message.img} style={{ maxWidth: "190px"}}/>
                            <Card.Body style={{ fontFamily: "serif", backgroundColor:"rgb(236 216 203)",borderBottomRightRadius: "0.8rem"}}>
                            
                            <Card.Title>₹ {message.price}</Card.Title>
                            <Card.Subtitle>{message.brand} </Card.Subtitle>
                            <Card.Text style={{fontSize: "16px", textAlign: "left"}}>Sold by: {message.shop_name}</Card.Text>
                            </Card.Body>
                            </Card>
                        </div>
                        <div class="messages_text_df" style={{marginTop:"10px"}}>
                            {/* {howmuchquantity(quanty)} */}
                            You can now start the negotiation!
                        </div>
                        
                    </div>
                    
            </div>
             
        }

        else if (message.speak =="bot" && message.command =="useroffer_greaterthan_maxprice"){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">Hey there! You are making an offer that is higher than the actual price!</div>

                </div>
                <div class="messages_text_df">Please make a valid offer!</div>
            </div>
        }
        else if (message.speak =="bot" && message.counter == "no" && message.item == 'less' && (localStorage.getItem("negotiation") == "1")){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">{message.text}</div>
                </div>
            </div>
        }
    
        else if (message.speak == "bot" && message.endneg == "yes" && message.intent != "accept_negprice" && message.intent!="lessthanminprice"){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">Do you want to end the negotiation?<br></br>
                        <span>
                <button  onClick={()=>endneg_button(1)} value={endneg} id="buttonstyyes2" >Yes</button>
            <button  onClick={()=>endneg_button(0)} value={endneg} id="buttonstyno2" >No</button>
            </span>
                        </div>
                       
                </div>
                <div id="endneg"  class="messages_text_df" style={{display:"none", marginTop:"10px"}}>
                       {endnegbuttonpress()}
                       </div>
            </div>
             
        }
        else if (message.speak == "bot" && message.counter == "no" && typeof(message.item)!= 'boolean'){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">{message.text}</div>
                </div>
                <div>{item_display(message)}</div>
            </div>
             
        }
        else if (message.speak == "bot" && message.endneg == "yes" && message.intent == "accept_negprice"){
            return <div>
                <div key={index} class="messages_df">
                        {/* <div class="messages_text_df">{message.text}</div> */}
                </div>
                <div>{pricedisplay(message)}</div>
            </div>
             
        }

        else if (message.speak == "bot" && message.counter == "no" && typeof(message.item)== 'boolean'){
            return <div>
                <div key={index} class="messages_text_df">
                    Sorry I can't understand!
                </div>
            </div>
             
        }
        else if(message.speak == "bot" && message.counter == "yes"){
            localStorage.setItem("counteroffer",message.text)
            return <div>
                <div key={index} class="messages_df">
                        {/* <div class="messages_text_df">How about Rs {message.text} ?</div> */}
                </div>
                <div id='counterless' >{counterofferless(message)}</div>
            </div>
        }
        else if(message.speak == "no"){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">Please enter a price!</div>
                </div>
            </div>
        }
       
        
    }


    return(
        <div class="messages" > 
            {
                messages.map((message, index)=> {
                return displayMessage(message, index)
            })}
        </div>
    )
}

export default Messages