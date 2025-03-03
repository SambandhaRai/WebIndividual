import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    Content,
    ContactContainer,
    ContactInfo,
    InfoItem,
    InfoIcon,
    InfoText,
} from "../styles/contact";
import { getAllExperiences, getAllRooms, logout } from "../apis/api";
import { Mail, Phone, MapPin } from "lucide-react"; // Icons for contact info

function Contact() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [experiences, setExperiences] = useState([]); // State to store experiences
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [rooms, setRooms] = useState([]); // State to store rooms
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const toggleDropdown = () => setDropdown(prev => !prev);

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
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem><Link to="/home">HOME</Link></NavItem>
                        <NavItem onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <Link to="/rooms">ROOMS & SUITES</Link>
                            <DropdownMenu $dropdown={dropdown}>
                                {/* Dynamically render rooms from API */}
                                {rooms.map((room) => (
                                    <DropdownItem key={room.id}>
                                        <Link to={`/rooms`}>{room.name}</Link>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </NavItem>
                        <NavItem>
                            <Link
                                to="/experience"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.reload();
                                }}
                            >
                                EXPERIENCES
                            </Link>
                        </NavItem>
                        <NavItem><Link to="/contact">CONTACT US</Link></NavItem>
                        <NavItem onClick={handleClick} onAbort={handleClick}>
                            {click ? (
                                <StyledXIcon size={24} />  // Render X (cross) when clicked
                            ) : (
                                <StyledMenuIcon size={24} /> // Render MenuIcon when not clicked
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
                <ContactContainer>
                    <ContactInfo>
                        <h2>Contact Information</h2>
                        <InfoItem>
                            <InfoIcon>
                                <Mail size={20} />
                            </InfoIcon>
                            <InfoText>resortsupport@gmail.com</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoIcon>
                                <Phone size={20} />
                            </InfoIcon>
                            <InfoText>+977 9860565188</InfoText>
                        </InfoItem>
                        <InfoItem>
                            <InfoIcon>
                                <MapPin size={20} />
                            </InfoIcon>
                            <InfoText>123 Resort Street, Pokhara, Nepal</InfoText>
                        </InfoItem>
                    </ContactInfo>
                </ContactContainer>
            </Content>
        </Container>
    );
}

export default Contact;