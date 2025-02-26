import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { createRoom, logout } from "../apis/api";
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
} from "../styles/addRoom"; // Assuming you created loading component in styles

const AdminAdd = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState("");
    const [roomImage, setRoomImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const roomType = watch("roomType");

    const handleRoomDetailsChange = (event) => {
        setRoomDetails(event.target.value);
    };

    const handleImageChange = (e) => {
        setRoomImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!data.roomType || !data.roomName || !roomDetails || !roomImage || !data.bedType || !data.bathroom || !data.AdultOccupants || !data.ChildOccupants || !data.price) {
            toast.error("All fields are required!");
            return;
        }

        if (isNaN(data.price) || data.price <= 0) {
            toast.error("Price must be a positive number!");
            return;
        }

        const formData = new FormData();

        formData.append("roomType", data.roomType);
        formData.append("name", data.roomName);
        formData.append("details", roomDetails);
        formData.append("bedType", data.bedType);
        formData.append("bathroom", data.bathroom);
        formData.append("adultOccupants", String(data.AdultOccupants));
        formData.append("childOccupants", String(data.ChildOccupants));
        formData.append("price", data.price);
        formData.append("image", roomImage);

        if (data.roomType === "Suite" && data.area) {
            formData.append("area", data.area);
        }

        setLoading(true);

        try {
            const res = await createRoom(formData);
            toast.success(res.message || "Room created successfully!");

            reset();
            setRoomDetails("");
            setRoomImage(null);
            document.getElementById("roomImage").value = "";

            setTimeout(() => navigate("/adminadd"), 1000);
        } catch (err) {
            console.error('Create Room Error:', err.response || err);
            toast.error(err.response?.data?.message || "Failed to create room. Please try again.");
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
                        <Title>ADD ROOM</Title>
                        <Subtitle>Please fill the required credentials</Subtitle>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <FormGroup>
                                <label htmlFor="roomImage">Room Image</label>
                                <Input
                                    type="file"
                                    id="roomImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={loading}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="roomType">Room Type</label>
                                <Select
                                    id="roomType"
                                    {...register("roomType", { required: "Please select a room type" })}
                                    disabled={loading}
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="Room">Room</option>
                                    <option value="Suite">Suite</option>
                                </Select>
                                {errors.roomType && <p style={{ color: "red" }}>{errors.roomType.message}</p>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="roomName">Room Name</label>
                                <Input 
                                    {...register("roomName", { required: "Please write the Room Name" })}
                                    type="text" 
                                    id="roomName" 
                                    placeholder="Enter Room Name" 
                                    disabled={loading}
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
                                >
                                    <option value="Not Included">Not Included</option>
                                    <option value="1 Bathroom">1</option>
                                    <option value="2 Bathroom">2</option>
                                </Select>
                                {errors.bathroom && <p style={{ color: "red" }}>{errors.bathroom.message}</p>}
                            </FormGroup> 

                            {roomType === "Suite" && (
                                <FormGroup>
                                    <label htmlFor="area">Area (in m²)</label>
                                    <Input
                                        type="number"
                                        id="area"
                                        {...register("area", {
                                            required: "Please enter the area of the suite",
                                            min: { value: 1, message: "Area must be greater than 0" },
                                        })}
                                        placeholder="Enter area in meter square"
                                        disabled={loading}
                                    />
                                    {errors.area && <p style={{ color: "red" }}>{errors.area.message}</p>}
                                </FormGroup>
                            )}

                            <FormGroup>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ width: '48%' }}>
                                        <label htmlFor="AdultOccupants">Adults</label> 
                                        <Select 
                                            id="AdultOccupants" 
                                            {...register("AdultOccupants", { required: "Please select number of Adults" })}
                                            disabled={loading}
                                        >
                                            <option value="">0</option>
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
                                        >
                                            <option value="0">0</option>
                                            <option value="1 Child">1</option>
                                        </Select>
                                        {errors.ChildOccupants && <p style={{ color: "red" }}>{errors.ChildOccupants.message}</p>}
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="price">Price (per night in NPR)</label>
                                <Input
                                    type="number"
                                    id="price"
                                    {...register("price", {
                                        required: "Please enter the room price",
                                        min: { value: 1, message: "Price must be greater than 0" }
                                    })}
                                    placeholder="Enter price in NPR"
                                    disabled={loading}
                                />
                                {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
                            </FormGroup>


                            <Button type="submit" disabled={loading}>Add Room</Button>
                        </Form>
                    </FormContainer>
                </Content>
            </Main>

            {loading && (
                <div className="loading-container">
                    <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                    </div>
                    <div className="loading-text">Loading...</div>
                </div>
            )}
        </Container>
    );
};

export default AdminAdd;