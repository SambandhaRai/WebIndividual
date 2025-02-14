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
                    <ViewAllBtn>View All</ViewAllBtn>
                </RoomContainer>
            </Content>
        </Container>
    );
}

export default NavBar;