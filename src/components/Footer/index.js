import React from 'react';

import { Title, Subtitle, Social, Img } from './styles';

import linkedin from '../../assets/images/linkedin.png';
import github from '../../assets/images/github.png';
import instagram from '../../assets/images/instagram.png';

export default function Footer() {

  function redirect(url){
    window.open(url, '_blank');
  }

  return (
    <div className="footer">
      <Title>Developed by Douglas Pessoa</Title>
      <Social>
        <Subtitle>Follow me</Subtitle>
        <div>
          <Img 
            src={linkedin} 
            alt="Linkedin" 
            onClick={() => redirect('https://www.linkedin.com/in/douglaspessoa/')}
          />
          <Img 
            src={github} 
            alt="Github"
            onClick={() => redirect('https://github.com/dougpessoa')}
          />
          <Img 
            src={instagram} 
            alt="Instagram" 
            onClick={() => redirect('https://www.instagram.com/odougpessoa/')}
          />
        </div>
      </Social>
    </div>
  );
}
