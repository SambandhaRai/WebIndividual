import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: #EEDDB8;
`;

// Sidebar
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  heigth: 100vh;
  background-color: #D8C49A;
`;

export const SidebarNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5vh;
  width: 100%;
  height: 13vh;
  text-align: center; 
  background-color: #C8B78E; 
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  font-family: "Times New Roman", Times, serif; 
  font-size: 1rem;
  color: black;
  text-align: left;
`;

export const SideIcons = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 1vh;
`;

export const SideIconText = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; 
  font-family: "Times New Roman", Times, serif; 
  font-size: 1.5rem;
  color: black;
  margin-left: 5vh;
  margin-top: 5vh;
`;


// Real Content
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 100vh;
`;

// Navigation Bar
export const NavContainer = styled.div`
  display: flex;
  align-items: left;
  width: 80vw;
  height: 13vh;
  background-color: #D9A24A;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: "Times New Roman", Times, serif";
  color: black;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
  flex-wrap: wrap;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; 
  font-family: "Times New Roman", Times, serif; 
  font-size: 1.5rem;
  color: black;
`;

// Content Space
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: calc(100vh - 13vh);
  padding-top: 20vh;
  overflow-y: auto;
`;

// Form Container
export const FormContainer = styled.div`
  background: #EAE1D8;
  padding-left: 8vh;
  padding-right: 8vh;
  padding-bottom: 8vh;
  padding-top: 8vh;
  margin-top: 0vh;
  margin-bottom: 8vh;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 450px;
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

// Input Fields and Text Area
export const Input = styled.input`
  background-color: #EAE1D8;  
  color: black;
  padding: 10px;
  border: 1px solid #B77729;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  width: 100%; 
  max-width: 100%; 
  box-sizing: border-box; 
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
  }
`;

export const TextArea = styled.textarea`
  width: 100%; 
  max-width: 100%; 
  padding: 10px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 4px;
  border: 1px solid #B77729; 
  background-color: #EAE1D8; 
  color: black;
  resize: none;  
  overflow-y: auto;  
  height: auto;
  box-sizing: border-box; 
  
  transition: height 0.2s ease, background-color 0.3s ease, border-color 0.3s ease;

  &:focus {
    background-color: #EAE1D8;  
    border-color: #B77729; 
  }
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

export const Select = styled.select`
  background-color: #EAE1D8;  
  color: black;
  padding: 10px;
  border: 1px solid #B77729;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  transition: border 0.3s ease, background 0.3s ease;

  &:focus {
    background-color: #EAE1D8; 
    border-color: #B77729;
  }
`;

// Add experience specific styles
export const FormGroupImage = styled(FormGroup)`
  margin-bottom: 2rem;
`;

export const ImageInput = styled(Input)`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #B77729;
  background-color: #EAE1D8;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

export const LoadingDots = styled.div`
  display: flex;
  gap: 10px;
`;

export const LoadingDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #B77729;
  animation: bounce 1s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

export const LoadingText = styled.div`
  font-size: 18px;
  color: white;
  margin-top: 1vh;
`;

