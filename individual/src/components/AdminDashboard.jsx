import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { createRoom } from "../apis/api";
import { Link } from "react-router-dom";
import {
    Container,
    NavContainer,
    Nav,
    NavItem,
    NavList,
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
} from "../styles/adminDsh";

const AdminDashboard = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [roomDetails, setRoomDetails] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState([]); // Track selected features as an array

    const handleRoomDetailsChange = (event) => {
        setRoomDetails(event.target.value);
    };

    const onSubmit = async (data) => {
        console.log("Submitting form with createRoom API...", data);
    
        // Validate that all required fields are filled
        if (!data.roomName || !data.roomDetails || !data.image[0]) {
            toast.error("All fields are required!");
            return;
        }
    
        // Create FormData to send with the request
        const formData = new FormData();
        formData.append("name", data.roomName);
        formData.append("details", data.roomDetails);
        formData.append("features", JSON.stringify(selectedFeatures));  // Send selected features as JSON
        formData.append("image", data.image[0]);
    
        try {
            console.log("📤 Sending Room Data:", formData);
            const res = await createRoom(formData);  // Send FormData to backend
            console.log("📥 Backend Response:", res);
    
            if (res.status === 201) {
                toast.success(res.data.message || "Room created successfully!", { className: "toast-success" });
                console.log("Navigating to dashboard...");
                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                toast.error(res.data.message || "Room creation failed!", { className: "toast-error" });
            }
        } catch (err) {
            console.error("❌ Room creation error:", err);
            toast.error(err.response?.data?.message || "Failed to create room. Please try again.");
        }
    
        reset();
    };
    
        

    // Handle feature change: add/remove from the selectedFeatures array
    const handleFeatureChange = (value) => {
        setSelectedFeatures((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((feature) => feature !== value); // Remove feature
            } else {
                return [...prevSelected, value]; // Add feature
            }
        });
    };    

    return (
        <Container>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem>
                                <Icons>
                                    <IconText>
                                        <ArrowLeft size={20} color="black" />
                                        <span> Menu</span>
                                    </IconText>
                                </Icons>
                        </NavItem>
                    </NavList>
                </Nav>
            </NavContainer>
            <Content>
                <FormContainer>
                    <Title>ADD ROOM</Title>
                    <Subtitle>Please fill the required credentials</Subtitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <FormGroup>
                            <label htmlFor="image">Room Image</label>
                            <Input 
                                {...register("image", { required: "Please upload an image" })} 
                                type="file" 
                                id="image" 
                                placeholder="Upload Image"
                            />
                            {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="roomName">Room Name</label>
                            <Input 
                                {...register("roomName", { required: "Please write the Room Name" })}
                                type="text" 
                                id="roomName" 
                                placeholder="Enter Room Name" 
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
                            />
                            {errors.roomDetails && <p style={{ color: "red" }}>{errors.roomDetails.message}</p>}
                        </FormGroup>

                        <FormGroup>
                            <label>Features</label>
                            <RadioButtonContainer>
                                <RadioLabel>
                                    <RadioInput 
                                        {...register("features")}
                                        type="checkbox" 
                                        value="doubleBed" 
                                        checked={selectedFeatures.includes("doubleBed")}
                                        onChange={() => handleFeatureChange("doubleBed")}
                                    />
                                    Double Bed
                                </RadioLabel>
                                <RadioLabel>
                                    <RadioInput 
                                        {...register("features")}
                                        type="checkbox" 
                                        value="twinBed" 
                                        checked={selectedFeatures.includes("twinBed")}
                                        onChange={() => handleFeatureChange("twinBed")}
                                    />
                                    Twin Bed
                                </RadioLabel>
                                <RadioLabel>
                                    <RadioInput 
                                        {...register("features")}
                                        type="checkbox" 
                                        value="bathroom" 
                                        checked={selectedFeatures.includes("bathroom")}
                                        onChange={() => handleFeatureChange("bathroom")}
                                    />
                                    Bathroom
                                </RadioLabel>
                            </RadioButtonContainer>
                        </FormGroup>


                        <Button type="submit">Add Room</Button>

                    </Form>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default AdminDashboard;
