import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bed, ShowerHead, UsersIcon } from "lucide-react";
import { getCurrentUser, logout, getAllRooms } from "../apis/api"; 
import {
    Container,
    NavContainer, 
    Nav, 
    NavList, 
    NavItem,
    DropdownMenu,
    DropdownItem,
    StyledMenuIcon,
    StyledXIcon,
    MenuIconDropdown,
    AboutContainer,
    AboutBtn,
    ImageContainer,
    Images,
    Image,
    ImageWrapper,
    Content,
    RoomContainer,
    RoomText,
    Rooms,
    RoomImage,
    RoomCard,
    RoomInfo,
    RoomInfoText,
    Icons,
    IconText,
    LearnMoreBtn,
    BookNowBtn,
    ViewAllBtn,
    BookNowBtn2
} from "../styles/home";
import deer from "../assets/deer.jpeg";
import golf from "../assets/glf.jpeg";
import swim from "../assets/swim.jpeg";
import wed from "../assets/wed.jpeg";
import ctg from "../assets/ctgRoom.png";
import prem from "../assets/premRoom.png";
import club from "../assets/clubRoom.jpeg";

function Home() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getAllRooms();
                setRooms(response.data); // Assuming the response has a `data` field containing the rooms
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    const handleClick = () => setClick(!click);
    const toggleDropdown = () => setDropdown(prev => !prev);

    const roomsClick = () => {
        navigate("/rooms");
    };

    const bookClick = () => {
        navigate("/book");
    };

    return (
        <Container>
            <BookNowBtn2 onClick={bookClick}>BOOK NOW</BookNowBtn2>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem><Link to="/home"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            window.location.reload(); // Reload page
                        }}>HOME</Link></NavItem>
                        <NavItem onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <Link to="/rooms">ROOMS & SUITES</Link>
                            <DropdownMenu $dropdown={dropdown}>
                            <DropdownItem><Link to="/rooms/cottage">Cottage Room</Link></DropdownItem>
                            <DropdownItem><Link to="/rooms/premium">Premium Room</Link></DropdownItem>
                            <DropdownItem><Link to="/rooms/club">Club Room</Link></DropdownItem>
                            </DropdownMenu>
                        </NavItem>
                        <NavItem><Link to="/experience">EXPERIENCES</Link></NavItem>
                        <NavItem><Link to="/reviews">REVIEWS</Link></NavItem>
                        <NavItem onClick={handleClick} onAbort={handleClick}>{click ? (
                                <StyledXIcon size={24} />  // Render X (cross) when clicked
                            ) : (
                                <StyledMenuIcon size={24} />// Render MenuIcon when not clicked
                            )}
                            <MenuIconDropdown $dropdown={click}>
                                        <DropdownItem><Link to="/login">Login</Link></DropdownItem>
                                        <DropdownItem><Link to="/signup">Sign Up</Link></DropdownItem>
                            </MenuIconDropdown>
                        </NavItem>
                    </NavList>
                </Nav>
            </NavContainer>
            <Content>
                <AboutContainer>
                    <h1>LUXURY ADMIST</h1>
                    <h1>NATURE'S EMBRACE</h1>
                    <p>Leave the noise behind and step into a world of untouched beauty. 
                        Nestled within a secluded sanctuary, our resort offers a rare blend of heritage and wilderness. 
                        Once a retreat for royalty, this haven invites you to wander beneath towering trees, where the whispers of history meet the soothing sounds of nature.</p>
                    <p>Wake up to the sight of misty hills, spot wildlife in their natural habitat, and let the crisp mountain air rejuvenate your spirit. 
                        Whether you seek adventure, relaxation, or a touch of indulgence, every moment here is a celebration of tranquility and luxury. Your escape begins now.</p>
                    <AboutBtn>About Us</AboutBtn>
                </AboutContainer>
                <ImageContainer>
                    <Images>
                        <ImageWrapper><Image src={golf} alt="Golf" /></ImageWrapper>
                        <ImageWrapper><Image src={deer} alt="Deer" /></ImageWrapper>
                        <ImageWrapper><Image src={swim} alt="Swim" /></ImageWrapper>
                        <ImageWrapper><Image src={wed} alt="Wed" /></ImageWrapper>
                    </Images>
                </ImageContainer>
                <RoomContainer>
                    <RoomText>
                        <h1>CHOOSE YOUR PERFECT STAY</h1>
                        <p>Choose your perfect stay in our elegantly appointed rooms, where luxury meets comfort. Each room offers a serene retreat with stunning views, ensuring a memorable and restful experience.</p>
                    </RoomText>
                    <Rooms>
                        {rooms.map((room) => (
                            <RoomCard key={room.id}>
                                <RoomImage src={room.imageUrl} alt={room.name} />
                                <RoomInfo>
                                    <h2>{room.name}</h2>
                                    <RoomInfoText>
                                        <p>{room.details}</p>
                                    </RoomInfoText>
                                    <hr />
                                    <Icons>
                                        <IconText>
                                            <Bed size={20} color="#B77729" />
                                            <span> {room.bedType}</span>
                                        </IconText>
                                        <IconText>
                                            <ShowerHead size={20} color="#B77729" />
                                            <span> {room.bathroom}</span>
                                        </IconText>
                                        <IconText>
                                            <UsersIcon size={20} color="#B77729" />
                                            <span> {room.adultOccupants} + {room.childOccupants}</span>
                                        </IconText>
                                    </Icons>
                                    <hr />
                                </RoomInfo>
                                <LearnMoreBtn>Learn More</LearnMoreBtn>
                                <BookNowBtn onClick={bookClick}>Book Now</BookNowBtn>
                            </RoomCard>
                        ))}
                    </Rooms>
                    <ViewAllBtn onClick={roomsClick}>View All</ViewAllBtn>
                </RoomContainer>
            </Content>
        </Container>
    );
}

export default Home;