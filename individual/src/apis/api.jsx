import axios from "axios";

// Axios instance with base URL
const Api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// Function to get the authentication token dynamically
const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

//  Login API - Stores token in localStorage
export const loginApi = async (data) => {
    try {
        const response = await Api.post("/auth/login", data);

        // Extract token from response
        const token = response?.data?.access_token; 
        if (token) {
            localStorage.setItem("token", token);
            console.log(" Token Stored:", token);
        } else {
            console.error(" No token received from server!");
        }

        return response.data; // Returning only the necessary data
    } catch (error) {
        console.error(" Login API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

//  Register API
export const registerApi = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/create', data);
    return response;
    } catch (error) {
        console.error(" Registration API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

//  Get Current Authenticated User
export const getCurrentUser = async () => {
    try {
        const response = await Api.get("/auth/init", getAuthConfig());
        return response.data;
    } catch (error) {
        console.error(" Get Current User API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

//  Logout Function - Clears Token
export const logout = () => {
    localStorage.removeItem("token");
    console.log("User logged out, token removed.");
    window.location.href = "/"; // Redirect to login page
};

//  Protected User APIs (Require Token) 

//  Get All Users (Admin or Authenticated Users)
export const getAllUsers = async () => {
    try {
        const response = await Api.get("/users", getAuthConfig());
        return response.data;
    } catch (error) {
        console.error(" Get Users API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

//  Get User by ID
export const getUserById = async (id) => {
    try {
        const response = await Api.get(`/users/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get User By ID API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

//  Update User
export const updateUser = async (id, data) => {
    try {
        const response = await Api.put(`/users/${id}`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Update User API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ✅ Delete User
export const deleteUser = async (id) => {
    try {
        const response = await Api.delete(`/users/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Delete User API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export default Api;