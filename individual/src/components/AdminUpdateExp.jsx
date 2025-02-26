import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { MenuIcon, PlusSquare, LogOut, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { getExperienceById, updateExperience, logout, getAllExperiences } from "../apis/api";
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
} from "../styles/updateExp"; // Ensure this path is correct

const AdminUpdate = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();  // Getting the experience ID from URL params
    const [expDetails, setExpDetails] = useState("");
    const [expImage, setExpImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const expSelectRef = useRef(null);

    // Fetch all experiences if there is no id in the URL
    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await getAllExperiences();
                setExperiences(response.data);
            } catch (error) {
                console.error("Error fetching experiences:", error);
                toast.error("Failed to fetch experiences. Please try again.");
            }
        };

        if (!id) {
            fetchExperiences();
        } else {
            // If there's an id, fetch the experience by id directly
            handleExpSelect(id);
        }
    }, [id]);

    // Handle experience selection if id is not passed
    const handleExpSelect = async (expId) => {
        try {
            const response = await getExperienceById(expId);
            console.log("API Response:", response);

            if (!response.experience) {
                toast.error("Experience data not found in the response.");
                return;
            }

            const experience = response.experience;
            setSelectedExperience(experience);

            // Reset the form with the selected experience's data
            reset({
                expName: experience.expName,
            });

            setExpDetails(experience.expDetails);
        } catch (error) {
            console.error("Error fetching experience details:", error);
            toast.error("Failed to fetch experience details. Please try again.");
        }
    };

    const handleExpDetailsChange = (event) => {
        setExpDetails(event.target.value);
    };

    const handleImageChange = (e) => {
        setExpImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!selectedExperience) {
            toast.error("Please select an experience to update.");
            return;
        }

        if (!data.expName || !expDetails) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("expName", data.expName);
        formData.append("expDetails", expDetails);

        if (expImage) {
            formData.append("image", expImage);
        }

        setLoading(true);

        try {
            const res = await updateExperience(selectedExperience.id, formData);
            toast.success(res.message || "Experience updated successfully!");

            reset({
                expName: "",
            });

            setExpDetails("");
            setExpImage(null);
            setSelectedExperience(null);

            if (expSelectRef.current) {
                expSelectRef.current.value = "";
            }
        } catch (err) {
            console.error('Update Experience Error:', err.response || err);
            toast.error(err.response?.data?.message || "Failed to update experience. Please try again.");
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
                        <Title>UPDATE EXPERIENCE</Title>
                        <Subtitle>Please update the required credentials</Subtitle>

                        {/* Conditionally render the experience selector */}
                        {!id && (
                            <FormGroup>
                                <label htmlFor="expSelect">Select Experience</label>
                                <Select
                                    id="expSelect"
                                    ref={expSelectRef}
                                    onChange={(e) => handleExpSelect(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select an experience</option>
                                    {experiences.map((experience) => (
                                        <option key={experience.id} value={experience.id}>
                                            {experience.expName}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>
                        )}

                        {/* Update Experience Form */}
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <label htmlFor="expImage">Experience Image</label>
                                <Input
                                    type="file"
                                    id="expImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={loading}
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

                            <Button type="submit" disabled={loading}>Update Experience</Button>
                        </Form>
                    </FormContainer>
                </Content>
            </Main>
        </Container>
    );
};

export default AdminUpdate;