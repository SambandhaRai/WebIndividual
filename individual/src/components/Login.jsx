import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    Input,
    Button,
    Title,
    Subtitle,
    FormGroup,
    FooterText,
    LinkText
} from "../styles/login";
import { loginApi } from "../apis/api.jsx";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Sending Login Data:", data);
    
        if (!data.email || !data.password) {
            toast.error("Email and Password are required!");
            return;
        }
    
        try {
            const res = await loginApi(data); // loginApi already returns `res.data`
            console.log("Backend Response:", res);
    
            if (res && res.access_token) {
                // Store token and user info in localStorage
                localStorage.setItem("token", res.access_token);  // Store access token
                localStorage.setItem("user", JSON.stringify(res.user));  // Store user info
                
                toast.success(res.message || "Login successful!");

                // Redirect based on role (change "resortadmin@gmail.com" as needed)
                if (res.user.email === "resortadmin@gmail.com") {
                    navigate("/dashboard"); // Redirect admin
                } else {
                    navigate("/home"); // Redirect normal users
                }
            } else {
                toast.error(res?.message || "Login failed! No token received.");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error(err.response?.data?.message || "Invalid credentials or server issue.");
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
                                        <ArrowLeft size={20} color="black" />
                                        <span> Back to Home</span>
                                    </IconText>
                                </Icons>
                            </Link>
                        </NavItem>
                    </NavList>
                </Nav>
            </NavContainer>
            <Content>
                <FormContainer>
                    <Title>LOGIN</Title>
                    <Subtitle>Please login to your account</Subtitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <Input
                                {...register("email")}
                                type="email"
                                id="email"
                                placeholder="Enter Email"
                                required
                            />
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
                        <Button type="submit">Login</Button>
                    </Form>
                    <FooterText>
                        Don't have an account? <LinkText to="/signup">Sign up</LinkText>
                    </FooterText>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default Login;
