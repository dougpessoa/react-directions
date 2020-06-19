import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 90%;
  max-width: 800px;
  padding-bottom: 20px;
`;

export const PlaceBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button{
    padding: 10px 15px;
    border-radius: 7px;
    border: none;
    transition: .3s;
    background-color: #1A73E8;
    color: white;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  button:active{
    transform: scale(0.978);
  }

  button:focus{
    outline:0;
  }

  span{
    color: red;
    font-weight: bold;
    font-size: 14px;
    padding-top: 10px;
  }
`;

export const HomeEndBody = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loading = styled.img`
  max-width: 20px;
  margin-left: 10px;
  animation: ${spin} 1.3s linear infinite;
`;

