import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { getAllRooms, deleteRoom, logout } from "../apis/api";
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
    Subtitle,
    RoomGrid,
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
} from "../styles/dashboard";

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        navigate(`/update/${id}`); // Navigate to the update page
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
                            <RoomGrid>
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
                                                <EditButton onClick={() => handleEditRoom(room.id)}>
                                                    <Edit size={18} /> Edit
                                                </EditButton>
                                                <DeleteButton onClick={() => handleDeleteRoom(room.id)}>
                                                    <Trash size={18} /> Delete
                                                </DeleteButton>
                                        </RoomInfo>
                                    </RoomCard>
                                ))}
                            </RoomGrid>
                        )}
                    </FormContainer>
                </Content>
            </Main>
        </Container>
    );
};

export default Dashboard;