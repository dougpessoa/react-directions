import styled, { keyframes } from 'styled-components';

export const Bar = styled.div`
  width: 400px;
  height: 100vh;
  background-color: #1A73E8;
`; 

export const GoBack = styled.div`
  width: 100%;
  height: 30px;
  padding: 5px;

  img {
    max-height: 30px;
    cursor: pointer;
  }
`;

export const Form = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`; 

export const Point = styled.div`
  width: 20px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: white;
    font-size: 14px;
    font-weight: 900;
  }

  span:nth-child(1){
    margin-bottom: 4px;
  }

  div {
    margin-bottom: 5px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.87)
  }
`; 

export const Inputs = styled.div`
  width: calc(100% - 20px);
  height: 100px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input{
    width: 90% !important;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    border-right: 1px solid transparent;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    color: white;
  }


  input:focus{
    outline: none;
    border: 1px solid transparent !important;
    border-bottom: 1px solid white !important;
  }

  input::placeholder {
    color: white;
  }

  input::selection{
    background-color: #4CB245;
    color: white;
  }
`; 

export const ChangeDirections = styled.div`
  width: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img{
    max-width: 20px;
    max-height: 20px;
    cursor: pointer;
  }
`;

export const GetDirections = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;

  button{
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 7px;
    border: none;
    transition: .3s;
    background-color: #4CB245;
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
    color: white;
    font-weight: bold;
    font-size: 14px;
    padding-top: 10px;
  }
`;

export const DirectionsEndOfBody = styled.div`
  width: 100%;
  height: calc(100% - 280px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
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