import React from 'react';

import  './styles.css';

import logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <>  
      <header className="title-logo">
        <img src={logo} alt="React Directions Logo"/>
        <h1>
          React Directions
        </h1>
      </header>
    </>
  );
}