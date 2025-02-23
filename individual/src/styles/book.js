import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #BEC3C6;
`;

// Navigation Bar
export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 15vh;
  background-color: green;
`;

export const Nav = styled.nav`
  font-size: 14px;
  display: flex;
  justify-content: flex-start;  
  width: 100%;
  align-items: center;  
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
  margin: 0 20px; 
  gap: 5vh;
  color: white;
  justify-content: center; 
  
  &:nth-child(1) {
    margin-right: 100px;
    margin-left: 70px;
  }

  &:nth-child(2) {
    margin-left: 420px;
    font-size: 35px; 
    font-weight: bold;
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
`;

// Content Space
export const Content = styled.div`
  display: flex;
  width: 100vw;
  height: 90vh; 
  justify-content: center;
`;

export const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35vh; 
  margin-right: 20px; 
  margin-left: 5vh;
`;

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  background-color: white;
  color: black;
  text-align: center;

  &:focus {
    border-color: #D9A24A;
    box-shadow: 0px 0px 5px rgba(217, 162, 74, 0.3);
  }

  &:hover {
    border-color: #D9A24A;
  }
`;

export const DatePickerWrapper = styled.div`
  position: absolute;
  z-index: 100; 
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  top: 280px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  
  align-items: center;
  width: 99%;
  margin-top: 10px;
  background-color: #DBE2E9;
  height: 20vh;
  border-radius: 20px;
`;

export const Room = styled.div`
  width: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Quantity = styled.div`
  width: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RoomInput = styled.select`
  width: 80%; 
  padding: 10px; 
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  background-color: white;
  color: black;

  &:focus {
    border-color: #D9A24A;
    box-shadow: 0px 0px 5px rgba(217, 162, 74, 0.3);
  }

  &:hover {
    border-color: #D9A24A;
  }
`;

export const QuantityInput = styled.select`
  width: 80%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  background-color: white;
  color: black;

  &:focus {
    border-color: #D9A24A;
    box-shadow: 0px 0px 5px rgba(217, 162, 74, 0.3);
  }

  &:hover {
    border-color: #D9A24A;
  }
`;
