import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit, ViewIcon } from "lucide-react";
import { toast } from "react-toastify";
import { createExperience, logout } from "../apis/api";
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
    Input,
    Button,
    Title,
    Subtitle,
    FormGroup,
    TextArea,
} from "../styles/addExp"; // Assuming you created styles for addExperience

const AdminAddExp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [expDetails, setExpDetails] = useState("");
    const [expImage, setExpImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExpDetailsChange = (event) => {
        setExpDetails(event.target.value);
    };

    const handleImageChange = (e) => {
        setExpImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!data.expName || !expDetails || !expImage) {
            toast.error("All fields are required!");
            return;
        }
    
        const formData = new FormData();
        formData.append("expName", data.expName);
        formData.append("expDetails", expDetails);
        formData.append("image", expImage);
    
        setLoading(true);
    
        try {
            const res = await createExperience(formData);
            toast.success(res.message || "Experience added successfully!");
    
            reset();
            setExpDetails("");
            setExpImage(null);
            document.getElementById("expImage").value = "";
    
            setTimeout(() => navigate("/addexp"), 1000);
        } catch (err) {
            console.error('Create Experience Error:', err.response || err);
            toast.error(err.response?.data?.message || "Failed to add experience. Please try again.");
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
                <   Link to="/adminadd">
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
                        <Title>ADD EXPERIENCE</Title>
                        <Subtitle>Please fill in the required credentials</Subtitle>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <FormGroup>
                                <label htmlFor="expImage">Experience Image</label>
                                <Input
                                    type="file"
                                    id="expImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={loading}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="expName">Experience Name</label>
                                <Input
                                    {...register("expName", { required: "Please write the Experience Name" })}
                                    type="text"
                                    id="expName"
                                    placeholder="Enter Experience Name"
                                    disabled={loading}
                                />
                                {errors.expName && <p style={{ color: "red" }}>{errors.expName.message}</p>}
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="expDetails">Experience Details</label>
                                <TextArea
                                    {...register("expDetails", {
                                        required: "Please write the details for the experience",
                                        maxLength: {
                                            value: 90000,
                                            message: "Details cannot exceed 65,535 characters",
                                        },
                                    })}
                                    id="expDetails"
                                    placeholder="Enter the Experience Details"
                                    value={expDetails}
                                    onChange={handleExpDetailsChange}
                                    rows={4}
                                    disabled={loading}
                                    maxLength={90000}
                                />
                                {errors.expDetails && <p style={{ color: "red" }}>{errors.expDetails.message}</p>}
                            </FormGroup>

                            <Button type="submit" disabled={loading}>Add Experience</Button>
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

export default AdminAddExp;
