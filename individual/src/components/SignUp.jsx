import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import axios from "axios";
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
    RadioGroup,
    RadioInput,
    RadioLabel,
    Input,
    Button,
    Title,
    Subtitle,
    FormGroup
} from "../styles/signup";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Signing up with:", data);
    
        axios
            .post(`${API.BASE_URL}/api/auth/signup`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Signup Response:", response.data);
    
                if (response.data && response.data.data.access_token) {
                    console.log("Access Token:", response.data.data.access_token);
                    localStorage.setItem("token", response.data.data.access_token);
                    navigate("/home");
                } else {
                    alert(response.data.message || "Signup failed! Try again.");
                }
            })
            .catch((error) => {
                console.error("Error signing up:", error);
                alert(error.response?.data?.message || "Error signing up. Please try again.");
            });
    
        reset();
    };

    return (
        <Container>
            <NavContainer>
                <Nav>
                    <NavList>
                        <NavItem>
                            <Link to="/home">
                                <Icons>
                                    <IconText>
                                        <Home size={20} color="black" />
                                        <span> Home</span>
                                    </IconText>
                                </Icons>
                            </Link>
                            <Link to="/login">
                                <Icons>
                                    <IconText>
                                        <ArrowLeft size={20} color="black" />
                                        <span> Go to Login</span>
                                    </IconText>
                                </Icons>
                            </Link>
                        </NavItem>
                    </NavList>
                </Nav>
            </NavContainer>
            <Content>
                <FormContainer>
                    <Title>SIGN UP</Title>
                    <Subtitle>Please fill the required credentials</Subtitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        {/* Name */}
                        <label htmlFor="name">Name</label>
                        <Input
                            {...register("name")}
                            type="name"
                            id="name"
                            placeholder="Enter Name"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        {/* Email */}
                        <label htmlFor="email">Email</label>
                        <Input
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            required
                        />
                    </FormGroup>
                        {/* Gender Radio Button */}
                        <RadioGroup>
                        <label>Gender</label>
                            <RadioLabel>
                                <RadioInput
                                    {...register("gender")}
                                    type="radio"
                                    value="male"
                                    required
                                />
                                Male
                            </RadioLabel>
                            <RadioLabel>
                                <RadioInput
                                {...register("gender")}
                                    type="radio"
                                    value="female"
                                    required
                                />
                                Female
                            </RadioLabel>
                            <RadioLabel>
                                <RadioInput
                                    {...register("gender")}
                                    type="radio"
                                    value="others"
                                    required
                                />
                                Others
                            </RadioLabel>
                        </RadioGroup>
                        <FormGroup>
                            <label htmlFor="password">Password</label>
                            <Input
                                {...register("password")}
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                required
                            />
                        </FormGroup>
                        <Button type="submit">Sign Up</Button>
                    </Form>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default Login;
