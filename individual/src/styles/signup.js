import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #EEDDB8;
`;

// Navigation Bar
export const NavContainer = styled.div`
  display: flex;
  align-items: left;
  width: 100vw;
  height: 13vh;
  background-color: #D9A24A;
  /* Remove position: fixed */
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center; /* Align items vertically */
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  color: black;
`;

export const NavItem = styled.li`
  display: flex;
  flex-direction: row;
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
  margin: 0 50px; 
  gap: 5vh;
  color: white;
  position: relative;
  
  &:nth-child(1) {
    margin-right: 100px;
  }
`;

export const Icons = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
  flex-wrap: wrap;

  &:nth-child(1){
    margin-left: 2vh;
  }
  
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
  font-family: "Times New Roman", Times, serif; 
  font-size: 1rem;
  color: black;
`

// Content Space
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: calc(100vh - 13vh);
  padding-top: 5vh;
  overflow-y: auto;
`;

// Form Container
export const FormContainer = styled.div`
  background: #EAE1D8;
  padding-left: 8vh;
  padding-right: 8vh;
  padding-bottom: 8vh;
  padding-top: 5vh;
  margin-bottom: 8vh;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
  height: auto;
`;

export const Title = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  color: #B77729;
  margin-top: 0vh;
  margin-bottom: 5px;
`;

export const Subtitle = styled.p`
  font-family: "Times New Roman", Times, serif;
  font-size: 1rem;
  color: #666;
  margin-top: 2px;
  margin-bottom: 2vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1.5rem;

  label {
    font-family: "Times New Roman", Times, serif;
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 0.3rem;
    color: #666;
  }
`;

// Gender RadioButtons
export const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  margin-bottom: 1.5rem;

  label {
    font-family: "Times New Roman", Times, serif;
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 0.3rem;
    color: #666;
  }

`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
  font-weight: 800;
  color: #666;
  cursor: pointer;
  gap: 2px;
`;

export const RadioInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #B77729;
  border-radius: 50%;
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:checked {
    border-color: black;
    background-color: #EAE1D8;
  }

  &:checked::before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: black;
    border-radius: 50%;
    display: block;
  }


  &:focus {
    outline: none;
  }
`;


export const Input = styled.input`
  background-color: #EAE1D8;  
  color: black;
  padding: 10px;
  border: 1px solid #B77729;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease, background 0.3s ease;

  &:focus {
    background-color: #EAE1D8; 
    border-color: #B77729;
  }

  /* Fix autofill styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    background-color: #EAE1D8;
    color: black;
    -webkit-text-fill-color: black;
    -webkit-box-shadow: 0 0 0px 1000px #EAE1D8 inset;
  

`;

export const Button = styled.button`
  background-color: #B77729;
  color: white;
  padding: 13px;
  margin-top: 2vh;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    color: #FEDD00;
    background-color: black;
  }

  &:focus{
    outline:none;
  }
`;
