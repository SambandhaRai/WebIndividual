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
    AboutContainer,
    Content,
    ExperienceContainer,
    ExpImage,
    Exp,
    ExpInfo,
    BookNowBtn2
} from "../styles/experience";
import { getAllExperiences, getAllRooms, logout } from "../apis/api";

function Experiences() {
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

    // Fetch experiences from the database
    useEffect(() => {
        const fetchExperiences = async () => {
            setLoading(true);
            try {
                const response = await getAllExperiences(); 
                // Arranging
                const sortedExperiences = response.data.sort((a, b) => a.id - b.id);
                setExperiences(sortedExperiences); // Set the sorted data to state
            } catch (error) {
                console.error("Error fetching experiences:", error);
                setError("Failed to fetch experiences. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    // Fetch rooms from the database
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await getAllRooms(); 
                const sortedRooms = response.data.sort((a, b) => a.id - b.id); // Sort rooms based on ID
                setRooms(sortedRooms); // Set rooms data
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError("Failed to fetch rooms. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const bookClick = () => {
        navigate("/book"); 
    };

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
                        <NavItem><Link to="/experience"
                        onClick={(e) => {
                            e.preventDefault(); 
                            window.location.reload(); 
                        }}>EXPERIENCES</Link></NavItem>
                        <NavItem><Link to="/contact">CONTACT US</Link></NavItem>
                        <NavItem onClick={handleClick} onAbort={handleClick}>{click ? (
                                <StyledXIcon size={24} />  // Render X (cross) when clicked
                            ) : (
                                <StyledMenuIcon size={24} />// Render MenuIcon when not clicked
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
                    <h1>EXPERIENCES</h1>
                    <p>Rejuvenate yourself in an oasis of calm and tranquility</p>
                    <BookNowBtn2>Book Now</BookNowBtn2>
                </AboutContainer>
                {loading ? (
                    <p>Loading experiences...</p> // Show loading message
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p> // Show error message
                ) : (
                    <ExperienceContainer>
                        {experiences.map((exp, index) => (
                            <Exp key={exp.id}>
                                <ExpImage 
                                    src={exp.imageUrl} 
                                    alt={exp.expName}
                                    style={{ order: index % 2 === 0 ? 1 : 2 }} 
                                />
                                <ExpInfo style={{ order: index % 2 === 0 ? 2 : 1 }}>
                                    <hr />
                                    <h1>{exp.expName}</h1>
                                    <p>{exp.expDetails}</p>
                                    <hr />
                                </ExpInfo>
                            </Exp>
                        ))}
                    </ExperienceContainer>
                )}
            </Content>
        </Container>
    );
}

export default Experiences;
