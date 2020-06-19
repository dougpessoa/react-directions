import styled from 'styled-components';

export const Popup = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  width: 50%;
  max-width: 500px;
  height: 300px;
  background-color: rgb(168, 198, 224);
  border-radius: 5px;
  border: 1px solid #dee2e6;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  
  h3 {
    font-size: 23px;
    padding-bottom: 23px;
    font-weight: 700;
  }

  h4{
    font-size: 15px;
    padding-bottom: 23px;
    font-weight: 700;
    color: red;

    span{
      color: blue;
      cursor: pointer; 
    }
  }

  input {
    width: 80%;
  }

  button {
    width: 84%;
    border: none;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 7px;
    cursor: pointer;
    font-weight: 700;
    color: white;
    background-color: rgb(19, 0, 237);
    transition: .5s;
  }

  button:focus{
    outline: none;
  }

  button:active{
    transform: scale(0.985);
  }
`;