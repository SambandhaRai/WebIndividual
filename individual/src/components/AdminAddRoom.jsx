import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut } from "lucide-react";
import { toast } from "react-toastify";  // Make sure you import toast
import { createRoom, logout } from "../apis/api";  // Import logout
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
    RadioButtonContainer,
    RadioInput,
    RadioLabel,
    Input,
    Button,
    Title,
    Subtitle,
    FormGroup,
    TextArea
} from "../styles/addRoom";

const AdminDashboard = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [roomImage, setRoomImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRoomDetailsChange = (event) => {
        setRoomDetails(event.target.value);
    };

    const handleImageChange = (e) => {
        setRoomImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!data.roomName || !roomDetails || !roomImage) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.roomName);
        formData.append("details", roomDetails);
        formData.append("features", JSON.stringify(selectedFeatures));
        formData.append("image", roomImage);

        setLoading(true); // Set loading to true when submitting

        try {
            const res = await createRoom(formData);
            toast.success(res.message || "Room created successfully!");
            reset();
            setRoomImage(null);
            setTimeout(() => navigate("/adminadd"), 1000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create room. Please try again.");
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    const handleFeatureChange = (value) => {
        setSelectedFeatures((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((feature) => feature !== value)
                : [...prevSelected, value]
        );
    };

    const handleLogout = () => {
        logout(); 
    };

    return (
        <Container>
            <Sidebar>
                <SidebarNav>
                    <Icons>
                        <IconText>
                            <MenuIcon size={25} color="black" />
                            <span> Dashboard</span>
                        </IconText>
                    </Icons>
                </SidebarNav>
                <SidebarContent>
                    <SideIcons>
                        <SideIconText>
                            <PlusSquare size={25} color="black" />
                            <span> Add Room</span>
                        </SideIconText>
                    </SideIcons>
                    <SideIcons>
                        <SideIconText onClick={handleLogout}> {/* Added logout handler */}
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
                                    disabled={loading}  // Disable while loading
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="roomName">Room Name</label>
                                <Input 
                                    {...register("roomName", { required: "Please write the Room Name" })}
                                    type="text" 
                                    id="roomName" 
                                    placeholder="Enter Room Name" 
                                    disabled={loading}  // Disable while loading
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
                                    disabled={loading}  // Disable while loading
                                />
                                {errors.roomDetails && <p style={{ color: "red" }}>{errors.roomDetails.message}</p>}
                            </FormGroup>

                            <FormGroup>
                                <label>Features</label>
                                <RadioButtonContainer>
                                    {["Double Bed", "Twin Bed", "Bathroom"].map((feature) => (
                                        <RadioLabel key={feature}>
                                            <RadioInput 
                                                type="checkbox"
                                                value={feature}
                                                checked={selectedFeatures.includes(feature)}
                                                onChange={() => handleFeatureChange(feature)}
                                                disabled={loading}  // Disable while loading
                                            />
                                            {feature.replace(/([A-Z])/g, " $1")}
                                        </RadioLabel>
                                    ))}
                                </RadioButtonContainer>
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

export default AdminDashboard;
