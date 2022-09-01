import React, { useState } from "react";
import "../styles/sample.css"
import Plane from "../assets/paper-plane.png"
import Close from "../assets/close.png"
import Chat from "../assets/chat.png"
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'

function Chatbot(){

//   const [responses, setResponses] = useState([])
  var proddetails = JSON.parse(localStorage.getItem("product_Details"))
  
  
  const [msg,setMsg]=useState("");
  
  
  const dispatch = useDispatch()
  const openForm = (e) =>{
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

const closeForm = (e)=>{
    document.getElementById("chat-wrapper").style.minHeight= "0";
    document.getElementById("chat-wrapper").style.opacity= "0";
    document.getElementById("chat-wrapper").style.transform= "translateX(25%) translateY(35%) scale(0.5, 0.5)";
    document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in, height 0s ease 0.8s"; 
    document.getElementById("open").style.height= "80px"; 
    document.getElementById("open").style.bottom= "40px"; 
    document.getElementById("open").style.width= "80px"; 
    document.getElementById("image").style.height= "60px"; 
    document.getElementById("image").style.width= "60px"; 
    // document.getElementById("image").style.paddingTop= "2px"; 
    document.getElementById("open").style.animation= "pulse 2s infinite"; 
}
const notification = (e) =>{
  document.getElementById("notif").style.display = "inline-flex";
  document.getElementById("notif").classList.toggle('visible');
}
//to close notification
const closeNotif = (e) =>{
  
  document.getElementById("notif").style.display = "none";
}
//to send data to backend
// localStorage.setItem("round",round)

// const chat =  (e) => {
//   //stop the form from refreshing the page on submit
//   e.preventDefault();
//   //clear the input box
//   setMsg('') 

// let data;
// let nego = localStorage.getItem("negotiation")
//   if(nego == "1"){
//     try{
//       var d =parseFloat(msg.match(/\d+/)[0])
//     var r = round+1
//     setRound(r)
//     // var rn = localStorage.getItem("round");
//     console.log("round is ", r);
    
//     // console.log(maxp)
//     localStorage.setItem("round",r)
//       if(r<=3){
        
//         if(r==1){
//           data = {
//             command: "counteroffer",
//             text: msg,
//             useroffer: d,
//             maxprice: proddetails.price,
//             minprice: proddetails.minprice,
//             round :r
//           }
//         }
//         else {
//           var counteroffer = localStorage.getItem("counteroffer");
//           console.log("counter", counteroffer);
//         data = {
//           command: "counteroffer",
//           text: msg,
//           useroffer: d,
//           maxprice: counteroffer ,
//           minprice: proddetails.minprice,
//           round :r
//         }
//         }
        
//         dispatch(chatbotActions.textQueryAction(data))
//       }  
//         else{
//           console.log("r is ", r);
//         }
//     }
//     catch{
//       var ro = parseInt(localStorage.getItem("round"))
//       data={
//         command:"end",
//         text:msg,
//         round:ro
//       }
//       dispatch(chatbotActions.textQueryAction(data))
//     }
    
//   }
//   else{
//     data = {
//       command: "other",
//       text: msg
//     } 
//     dispatch(chatbotActions.textQueryAction(data))
//   } 

// }
const [round ,setRound]= useState(0);
const chat =  (e) => {
  //stop the form from refreshing the page on submit
  e.preventDefault();
  //clear the input box
  setMsg('') 

let data;
let nego = localStorage.getItem("negotiation")
// if(parseInt(localStorage.getItem("round")) > 0){
//   setRound(0)
// }
  if(nego == "1"){

      // var d =parseFloat(msg.match(/\d+/)[0])
      var d =parseFloat(msg.match(/[+-]?([0-9]*[.])?[0-9]+/))
      console.log("d "+ d)
      if(d < parseFloat(localStorage.getItem("minprice"))){
        console.log("3333333")
        data={
          command:"useroffer_lessthan_minprice",
          text:msg
        }
        dispatch(chatbotActions.textQueryAction(data))
      }
      else if (d > parseFloat(localStorage.getItem("maxprice"))){
        data={
          command:"useroffer_greaterthan_maxprice",
          text:msg
        }
        dispatch(chatbotActions.textQueryAction(data))
      }
      else if ( isNaN(d)){

        var ro = parseInt(localStorage.getItem("round"))
        data={
          command:"end",
          text:msg,
          round:ro
        }
        dispatch(chatbotActions.textQueryAction(data))
  
      }
      else{
        var r = round+1
        setRound(r)
        // var rn = localStorage.getItem("round");
        console.log("round is ", r);
        
        // console.log(maxp)
        localStorage.setItem("round",r)
          if(r<=4){
            
            if(r==1){
              var maxpr = localStorage.getItem("maxprice")
              var minpr = localStorage.getItem("minprice")
              data = {
                command: "counteroffer",
                text: msg,
                useroffer: d,
                maxprice: maxpr,
                minprice: minpr,
                round :r
              }
            }
            else {
              var counteroffer = localStorage.getItem("counteroffer");
              var minpr = localStorage.getItem("minprice")
              console.log("counter", counteroffer);
            data = {
              command: "counteroffer",
              text: msg,
              useroffer: d,
              maxprice: counteroffer ,
              minprice: minpr,
              round :r
            }
            }
            
            dispatch(chatbotActions.textQueryAction(data))
          }  
            else{
              console.log("r is ", r);
            }
      }
    
  }
  else{
    data = {
      command: "other",
      text: msg
    } 
    dispatch(chatbotActions.textQueryAction(data))
  } 

}

    return(
      <div>
        
      <button class="open-button" id="open" onClick={openForm} onLoad={notification}><img id="image" src={Chat} alt="no image available"/></button>
      <div id="notif">Hello
     <div id="close" onClick={closeNotif}><img src={Close} class="close-notif" alt="no image available"/></div>
      </div>
        <div id="chat-wrapper">
            <div class="titlebar">
                <div class="title-wrapper">
                    <div id="dfTitlebar">Chatbot</div>
                    <div id="close" onClick={closeForm}><img src={Close} class="close-form" alt="no image available"/></div>
                </div>
            </div>
            <div class="message-list">
                <div class="message-list-wrapper">
                    <div class="error"></div>
                    <div id="messageList">
                        <Messages />
                    </div>
                </div>
            </div>
            <div class="user-input">
                <div class="input-container">
                    <div class="check-input"></div>
                    <form class="input-box-wrapper" onSubmit={chat}>
                        <input type="text"  placeholder="Ask something...." value={msg} required onChange={(e)=> {setMsg(e.target.value);}}></input>
                        <button type="submit" ><img src={Plane} id="sendIcon"></img></button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Chatbot