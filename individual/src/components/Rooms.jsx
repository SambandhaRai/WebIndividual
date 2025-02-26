import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bed, Expand, ExpandIcon, ShowerHead, UsersIcon } from "lucide-react";
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
    BookNowBtn2
} from "../styles/rooms";
import { getAllRooms, logout } from "../apis/api";

function Room() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userEmail, setUserEmail] = useState(""); 
    const navigate = useNavigate();  

    const handleClick = () => setClick(!click);
    const toggleDropdown = () => setDropdown(prev => !prev);

    const bookClick = () => {
        navigate("/book");
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
        if (user) {
            setIsLoggedIn(true); 
            setUserEmail(user.email); 
        }
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getAllRooms();
                const sortedRooms = response.data.sort((a, b) => a.id - b.id);
                setRooms(sortedRooms);
                const types = sortedRooms.map(room => room.name);
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    // Handle logout
    const handleLogout = () => {
        logout(); 
        setIsLoggedIn(false); 
        setUserEmail(""); 
        navigate("/home"); 
    };

    return (
        <Container>
            <BookNowBtn2 onClick={bookClick}>BOOK NOW</BookNowBtn2>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem><Link to="/home">HOME</Link></NavItem>
                        <NavItem onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <Link to="/rooms"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.reload();
                            }}>ROOMS & SUITES</Link>
                            <DropdownMenu $dropdown={dropdown}>
                            {roomTypes.map((roomType, index) => (
                                    <DropdownItem key={index}>
                                        <Link to={`/rooms/${roomType.toLowerCase()}`}>{roomType}</Link>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </NavItem>
                        <NavItem><Link to="/experience">EXPERIENCES</Link></NavItem>
                        <NavItem><Link to="/reviews">REVIEWS</Link></NavItem>
                        <NavItem onClick={handleClick}>{click ? (
                                <StyledXIcon size={24} />
                            ) : (
                                <StyledMenuIcon size={24} />
                            )}
                            <MenuIconDropdown $dropdown={click} $isLoggedIn={isLoggedIn}>
                                {isLoggedIn ? (
                                    <>
                                        <DropdownItem>{userEmail}</DropdownItem>
                                        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownItem><Link to="/login">Login</Link></DropdownItem>
                                        <DropdownItem><Link to="/signup">Sign Up</Link></DropdownItem>
                                    </>
                                )}
                            </MenuIconDropdown>
                        </NavItem>
                    </NavList>
                </Nav>
            </NavContainer>
            <Content>
                <AboutContainer>
                    <h1>
                        <span>ROOMS</span>
                        &nbsp;
                        <span>&</span>
                        &nbsp;
                        <span>SUITES</span>
                    </h1>
                    <p>Indulge in luxury with our beautifully designed rooms and suites, offering the perfect blend of comfort and elegance for every guest</p>
                    <BookNowBtn2 onClick={bookClick}>Book Now</BookNowBtn2>
                </AboutContainer>
                <RoomContainer>
                    <RoomText>
                        <h1>
                            <span style={{ color: "black" }}>CHOOSE YOUR</span>
                            <span> PERFECT STAY</span>
                        </h1>
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
                                            {room.roomType === "Suite" && (
                                                <IconText>
                                                    <ExpandIcon size={20} color="#B77729" />
                                                    <span> {room.area} m²</span>
                                                </IconText>
                                            )}
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
                </RoomContainer>
            </Content>
        </Container>
    );
}

export default Room;
