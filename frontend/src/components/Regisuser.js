import { useState,useRef } from 'react';
import React from "react";
import '../styles/Registerpages.css';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import {Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Registerpages.css';  
import { Row,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import { Button,Form} from 'react-bootstrap' ; 
import 'font-awesome/css/font-awesome.min.css';
import {useForm} from "react-hook-form"
//import background from "/reg.jpg";

  // States for registration
  function Regisuser() {
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        trigger,
      } = useForm();
      const password = useRef();
      password.current = watch("password");
      const onSubmit = (data) => {
        
        Axios.post("http://localhost:3002/handleSubmits", {

        first_name:data.first_name,
        middle_name:data.middle_name,
        last_name:data.last_name,
        home_addr:data.address,
        email:data.email,
        password:data.password,
        phno:data.phone,
        recoveryque:data.recovery,
    })
          .then((response) =>{
            alert("signed");
            console.log(data);
            navigate("/loguser");
          });
    
        reset();
      };
    
    

return (
    <div className='registerback'>
    
        
          <form onSubmit={handleSubmit(onSubmit)} className='borderboxregister'>
              
          <h1 className='mainhead'>USER REGISTRATION FORM</h1>   
          <Row style={{marginLeft:"1%"}}>
          <Col md={5}>
              
              <input
                type="text"
                id="inputregisterfont"
                
                placeholder='Enter your first name'
                className={`form-contCol ${errors.first_name && "invalid"}`}
                {...register("first_name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("first_name");
                }}
              />
              {errors.first_name && (
                <small className="text-danger">{errors.first_name.message}</small>
              )}
            </Col>
              <Col md={1}></Col>
                <Col md={4}>
              
              <input
                type="text"
                id="inputregisterfont"
                placeholder="&#xf2bd;Enter your middle name"
                className={`form-contCol ${errors.middle_name && "invalid"}`}
                {...register("middle_name")}
                onKeyUp={() => {
                  trigger("middle_name");
                }}
              />
              {errors.middle_name && (
                <small className="text-danger">{errors.middle_name.message}</small>
              )}
             
            </Col>
            
            </Row> 
            <Row style={{marginLeft:"1%"}}> 
            <Col md={5}>
              
              <input
                type="text"
                id="inputregisterfont"
                placeholder=" &#xf2bd;Enter your last name"
                className={`form-contCol ${errors.last_name && "invalid"}`}
                {...register("last_name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("last_name");
                }}
              />
              {errors.last_name && (
                <small className="text-danger">{errors.last_name.message}</small>
              )}
          
          </Col>
            <Col md={1}></Col>
            <Col md={4}>
            
              
              <input
                type="text"
                id="inputregisterfont"
                placeholder=" &#xf0e0; Enter your email"
                className={`form-contCol ${errors.email && "invalid"}`}
                {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
           
            </Col>
            </Row>
            <Row style={{marginLeft:"1%"}}>
            <Col md={5}>
              
              <input
                type="number"
                id="inputregisterfont"
                placeholder="&#xf095;Enter your phone number" 
                className={`form-contCol ${errors.phone && "invalid"}`}
                {...register("phone", { required: "Phone is Required",
                pattern: {
                  value: /^\d{10}$/i,
                  message: "Invalid phone no",
                },
               })}
               onKeyUp={() => {
                trigger("phone");
              }}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
           
           </Col>
            <Col md={1}></Col>
            <Col md={4}>
              
              <input type ="text"
              id="inputregisterfont"
               placeholder='&#xf041;Enter your address'
                className={`form-contCol ${errors.address && "invalid"}`}
                {...register("address", { required: "Address is Required",
                minLength: {
                  value: 10,
                  message: "Minimum Required length is 10",
                },
                maxLength: {
                  value: 50,
                  message: "Maximum allowed length is 50 ",
                }
               })}
               onKeyUp={() => {
                trigger("address");
              }}
              />
              {errors.address && (
                <small className="text-danger">{errors.address.message}</small>
              )}
            </Col>

            
           </Row>
           <Row style={{marginLeft:"1%"}}>
           <Col md={5}>
              
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
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
           
           </Col><Col></Col>
           <Col md={5}>
              
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
              />
              {(errors.cpassword && errors.cpassword.type === "validate")&&(
                <small className="text-danger">{"passwords donot match"}</small>
              )}
                
                </Col>
            <Col md={1}></Col>
             
            </Row>
            <Row style={{marginLeft:"2%"}}>
            <input type ="text"
              id="inputregisterfont"
               placeholder='&#xf041;Enter your Recovery question'
                className={`form-contCol ${errors.recovery && "invalid"}`}
                {...register("recovery", { required: "Recovery question is required is Required",
                minLength: {
                  value: 10,
                  message: "Minimum Required length is 10",
                },
                maxLength: {
                  value: 50,
                  message: "Maximum allowed length is 50 ",
                }
               })}
               onKeyUp={() => {
                trigger("recovery");
              }}
              />
              {errors.recovery && (
                <small className="text-danger">{errors.recovery.message}</small>
              )}
            </Row>
            <input
              type="submit"

              className="btn btn-primary my-3"
              value="SUBMIT"
            />
            
       <Link to="/Loguser">ALREADY REGISTERED? GO TO LOGIN PAGE</Link>
       
          </form>
        </div>
      
  );
}

export default Regisuser;