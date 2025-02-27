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

// Content Space
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  width: 80vw;
  height: calc(100vh - 13vh);
  overflow-y: hidden; =
  box-sizing: border-box; 
`;

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const LoadingDots = styled.div`
    display: flex;
    gap: 5px;
`;

export const LoadingDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: #B77729;
    border-radius: 50%;
    animation: bounce 1s infinite;

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    &:nth-child(2) {
        animation-delay: 0.2s;
    }

    &:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

export const LoadingText = styled.p`
    margin-top: 10px;
    font-size: 16px;
    color: #333;
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

// Form Container
export const FormContainer = styled.div`
  background: #EAE1D8;
  padding-top: 5vh;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%; 
  height: calc(100vh - 13vh - 40px); 
  overflow-y: scroll; 
  margin: 0 auto; 
`;

export const Subtitle = styled.p`
    font-family: "Times New Roman", Times, serif;
    font-size: 1rem;
    color: #666;
    margin-top: 2px;
    margin-bottom: 2vh;
`;

export const Title = styled.h1`
    font-family: "Times New Roman", Times, serif;
    font-size: 3rem;
    color: #B77729;
    margin-top: 0;
    margin-bottom: 5px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export const TableHeader = styled.th`
    background-color: #D9A24A;
    padding: 10px;
    text-align: left;
    font-family: "Times New Roman", Times, serif;
    font-size: 1rem;
    color: black;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    font-family: "Times New Roman", Times, serif;
    font-size: 0.9rem;
    color: #333;
`;

export const ActionButton = styled.button`
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => (props.primary ? "#28a745" : "#dc3545")};
    color: white;
    cursor: pointer;
    font-family: "Times New Roman", Times, serif;
    font-size: 0.9rem;

    &:hover {
        opacity: 0.8;
    }
`;