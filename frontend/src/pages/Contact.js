import React from 'react'
import Contactus from '../assets/ContactUsBanner.jpg'
import "../styles/Contact.css"

function Contact() {
  return (
    <div className="contact">
        <div 
        className="leftSide"
        style={{ backgroundImage: `url(${Contactus})` }}
        ></div>
        <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" style={{marginLeft:"10px"}} /><br></br>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" style={{marginLeft:"45px"}}/><br></br>
          <label htmlFor="message">Message</label><br></br>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact