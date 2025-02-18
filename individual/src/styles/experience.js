import styled from "styled-components";
import { X, MenuIcon } from "lucide-react";
import exper from "/Users/sambandharai/Desktop/WebIndividual/individual/src/assets/exper.png"


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;
  background-color: #EAE1D8;
`;

// Navigation Bar
export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 13vh;
  background-color: #D9A24A;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
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
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
  margin: 0 50px; 
  color: white;
  position: relative;
  
  &:nth-child(1) {
    margin-right: 100px;
  }

  &:nth-child(2) {
    margin-right: 50px;
  }

  &:nth-child(3) {
    margin-left: 450px;
  }

  &:nth-child(4) {
    margin-left: 100px;
  }

  &:nth-child(5) {
    margin-left: 50px;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  background-color: #EEDDB8;
  color: black;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 200px;
  top: 100%; // Position it below the nav item
  left: 0;
  padding: 10px 0;
  z-index: 1; // Ensure it's above other elements
  display: ${(props) => (props.$dropdown ? "block" : "none")};
  flex-direction: column;
`;

export const StyledMenuIcon = styled(MenuIcon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const StyledXIcon = styled(X)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const MenuIconDropdown = styled.div`
  position: absolute;
  background-color: #EEDDB8;
  color: black;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 15vh; /* Or any width that suits your design */
  top: 100%;
  right: 0;  /* This ensures it doesn't stretch to the right side */
  left: 0; /* Align it to the left of the parent container */
  padding: 10px 0;
  z-index: 1;
  display: ${(props) => (props.$dropdown ? "block" : "none")};
  flex-direction: column;
`;

export const DropdownItem = styled.div`
  padding: 12px 20px;
  text-align: left;
  
  a {
    text-decoration: none;
    color: inherit;
    font-weight: normal;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &:hover {
    color: white;
  }
`;

// Content Space
export const Content = styled.div`
  width: 100vw;
  height: 85vh; 
  overflow-y: auto; // scroll
`;

// About Space
export const AboutContainer = styled.div`
  background-image: url(${exper}), linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  background-size: cover;
  background-position: center;
  text-align: center;
  padding-top: 10vh;
  padding-bottom: 10vh;
  width: 100%;
  height: 65vh;
  background-color: #EEDDB8;

  h1 {
    font-size: 60px;
    font-family: "Times New Roman", Times, serif;
    color: white;
    margin-top: 20vh;
    margin-bottom: 2vh;
  }

  p {
    padding-left: 50vh;
    padding-right: 50vh;
    margin-top: 15px;
    font-size: 1.1rem;
    font-weight: 400;
    color: #FFB81C;
    line-height: 1.6;
    max-width: 900px;
    margin: 0 auto;
  }

  /* hr {
    border: none;
    height: 3px;
    background-color: #D5C2A5;
    margin: 10px 0;
    width: 38%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2vh;
  }
  */

`;

export const AboutBtn = styled.button`
  padding: 2vh;
  height: 7vh;
  width: 20vh;
  margin-top: 10vh;
  background-color: #EEDDB8;
  color: #B77729;
  border: 1px solid #B77729;
  padding: 10px 20px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 0px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #B77729;
    border: 1px solid #B77729;
  }

  &:focus {
    outline: none;
  }
`;

// Experiences Display
export const ExperienceContainer = styled.div`
  padding-top: 15vh;
  padding-bottom: 10vh;
  width: 100%;
  height: auto;
  background-color: #F4E8D7; // Background Color
`;

export const Exp = styled.div`
  width: 100%;
  height: 50vh;
  padding-top: 10vh;
  padding-bottom: 10vh;
  margin-bottom: 10vh;
  background-color: #F4E8D7;
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center; 
`;

export const ExpImage = styled.img`
  width: 70vh;
  height: 65vh;
  object-fit: cover;
  margin-left: 5vh;  
  margin-right: 5vh;  
`;

export const ExpInfo = styled.div`
  width: 90vh;
  height: 65vh;
  margin-left: 5vh;  
  margin-right: 5vh; 
  text-align: left;
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  
  h1 {
    font-family: "Times New Roman", Times, serif;
    font-size: 2rem;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 10px;
    color: #B77729;
    margin-top: 6vh;
    margin-left: 10vh;
    margin-right: 10vh;
    margin-bottom: 0px;
  }

  p {
    font-size: 15px;
    color: #444;
    margin-top: 35px;
    margin-left: 10vh;
    margin-right: 10vh;
    margin-bottom: 5px;
  }

  hr:first-of-type {
    border: none;
    height: 3px;
    background-color: #E0A526;
    width: 100%;
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0px;
  }

  hr:last-of-type {
    border: none;
    height: 3px;
    background-color: #E0A526;
    width: 100%;
    margin-top: auto; 
  }
`;




export const BookNowBtn2 = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  padding: 2vh;
  height: 7vh;
  width: 20vh;
  background-color: #BA8632;
  color: white;
  border: 2px solid #BA8632;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0px;
  transition: all 0.3s ease;
  z-index: 1000; /* Ensures it stays above other content */

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
  }

  &:focus {
    outline: none;
  }
`;