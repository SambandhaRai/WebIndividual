import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit, Trash, ExpandIcon, ViewIcon } from "lucide-react";
import { toast } from "react-toastify";
import { getAllRooms, deleteRoom, logout, getAllExperiences, deleteExperience } from "../apis/api";
import { Bed, ShowerHead, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Container,
    Sidebar,
    SidebarNav,
    SidebarContent,
    SideIcons,
    SideIconText,
    Main,
    NavContainer,
    Nav,
    Icons,
    IconText,
    Content,
    FormContainer,
    Title,
    ExpTitle,
    Subtitle,
    RoomCard,
    RoomImage,
    RoomInfo,
    RoomInfoText,
    EditButton,
    DeleteButton,
    AddRoomButton,
    LoadingContainer,
    LoadingDots,
    LoadingDot,
    LoadingText,
    RoomIcons,
    RoomIconText,
    PriceIconText,
    HorizontalScrollContainer,
    ExpCard,
    ExpImage,
    ExpInfo,
    ExpInfoText
} from "../styles/dashboard";

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const roomsResponse = await getAllRooms();
                const experiencesResponse = await getAllExperiences(); // Assuming you have this API function
                setRooms(roomsResponse.data);
                setExperiences(experiencesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch all rooms when the component mounts
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await getAllRooms();
                setRooms(response.data); // Assuming the response has a `data` field containing the rooms
            } catch (error) {
                console.error("Error fetching rooms:", error);
                toast.error("Failed to fetch rooms. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Handle room deletion
    const handleDeleteRoom = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await deleteRoom(id);
                toast.success("Room deleted successfully!");
                setRooms(rooms.filter((room) => room.id !== id)); // Remove the deleted room from the list
            } catch (error) {
                console.error("Error deleting room:", error);
                toast.error("Failed to delete room. Please try again.");
            }
        }
    };

    // Handle room edit
    const handleEditRoom = (id) => {
        navigate(`/adminupd/${id}`); // Navigate to the update page
    };

    // Handle experience deletion
    const handleDeleteExperience = async (id) => {
        if (window.confirm("Are you sure you want to delete this experience?")) {
            try {
                await deleteExperience(id); // Assuming you have this API function
                toast.success("Experience deleted successfully!");
                setExperiences(experiences.filter((experience) => experience.id !== id));
            } catch (error) {
                console.error("Error deleting experience:", error);
                toast.error("Failed to delete experience. Please try again.");
            }
        }
    };

    // Handle experience edit
    const handleEditExperience = (id) => {
        navigate(`/updexp/${id}`); // Navigate to the update experience page
    };

    // Handle logout
    const handleLogout = () => {
        logout();
    };

    return (
        <Container>
            <Sidebar>
                <SidebarNav>
                    <Link to="/dashboard">
                    <Icons>
                        <IconText>
                            <MenuIcon size={25} color="black" />
                            <span> Dashboard</span>
                        </IconText>
                    </Icons>
                    </Link>
                </SidebarNav>
                <SidebarContent>
                    <Link to="/adminadd">
                        <SideIcons>
                            <SideIconText>
                                <PlusSquare size={25} color="black" />
                                <span> Add Room</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/adminupd">
                        <SideIcons>
                            <SideIconText>
                                <Edit size={25} color="black" />
                                <span> Update Room</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/addexp">
                        <SideIcons>
                            <SideIconText>
                                <PlusSquare size={25} color="black" />
                                <span> Add Experience</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/updexp">
                        <SideIcons>
                            <SideIconText>
                                <Edit size={25} color="black" />
                                <span> Update Experience</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <Link to="/viewbooking">
                        <SideIcons>
                            <SideIconText>
                                <ViewIcon size={25} color="black" />
                                <span> View Booking</span>
                            </SideIconText>
                        </SideIcons>
                    </Link>
                    <SideIcons>
                        <SideIconText onClick={handleLogout}>
                            <LogOut size={25} color="black" />
                            <span> Logout</span>
                        </SideIconText>
                    </SideIcons>
                </SidebarContent>
            </Sidebar>
            <Main>
                <NavContainer>
                    <Nav>
                        <h1>ADMIN</h1>
                    </Nav>
                </NavContainer>
                <Content>
                <FormContainer>
                    {/* Rooms Section */}
                    <Title>ROOMS</Title>
                    <Subtitle>Manage your rooms here</Subtitle>
                    <AddRoomButton onClick={() => navigate("/adminadd")}>
                        <PlusSquare size={20} /> Add New Room
                    </AddRoomButton>
                    {loading ? (
                        <LoadingContainer>
                            <LoadingDots>
                                <LoadingDot />
                                <LoadingDot />
                                <LoadingDot />
                            </LoadingDots>
                            <LoadingText>Loading Rooms...</LoadingText>
                        </LoadingContainer>
                    ) : (
                        <HorizontalScrollContainer>
                            {rooms.map((room) => (
                                <RoomCard key={room.id}>
                                    <RoomImage src={room.imageUrl} alt={room.name} />
                                    <RoomInfo>
                                        <h2>{room.name}</h2>
                                        <RoomInfoText>
                                            <p>{room.details}</p>
                                        </RoomInfoText>
                                        <hr />
                                        <RoomIcons>
                                            <RoomIconText>
                                                <Bed size={20} color="#B77729" />
                                                <span> {room.bedType}</span>
                                            </RoomIconText>
                                            {room.roomType === "Suite" && (
                                                <RoomIconText>
                                                    <ExpandIcon size={20} color="#B77729" />
                                                    <span> {room.area} m²</span>
                                                </RoomIconText>
                                            )}
                                            <RoomIconText>
                                                <ShowerHead size={20} color="#B77729" />
                                                <span> {room.bathroom}</span>
                                            </RoomIconText>
                                            <RoomIconText>
                                                <UsersIcon size={20} color="#B77729" />
                                                <span> {room.adultOccupants} + {room.childOccupants}</span>
                                            </RoomIconText>
                                        </RoomIcons>
                                        <hr />
                                        <PriceIconText>
                                            <span>Price: {room.price} NPR</span>
                                        </PriceIconText>
                                        <hr />
                                        <EditButton onClick={() => handleEditRoom(room.id)}>
                                            <Edit size={18} /> Edit
                                        </EditButton>
                                        <DeleteButton onClick={() => handleDeleteRoom(room.id)}>
                                            <Trash size={18} /> Delete
                                        </DeleteButton>
                                    </RoomInfo>
                                </RoomCard>
                            ))}
                        </HorizontalScrollContainer>
                    )}

                    {/* Experiences Section */}
                    <ExpTitle>EXPERIENCES</ExpTitle>
                    <Subtitle>Manage your experiences here</Subtitle>
                    <AddRoomButton onClick={() => navigate("/addexp")}>
                        <PlusSquare size={20} /> Add New Experience
                    </AddRoomButton>
                    {loading ? (
                        <LoadingContainer>
                            <LoadingDots>
                                <LoadingDot />
                                <LoadingDot />
                                <LoadingDot />
                            </LoadingDots>
                            <LoadingText>Loading Experiences...</LoadingText>
                        </LoadingContainer>
                    ) : (
                        <HorizontalScrollContainer>
                            {experiences.map((experience) => (
                                <ExpCard key={experience.id}>
                                    <ExpImage src={experience.imageUrl} alt={experience.expName} />
                                    <ExpInfo>
                                        <h2>{experience.expName}</h2>
                                        <ExpInfoText>
                                            <p>{experience.expDetails}</p>
                                        </ExpInfoText>
                                        <hr />
                                        <EditButton onClick={() => handleEditExperience(experience.id)}>
                                            <Edit size={18} /> Edit
                                        </EditButton>
                                        <DeleteButton onClick={() => handleDeleteExperience(experience.id)}>
                                            <Trash size={18} /> Delete
                                        </DeleteButton>
                                    </ExpInfo>
                                </ExpCard>
                            ))}
                        </HorizontalScrollContainer>
                    )}
                    </FormContainer>
                </Content>
            </Main>
        </Container>
    );
};

export default Dashboard;