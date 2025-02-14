import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, ShowerHead, UsersIcon } from "lucide-react";
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
import ctg from "../assets/ctgRoom.png";
import prem from "../assets/premRoom.png";
import club from "../assets/clubRoom.jpeg";

function NavBar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const toggleDropdown = () => setDropdown(prev => !prev);

    return (
        <Container>
            <BookNowBtn2>BOOK NOW</BookNowBtn2>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem><Link to="/home">HOME</Link></NavItem>
                        <NavItem onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <Link to="/rooms"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation
                                window.location.reload(); // Reload page
                            }}>ROOMS & SUITES</Link>
                            <DropdownMenu $dropdown={dropdown}>
                            <DropdownItem><Link to="/rooms/cottage">Cottage Room</Link></DropdownItem>
                            <DropdownItem><Link to="/rooms/premium">Premium Room</Link></DropdownItem>
                            <DropdownItem><Link to="/rooms/club">Club Room</Link></DropdownItem>
                            </DropdownMenu>
                        </NavItem>
                        <NavItem><Link to="/about">ABOUT</Link></NavItem>
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
                    <h1>
                        <span>ROOMS</span>
                        &nbsp;
                        <span>&</span>
                        &nbsp;
                        <span>SUITES</span>
                    </h1>
                    {/* <hr /> */}
                    <p>Indulge in luxury with our beautifully designed rooms and suites, offering the perfect blend of comfort and elegance for every guest</p>
                    <BookNowBtn2>Book Now</BookNowBtn2>
                </AboutContainer>
                <RoomContainer>
                    <RoomText>
                        <h1>CHOOSE YOUR PERFECT STAY</h1>
                        <p>Choose your perfect stay in our elegantly appointed rooms, where luxury meets comfort. Each room offers a serene retreat with stunning views, ensuring a memorable and restful experience.</p>
                    </RoomText>
                    <Rooms>
                        <RoomCard>
                            <RoomImage src={ctg} alt="Cottage Room" />
                            <RoomInfo>
                                <h2>Cottage Room</h2>
                                <RoomInfoText>
                                    <p>Unwind and find your inner peace as you relax in our fully air-conditioned Cottage Rooms.</p>
                                </RoomInfoText>
                                <hr />
                                    <Icons>
                                        <IconText>
                                            <Bed size={20} color="#B77729" />
                                            <span> Double/Twin Beds</span>
                                        </IconText>
                                        <IconText>
                                            <ShowerHead size={20} color="#B77729" />
                                            <span> Not Included</span>
                                        </IconText>
                                        <IconText>
                                            <UsersIcon size={20} color="#B77729" />
                                            <span> 2 Adults + 1 Child</span>
                                        </IconText>
                                    </Icons>
                                <hr />
                            </RoomInfo>
                            <LearnMoreBtn>Learn More</LearnMoreBtn>
                            <BookNowBtn>Book Now</BookNowBtn>
                        </RoomCard>

                        <RoomCard>
                            <RoomImage src={prem} alt="Premium Room" />
                            <RoomInfo>
                                <h2>Premium Room</h2>
                                <RoomInfoText>
                                    <p>Immerse yourself in timeless elegance and comfort within our Premium Rooms, where heritage-inspired architecture meets modern luxury.</p>
                                </RoomInfoText>
                                <hr />
                                    <Icons>
                                        <IconText>
                                            <Bed size={20} color="#B77729" />
                                            <span> Double/Twin Beds</span>
                                        </IconText>
                                        <IconText>
                                            <ShowerHead size={20} color="#B77729" />
                                            <span> 1 Bathroom</span>
                                        </IconText>
                                        <IconText>
                                            <UsersIcon size={20} color="#B77729" />
                                            <span> 2 Adults + 1 Child</span>
                                        </IconText>
                                    </Icons>
                                <hr />
                            </RoomInfo>
                            <LearnMoreBtn>Learn More</LearnMoreBtn>
                            <BookNowBtn>Book Now</BookNowBtn>
                        </RoomCard>

                        <RoomCard>
                            <RoomImage src={club} alt="Club Room" />
                            <RoomInfo>
                                <h2>Club Room</h2>
                                <RoomInfoText>
                                    <p>Experience the perfect blend of tradition and sophistication in our Club Rooms, offering warm, inviting interiors designed for a serene and memorable stay.</p>
                                </RoomInfoText>
                                    <hr />
                                        <Icons>
                                            <IconText>
                                                <Bed size={20} color="#B77729" />
                                                <span> Double/Twin Beds</span>
                                            </IconText>
                                            <IconText>
                                                <ShowerHead size={20} color="#B77729" />
                                                <span> 1 Bathroom</span>
                                            </IconText>
                                            <IconText>
                                                <UsersIcon size={20} color="#B77729" />
                                                <span> 2 Adults + 1 Child</span>
                                            </IconText>
                                        </Icons>
                                    <hr />
                            </RoomInfo>
                            <LearnMoreBtn>Learn More</LearnMoreBtn>
                            <BookNowBtn>Book Now</BookNowBtn>
                        </RoomCard>
                    </Rooms>
                </RoomContainer>
            </Content>
        </Container>
    );
}

export default NavBar;