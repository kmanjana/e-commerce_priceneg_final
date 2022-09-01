
import { useState,useRef } from 'react';
import React from "react";
import '../styles/Registerpages.css';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import {Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/newlogin.css';  
import { Row,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import { Button,Form} from 'react-bootstrap' ; 
import 'font-awesome/css/font-awesome.min.css';
import {useForm} from "react-hook-form";
function Newlogin(){
    let navigate=useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        trigger,
      } = useForm();
      const emails=localStorage.getItem('email');
      const password = useRef();
      password.current = watch("password");
      const onSubmit = (data) => {
         
        Axios.post("http://localhost:3002/handleSubmits/loginnew", {
            password:data.password,
            email:emails
    })
       .then((response) =>{
         if(response.data.message==="password updated")
       { alert("password updated");
        console.log(data);
        navigate("/loguser");}
         
        
        // if(response.data.message!== "password updated" )
        //    {   
        //       navigate("/Regisuser");
        
        //    }
        // else
        //  {
        //     alert("successfully updated");
        //     navigate("/loguser");
        //  }
    })
    reset();
      };
return(
<div className='newloginbody'>
<form onSubmit={handleSubmit(onSubmit)} className='borderboxlogin'>
<h1 className='newloginhead'>UPDATE PASSWORD HERE:</h1> 
<input
                type="password"
                id="inputregisterfont"
                placeholder=" &#xf0e0; Enter your password"
                className={`form-contCol ${errors.password && "invalid"}`}
                {...register("password", { required: "Password is Required" ,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                  message: "weak password",
                }})}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              <br></br>
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}  <br></br>
              <input
                type="password"
                id="inputregisterfont"

                placeholder=" &#xf0e0; Re-Enter your password"
                className={`form-contCol ${errors.cpassword && "invalid"}`}
                {...register("cpassword", { required: "Password is Required" ,
                validate: (value) =>
                value === password.current,
                })}
                onKeyUp={() => {
                  trigger("cpassword");
                }}
              /><br></br>
              {(errors.cpassword && errors.cpassword.type === "validate")&&(
                <small className="text-danger">{"passwords donot match"}</small>
              )}<br></br>
              <input
              type="submit"

              className="btn btn-primary my-3"
              value="SUBMIT"
            />
             </form>
                
              </div>


      )
              }
              export default Newlogin;