import React, { useEffect }  from "react";
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

const SignUp = () => {
    const { register, handleSubmit, reset, setError, watch, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    useEffect(() => {
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
        }
    }, [password, confirmPassword, setError]);

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
                            type="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                              },
                            })}
                            id="email"
                            placeholder="Enter Email"
                            required
                          />
                          {errors.email && (
                            <p style={{ color: "red" }}>{errors.email.message}</p>
                          )}
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
                        <label htmlFor="contact">Contact No.</label>
                            <Input
                                type="tel"
                                {...register("contact", {
                                    required: "Contact number is required",
                                    pattern: {
                                        value: /^[9][0-9]{9}$/, // Starts with 9 and has exactly 10 digits
                                        message: "Contact number must be exactly 10 digits and start with 9",
                                    },
                                    maxLength: 10, // Maximum length of the number
                                })}
                                id="contact"
                                placeholder="9XXXXXXXXX"
                                maxLength={10} // Limit to 10 digits
                                required
                            />
                            {errors.contact && (
                                <p style={{ color: "red", fontSize: "12px" }}>{errors.contact.message}</p>
                            )}
                        </FormGroup>
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
                        <FormGroup>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Input
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match", // Custom validation
                                })}
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-write Password"
                            />
                            {errors.confirmPassword && (
                                <p style={{ color: "red" , fontSize: "12px" }}>{errors.confirmPassword.message}</p>
                            )}
                        </FormGroup>
                        <Button type="submit">Sign Up</Button>
                    </Form>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
