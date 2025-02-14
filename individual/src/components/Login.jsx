import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    Input,
    Button,
    Title,
    Subtitle,
    FormGroup,
    FooterText,
    LinkText
} from "../styles/login";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Logging in with:", data);
    
        axios
          .post(`${API.BASE_URL}/api/auth/login`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // Log the entire response to inspect the structure
            console.log("Login Response:", response.data.data.access_token);
    
            // Check if access_token exists inside response.data
            if (response.data && response.data.data.access_token) {
              console.log("Access Token:", response.data.data.access_token);
              localStorage.setItem("token", response.data.data.access_token); // ✅ Store Token
              navigate("/dashboard"); // ✅ Redirect to Dashboard
            } else {
              alert("Login failed! Check credentials.");
            }
          })
          .catch((error) => {
            console.error("Error logging in:", error);
            alert("Error logging in. Please try again.");
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
