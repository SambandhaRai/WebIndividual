import styled from "styled-components";
import { X, MenuIcon } from "lucide-react";


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
  margin-top: 5px;
  width: ${(props) => (props.$isLoggedIn ? "auto" : "15vh")}; 
  top: 100%;
  right: 0;  
  left: ${(props) => (props.$isLoggedIn ? "auto" : "0")}; 
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

// Contact Container
export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Contact Information
export const ContactInfo = styled.div`
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const InfoIcon = styled.div`
  margin-right: 10px;
  color: #D9A24A; // Icon color
`;

export const InfoText = styled.p`
  font-size: 18px;
  color: #555;
  margin: 0;
`;