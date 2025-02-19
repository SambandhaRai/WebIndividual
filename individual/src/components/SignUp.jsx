import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
import { registerApi } from "../apis/api.jsx";

const API_BASE_URL = "http://localhost:4000"; 

const SignUp = () => {
    const { register, handleSubmit, reset, setError, watch, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    useEffect(() => {
        if (password !== confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
        }
    }, [password, confirmPassword, setError]);

    const onSubmit = async (data) => {
        console.log("Submitting form with registerApi...", data);
    
        if (!data.name || !data.email || !data.password) {
            toast.error("All fields are required!");
            return;
        }
    
        try {
            const res = await registerApi(data);
            console.log("Response from registerApi:", res);
    
            if (res.status === 201) {
                toast.success(res.data.message || "Registration successful!", { className: "toast-success" });
                console.log("Navigating to login...");
                setTimeout(() => navigate("/login"), 1000);
            } else {
                toast.error(res.data.message || "Registration failed!", { className: "toast-error" });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Internal server error", { className: "toast-error" });
        }
    
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
                            <label htmlFor="name">Name</label>
                            <Input {...register("name", { required: "Name is required" })} type="text" id="name" placeholder="Enter Name" />
                            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" },
                                })}
                                id="email"
                                placeholder="Enter Email"
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                        </FormGroup>

                        <RadioGroup>
                            <label>Gender</label>
                            <RadioLabel>
                                <RadioInput {...register("gender", { required: "Gender is required" })} type="radio" value="male" />
                                Male
                            </RadioLabel>
                            <RadioLabel>
                                <RadioInput {...register("gender")} type="radio" value="female" />
                                Female
                            </RadioLabel>
                            <RadioLabel>
                                <RadioInput {...register("gender")} type="radio" value="others" />
                                Others
                            </RadioLabel>
                            {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
                        </RadioGroup>

                        <FormGroup>
                            <label htmlFor="contact">Contact No.</label>
                            <Input
                                type="tel"
                                {...register("contact", {
                                    required: "Contact number is required",
                                    pattern: { value: /^[9][0-9]{9}$/, message: "Contact number must be exactly 10 digits and start with 9" },
                                })}
                                id="contact"
                                placeholder="9XXXXXXXXX"
                                maxLength={10}
                            />
                            {errors.contact && <p style={{ color: "red", fontSize: "12px" }}>{errors.contact.message}</p>}
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="password">Password</label>
                            <Input
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                            />
                            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Input
                                {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === password || "Passwords do not match" })}
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-enter Password"
                            />
                            {errors.confirmPassword && <p style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword.message}</p>}
                        </FormGroup>

                        <Button type="submit">Sign Up</Button>
                    </Form>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
