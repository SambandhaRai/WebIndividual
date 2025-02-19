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
import { loginApi } from "../apis/api.jsx";
import { useState } from "react";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Logging in with:", data);

        if (!data.email || !data.password) {
        toast.error("Email and Password are required!");
        return;
        }

        loginApi(data)
        .then((res) => {
            console.log("Response:", res);
            if (res.data.success === false) {
            toast.error(res.data.message);
            } else {
            toast.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.userData));
            navigate("/home");
            }
        })
        .catch((err) => {
            console.error("Error logging in:", err);
            toast.error("Server Error! Please try again later.");
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
