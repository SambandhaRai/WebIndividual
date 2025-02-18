import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    ExperienceContainer,
    ExpImage,
    Exp,
    ExpInfo,
    BookNowBtn2
} from "../styles/experience";
import hspa from "../assets/hspa.jpeg"
import bar from "../assets/bar.png"
import fbath from "../assets/fbath.png"



function Room() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const toggleDropdown = () => setDropdown(prev => !prev);

    const experiences = [
        {
            image: hspa,
            title: "SPA & SWIMMING POOL",
            description: (
                <>
                  An oasis of calm and tranquility, located deep within a protected forest, our luxury spa and health club welcome members and guests with a wide range of facilities and services.
                  <br />
                  <br />
                  An oasis of calm and tranquility, located deep within a protected forestMelt your cares away as you rejuvenate yourself in an oasis of calm and tranquility deep within the heart of the Forest at the Harmony Spa and Health Club. Our relaxing indoor swimming pool is one-of-a-kind in Nepal. 
                                It is the perfect place to cool down and unwind after a jungle walk, a workout at the gym.
                </>
              )
        },
        {
            image: bar,
            title: "DINING & BAR",
            description: "The Resort offers a refined dining experience with a focus on quality and flavor. Our culinary philosophy is centered around using the finest ingredients to craft exceptional dishes that cater to every palate. Whether you're in the mood for a relaxed meal or a more sophisticated dining experience, our diverse offerings promise a unique and memorable gastronomic journey. Every meal is a celebration of exquisite flavors, carefully prepared to ensure your satisfaction."
        },
        {
            image: fbath,
            title: "FOREST BATHING",
            description: (
                <>
                  Unwind and reconnect with nature through Forest Bathing at the Resort. This ancient Japanese practice encourages you to immerse yourself in the sights, sounds, and scents of the forest, fostering deep relaxation and mental clarity.
                  <br />
                  <br />
                  As you wander through the centuries-old protected forest, our expert guides will help you embrace the healing power of nature. Breathe in the fresh air, listen to the gentle rustling of the leaves, and let the calmness of the forest restore your inner balance. A perfect escape to rejuvenate both body and mind.
                </>
            )
        }
    ];

    return (
        <Container>
            <BookNowBtn2>BOOK NOW</BookNowBtn2>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem><Link to="/home">HOME</Link></NavItem>
                        <NavItem onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <Link to="/rooms">ROOMS & SUITES</Link>
                            <DropdownMenu $dropdown={dropdown}>
                                <DropdownItem><Link to="/rooms/cottage">Cottage Room</Link></DropdownItem>
                                <DropdownItem><Link to="/rooms/premium">Premium Room</Link></DropdownItem>
                                <DropdownItem><Link to="/rooms/club">Club Room</Link></DropdownItem>
                            </DropdownMenu>
                        </NavItem>
                        <NavItem><Link to="/experience"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            window.location.reload(); // Reload page
                        }}>EXPERIENCES</Link></NavItem>
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
                    <h1>EXPERIENCES</h1>
                    <p>Rejuvenate yourself in an oasis of calm and tranquility</p>
                    <BookNowBtn2>Book Now</BookNowBtn2>
                </AboutContainer>
                <ExperienceContainer>
                {experiences.map((exp, index) => (
                    <Exp key={index}>
                        <ExpImage 
                            src={exp.image} 
                            alt={exp.title} 
                            style={{ order: index % 2 === 0 ? 1 : 2 }} 
                        />
                        <ExpInfo style={{ order: index % 2 === 0 ? 2 : 1 }}>
                                <hr />
                                <h1>{exp.title}</h1>
                                <p>{exp.description}</p>
                                <hr />
                        </ExpInfo>
                        </Exp>
                ))}
                </ExperienceContainer>
            </Content>
        </Container>
    );
}


export default Room;