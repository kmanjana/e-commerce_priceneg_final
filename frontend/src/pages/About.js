import React from 'react';
import MutipleProducts from "../assets/products.png";
import '../styles/About.css'

export default function About() {
  return (
    <div className='about'>
      <div className='aboutTop'
      style={{ backgroundImage: `url(${MutipleProducts})` }}
      >
      </div>
      <div className='aboutBottom'>
        <h1> ABOUT US</h1><br></br>
        <p>Shop Hunt is a platform  where customers can find their required products at affordable rate .<br></br>
        We offer variety of services to both customers and shopkeepers.
        <br></br>Here customers can negotiate the prices just like they do in offline shopping from the vicinity of their home .
        <br></br>
       The shopkeepers and customers gets to interact with each other and arrive at a prize desired by both
      </p>
      </div>
    </div>
  )
}