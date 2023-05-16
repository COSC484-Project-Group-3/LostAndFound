import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__item">
          <FaEnvelope className="footer__icon" />
          <a href="mailto:lostandfound@gmail.com" className="footer__link">LostAndFound@gmail.com</a>
        </div>
        <div className="footer__item">
          <FaPhone className="footer__icon" />
          <a href="tel:+1234567890" className="footer__link">+1234567890</a>
        </div>
        <div className="footer__item">
          <FaMapMarkerAlt className="footer__icon" />
          <p className="footer__text">8000 york rd</p>
        </div>
       
      </div>
      <div className='footer_icon1'> <h1>About us </h1><p className='footer_textp'>Lostandfound is a company dedicated to helping people recover their lost items. With a team of experts and advanced technology, we provide an efficient and reliable service that aims to return lost items to their rightful owners</p>

<input style={{marginBottom:"10px"}} type="button" value="terms of service" onClick={()=>navigate("/terms ")}/>
</div>
<input type="button" value="About Us" onClick={()=>navigate("/About")} />

    </footer>
    
  );
}

export default Footer;
