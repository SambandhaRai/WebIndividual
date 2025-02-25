import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { getRoomById, updateRoom, logout, getAllRooms } from "../apis/api";
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
    Form,
    Select,
    Input,
    Button,
    Title,
    Subtitle,
    FormGroup,
    TextArea,
} from "../styles/updateRoom";

const AdminUpdate = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [roomDetails, setRoomDetails] = useState("");
    const [roomImage, setRoomImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const roomSelectRef = useRef(null); // Ref for the room select dropdown

    // Fetch all rooms when the component mounts
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getAllRooms();
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                toast.error("Failed to fetch rooms. Please try again.");
            }
        };

        fetchRooms();
    }, []);

    // Handle room selection
    const handleRoomSelect = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            console.log("API Response:", response); // Log the full response

            // Check if the response contains valid room data
            if (!response.room) {
                toast.error("Room data not found in the response.");
                return;
            }

            const room = response.room; // Access the room object directly
            setSelectedRoom(room);

            // Reset the form with the selected room's data
            reset({
                roomName: room.name,
                bedType: room.bedType,
                bathroom: room.bathroom,
                AdultOccupants: room.adultOccupants,
                ChildOccupants: room.childOccupants,
            });

            setRoomDetails(room.details);
        } catch (error) {
            console.error("Error fetching room details:", error);
            toast.error("Failed to fetch room details. Please try again.");
        }
    };

    const handleRoomDetailsChange = (event) => {
        setRoomDetails(event.target.value);
    };

    const handleImageChange = (e) => {
        setRoomImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!selectedRoom) {
            toast.error("Please select a room to update.");
            return;
        }

        if (!data.roomName || !roomDetails || !data.bedType || !data.bathroom || !data.AdultOccupants || !data.ChildOccupants) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.roomName);
        formData.append("details", roomDetails);
        formData.append("bedType", data.bedType);
        formData.append("bathroom", data.bathroom);
        formData.append("adultOccupants", String(data.AdultOccupants));
        formData.append("childOccupants", String(data.ChildOccupants));

        if (roomImage) {
            formData.append("image", roomImage);
        }

        setLoading(true);

        try {
            const res = await updateRoom(selectedRoom.id, formData);
            toast.success(res.message || "Room updated successfully!");

            // Reset the form fields to their default values
            reset({
                roomName: "", // Clear room name
                bedType: "", // Reset bed type to "Not Selected"
                bathroom: "Not Included", // Reset bathroom to "Not Included"
                AdultOccupants: "0", // Reset adults to "0"
                ChildOccupants: "0", // Reset children to "0"
            });

            // Clear state variables
            setRoomDetails(""); // Clear room details
            setRoomImage(null); // Clear the selected image
            setSelectedRoom(null); // Clear the selected room

            // Reset the room select dropdown
            if (roomSelectRef.current) {
                roomSelectRef.current.value = "";
            }
        } catch (err) {
            console.error('Update Room Error:', err.response || err);
            toast.error(err.response?.data?.message || "Failed to update room. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                        <Title>UPDATE ROOM</Title>
                        <Subtitle>Please update the required credentials</Subtitle>

                        {/* Room Selector */}
                        <FormGroup>
                            <label htmlFor="roomSelect">Select Room</label>
                            <Select
                                id="roomSelect"
                                ref={roomSelectRef} // Add ref
                                onChange={(e) => handleRoomSelect(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">Select a room</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.name}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        {/* Update Room Form */}
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <label htmlFor="roomImage">Room Image</label>
                                <Input
                                    type="file"
                                    id="roomImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={loading}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="roomName">Room Name</label>
                                <Input 
                                    {...register("roomName", { required: "Please write the Room Name" })}
                                    type="text" 
                                    id="roomName" 
                                    placeholder="Enter Room Name" 
                                    disabled={loading}
                                    defaultValue={selectedRoom ? selectedRoom.name : ""}
                                />
                                {errors.roomName && <p style={{ color: "red" }}>{errors.roomName.message}</p>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="roomDetails">Room Details</label>
                                <TextArea
                                    {...register("roomDetails", { required: "Please write the details for the room" })}
                                    id="roomDetails"
                                    placeholder="Enter the Room Details"
                                    value={roomDetails}
                                    onChange={handleRoomDetailsChange}
                                    rows={4}
                                    disabled={loading}
                                />
                                {errors.roomDetails && <p style={{ color: "red" }}>{errors.roomDetails.message}</p>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="bedType">Bed Type</label> 
                                <Select 
                                    id="bedType" 
                                    {...register("bedType", { required: "Please select a bed type" })}
                                    disabled={loading}
                                    defaultValue={selectedRoom ? selectedRoom.bedType : ""}
                                >
                                    <option value="">Select Bed Type</option>
                                    <option value="Double Bed">Double Bed</option>
                                    <option value="Double/Twin Bed">Double/Twin Bed</option>
                                </Select>
                                {errors.bedType && <p style={{ color: "red" }}>{errors.bedType.message}</p>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="bathroom">Bathroom</label> 
                                <Select 
                                    id="bathroom" 
                                    {...register("bathroom", { required: "Please select bathroom quantity" })}
                                    disabled={loading}
                                    defaultValue={selectedRoom ? selectedRoom.bathroom : ""}
                                >
                                    <option value="Not Included">Not Included</option>
                                    <option value="1 Bathroom">1</option>
                                    <option value="2 Bathroom">2</option>
                                </Select>
                                {errors.bathroom && <p style={{ color: "red" }}>{errors.bathroom.message}</p>}
                            </FormGroup> 

                            <FormGroup>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ width: '48%' }}>
                                        <label htmlFor="AdultOccupants">Adults</label> 
                                        <Select 
                                            id="AdultOccupants" 
                                            {...register("AdultOccupants", { required: "Please select number of Adults" })}
                                            disabled={loading}
                                            defaultValue="0" // Set default value to "0"
                                        >
                                            <option value="0">0</option>
                                            <option value="1 Adult">1</option>
                                            <option value="2 Adults">2</option>
                                            <option value="3 Adults">3</option>
                                        </Select>
                                        {errors.AdultOccupants && <p style={{ color: "red" }}>{errors.AdultOccupants.message}</p>}
                                    </div>

                                    <div style={{ width: '48%' }}>
                                        <label htmlFor="ChildOccupants">Children</label> 
                                        <Select 
                                            id="ChildOccupants" 
                                            {...register("ChildOccupants", { required: "Please select number of Children" })}
                                            disabled={loading}
                                            defaultValue="0" // Set default value to "0"
                                        >
                                            <option value="0">0</option>
                                            <option value="1 Child">1</option>
                                        </Select>
                                        {errors.ChildOccupants && <p style={{ color: "red" }}>{errors.ChildOccupants.message}</p>}
                                    </div>
                                </div>
                            </FormGroup>

                            <Button type="submit" disabled={loading}>Update Room</Button>
                        </Form>
                    </FormContainer>
                </Content>
            </Main>
        </Container>
    );
};

export default AdminUpdate;