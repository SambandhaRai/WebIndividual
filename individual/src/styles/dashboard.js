import styled from "styled-components";

export const RoomGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5vh;
    justify-content: center;
    width: 100%;
`;

export const RoomCard = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 58vh; /* Fixed width for each card */
    height: 85vh; /* Fixed height for each card */
    flex: 0 0 auto; /* Prevent flex items from shrinking */
    margin-right: 20px; /* Space between cards */
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

export const RoomImage = styled.img`
    width: 100%;
    height: 31vh;
    object-fit: cover;
`;

export const RoomInfo = styled.div`
    padding: 2vh;
    height: 31.5vh;

    h2 {
        font-family: "Times New Roman", Times, serif; 
        font-size: 1.5rem;
        color: #B77729;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    p {
        font-family: "Times New Roman", Times, serif; 
        font-size: 15px;
        color: #444;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    hr {
        border: none;
        height: 1px;
        background-color: #B77729;
        margin: 10px 0;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const RoomInfoText = styled.div`
    width: 100%;
    height: 11vh;
`;

export const RoomIcons = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 10px 20px; 
    justify-content: center;
    margin-left: 5vh;
    width: fit-content; 
`;

export const RoomIconText = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; 
    font-family: "Times New Roman", Times, serif; 
    font-size: 1rem;
    color: #B77729;
`;

export const PriceIconText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; 
    font-family: "Times New Roman", Times, serif; 
    font-size: 1rem;
    color: #B77729;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  padding: 2vh;
  width: 90%;
  margin-top: 2vh;
  margin-left: 2.5vh;
  margin-bottom: 10px;
  background-color: white;
  color: #B77729;
  border: 2px solid #B77729;
  padding: 10px 20px;
  font-family: "Times New Roman", Times, serif;
  font-size: 1rem;
  border-radius: 0px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #B77729;
    color: white;
    border-color: #B77729;
  }

  &:focus {
    outline: none;
    border-color: #B77729;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  padding: 2vh;
  width: 90%;
  margin-bottom: 4vh;
  margin-left: 2.5vh;
  background-color: #B77729;
  color: white;
  border: 2px solid #B77729;
  padding: 10px 20px;
  font-family: "Times New Roman", Times, serif;
  font-size: 1rem;
  border-radius: 0px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: #FEDD00;
    border-color: black;
  }

  &:focus {
    outline: none;
  }
`;

export const AddRoomButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;
    margin-bottom: 20px;
    margin-left: 5vh;
    border: none;
    border-radius: 4px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #218838;
    }
`;

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

export const HorizontalScrollContainer = styled.div`
    display: flex;
    overflow-x: auto; 
    gap: 1.5vh; 
    padding: 10px 0 10px 5vh; 
    scrollbar-width: thin; 
    scrollbar-color: #B77729 transparent; 

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #B77729;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export const ExpTitle = styled.h1`
    font-family: "Times New Roman", Times, serif;
    font-size: 3rem;
    color: #B77729;
    margin-top: 0;
    margin-bottom: 5px;
    margin-top: 10vh;
`;

// Experience
export const ExpCard = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 58vh; 
    height: 90vh; 
    flex: 0 0 auto; 
    padding-bottom: 5vh; 
    margin-right: 20px; 
    margin-bottom: 20px; 
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

export const ExpImage = styled.img`
    width: 100%;
    height: 31vh;
    object-fit: cover;
`;

export const ExpInfo = styled.div`
    padding: 2vh;
    height: 31.5vh;

    h2 {
        font-family: "Times New Roman", Times, serif; 
        font-size: 1.5rem;
        color: #B77729;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    p {
        font-family: "Times New Roman", Times, serif; 
        font-size: 15px;
        color: #444;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    hr {
        border: none;
        height: 1px;
        background-color: #B77729;
        margin-top: 22vh;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5vh;
    }
`;

export const ExpInfoText = styled.div`
    width: 100%;
    height: 11vh;
`;