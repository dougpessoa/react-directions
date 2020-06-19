import React from 'react';

import { Head } from './styles';

import logo from '../../assets/images/logo.png';

export default function Header() {
  return (
    <>  
      <Head className="title-logo">
        <img src={logo} alt="React Directions Logo"/>
        <h1>
          React Directions
        </h1>
      </Head>
    </>
  );
}