import React from 'react';

import './styles.css';

import linkedin from '../../assets/images/linkedin.png';
import github from '../../assets/images/github.png';
import instagram from '../../assets/images/instagram.png';

export default function Footer() {

  function redirect(url){
    window.open(url, '_blank');
  }

  return (
    <div className="footer">
      <h3>Developed by Douglas Pessoa</h3>
      <div className="social">
        <h6>Follow me</h6>
        <div className="logo-social">
          <img 
            src={linkedin} 
            alt="Linkedin" 
            onClick={() => redirect('https://www.linkedin.com/in/douglaspessoa/')}
          />
          <img 
            src={github} 
            alt="Github"
            onClick={() => redirect('https://github.com/dougpessoa')}
          />
          <img 
            src={instagram} 
            alt="Instagram" 
            onClick={() => redirect('https://www.instagram.com/dougpeople/')}
          />
        </div>
      </div>
    </div>
  );
}
