const express = require("express");
const userreg = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { response } = require("express");
const app = express();//connectiom

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})
function router(){
    
  userreg.post('/', async(req, res) =>{//on anything go to index.js
    
    console.log(req.body);
     const first_name=req.body.first_name;
     const middle_name=req.body.middle_name;
     const last_name=req.body.last_name;
     const home_addr=req.body.home_addr;
     const email=req.body.email;
     const phno=req.body.phno;
     const salt=await bcrypt.genSalt(10);
     const password=await bcrypt.hash(req.body.password,salt);
     const recoveryque=req.body.recoveryque;
 
     db.query("INSERT INTO users(first_name,middle_name,last_name,home_addr,email,phno,password,recoveryque) VALUE (?,?,?,?,?,?,?,?)",
     [first_name,middle_name,last_name,home_addr,email,phno,password,recoveryque],
     (err,result)=>{
         console.log(result);
         if(err){
             return console.log(err);
         }
         res.send({result});
     }
     );   
 });
    userreg.post('/loginnew',async(req,res)=>{
      const salt=await bcrypt.genSalt(10);
     console.log(req.body);
     // if(typeof window!== 'undefined' && window){
     // var emails=localStorage.getItem('email');}
     // console.log(emails);
     const emails=req.body.email;
     
     // console.log(emails);
     // console.log("voifj");
     // const password=req.body.password;
      const password=await bcrypt.hash(req.body.password,salt);
     console.log(password);
     var sql="UPDATE users SET  password = ?  WHERE email= ?"
     db.query(sql,[password,emails],
     async(err,result)=>{
       // console.log(result[0]);
   db.query("SELECT * FROM users WHERE email = ? ",[emails],
   async(err,result)=>{
     console.log(result[0]);
     if (result.length > 0)
        {
           if(password==result[0].password)
            {res.send({ message: "password updated" });}
        
           }
        

     });
     
     console.log("successfully updated");
      
     
       if(err){
         return console.log(err);
       }
     
     }

     );
   });
   
    userreg.post('/loguser',async(req, res) =>{
      
    const email = req.body.email;
    const password=req.body.password;

    db.query("SELECT * FROM users WHERE email = ? ",[email],
    async(err,result)=>{
      
        if(err){
          return console.log(err);
        }
       
        if (result.length > 0)
         {const validp=  await bcrypt.compare(password,result[0].password);
          
            if(validp==true)
             {
              
              
              console.log("---------> Login Successful");
                // res.send({ message: "Successful login" });
              //  firstname= result[0].first_name;
                res.status(200).send(result[0]);
                
                
              } 
              else {
         
                res.send({ message: "Password does not match" });
              }

              
            }
       else{
         
            res.send({ message: "Email not registered" });
          }
}
          );
        
      
      
    });
        
    userreg.post('/forgotpassword',async(req, res) =>{
      
      const email = req.body.email;
      const recoveryque=req.body.recoveryque;
  
      db.query("SELECT * FROM users WHERE email = ? && recoveryque = ?",[email,recoveryque],
      async(err,result)=>{
       
        console.log(result);
          if(err){
            return console.log(err);
          }
         
          if (result.length > 0)
          { firstname= result[0].first_name;
            middle_name=result[0].middle_name;
            last_name=result[0].last_name;
            user_id=result[0].user_id;
            emails=result[0].email;
            phno=result[0].phno;
            home_addr=result[0].home_addr;
            recoveryques=result[0].recoveryque;
            
            res.send({ firstname,middle_name,last_name,user_id,emails,phno,home_addr,recoveryques,message: "authorised access" });
            console.log("valid mail");
            // res.send({result});
          }
         else{
           res.send({ message: "unauthorised access" });
         }
     } );
        
      
      
        });
    

    return userreg;//connection
}
module.exports = router;//for connection with index.js

