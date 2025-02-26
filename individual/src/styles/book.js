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
  flex-direction: column;
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
  z-index: 1000; 
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  top: 100%; 
  margin-top: 10px; 
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  
  align-items: center;
  width: 98%;
  margin-top: 2vh;
  margin-left: 2vh;
  margin-right: 2vh;
  background-color: #DBE2E9;
  height: 20vh;
  border-radius: 20px;
  position: relative; 
  overflow: visible; 
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

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #D9A24A;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #C18C3E;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Display = styled.div`
  width: 99%;
  height: 60vh;
  overflow-y: auto; 
  padding: 10px;
  background-color: white; 
  border-radius: 10px;
  margin-top: 2vh;
`; 

export const RoomCard = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px auto;
  width: 98%;
  color: black;
  background-color: #f9f9f9; // Light background for contrast
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }

  button {
    width: 15vh;
    height: 5vh;
    background-color: #D9A24A;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
      background-color: #C18C3E;
    }
  }
`;

export const RoomImage = styled.div`
  width: 30vh;
  height: 30vh;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RoomInfo = styled.div`
  width: 70vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  margin-left: 20px; // Increased margin for better spacing
  font-family: "Times New Roman";

  h2 {
    margin-top: 0;
    font-size: 24px; // Larger font size for room name
    color: #333; // Darker color for emphasis
    font-weight: bold;
  }

  p {
    font-size: 14px;
    margin-bottom: 10px;
    color: #555; // Slightly lighter color for details
  }
`;

export const RoomIcons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px; // Reduced gap for compact layout
  margin-top: 15px; // Adjusted margin
  width: fit-content;
`;

export const RoomIconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // Reduced gap for compact layout
  font-family: "Times New Roman", Times, serif;
  font-size: 14px; // Smaller font size for icons
  color: #555; // Neutral color for icons

  svg {
    color: #B77729; // Accent color for icons
  }
`;

export const PriceIconText = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 10px;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px; // Larger font size for price
  color: #B77729; // Accent color for price
  margin-top: 10px; // Added margin for spacing
  font-weight: bold; // Bold for emphasis
`;