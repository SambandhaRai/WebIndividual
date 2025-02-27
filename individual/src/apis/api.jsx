import axios from "axios";
import { toast } from "react-toastify";

// Axios instance with base URL
const Api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// Function to get the authentication token dynamically
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
};


//  Login API - Stores token in localStorage
export const loginApi = async (data) => {
    try {
        const response = await Api.post("/auth/login", data);

        // Extract token & user info
        const token = response?.data?.access_token;
        const user = response?.data?.user; // User info

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user)); // Store user info
            console.log("Token & User Stored:", token, user);
        } else {
            console.error("No token received from server!");
        }

        return response.data;
    } catch (error) {
        console.error("Login API Error:", error.response?.data || error.message);
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
    localStorage.removeItem("user");
    toast.success("Successfully logged out!");
    console.log("User logged out, token removed.");
    window.location.href = "/login"; // Redirect to login page
};

//  Protected User APIs (Require Token) 


// ----------------- USER APIs ---------------------

// Get all users (Admin or Authenticated Users)
export const getAllUsers = async () => {
    try {
        const response = await Api.get("/users", getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get Users API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Get User by ID
export const getUserById = async (id) => {
    try {
        const response = await Api.get(`/users/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get User By ID API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Update User
export const updateUser = async (id, data) => {
    try {
        const response = await Api.put(`/users/${id}`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Update User API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Delete User
export const deleteUser = async (id) => {
    try {
        const response = await Api.delete(`/users/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Delete User API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ----------------- ROOM APIs ---------------------

// Get All Rooms
export const getAllRooms = async () => {
    try {
        const response = await Api.get("/rooms", getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get Rooms API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Get Room by ID
export const getRoomById = async (id) => {
    try {
        const response = await Api.get(`/rooms/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get Room By ID API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Create Room
export const createRoom = async (formData) => {
    try {
        const response = await Api.post("/rooms/create", formData, {
            ...getAuthConfig(),
            headers: {
                ...getAuthConfig().headers, // Preserve Authorization token
                "Content-Type": "multipart/form-data", // Ensure proper handling of file uploads
            },
        });

        return response.data;
    } catch (error) {
        console.error("Create Room API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Update Room
export const updateRoom = async (id, formData) => {
    try {
        const response = await Api.put(`/rooms/${id}`, formData, {
            ...getAuthConfig(),
            headers: {
                ...getAuthConfig().headers, // Preserve Authorization token
                "Content-Type": "multipart/form-data", // Ensure proper handling of file uploads
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update Room API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Delete Room
export const deleteRoom = async (id) => {
    try {
        const response = await Api.delete(`/rooms/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Delete Room API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Fetch available rooms based on search criteria
export const getAvailableRooms = async (searchData) => {
    try {
        const response = await Api.post("/rooms/available", searchData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get Available Rooms API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ----------------- EXPERIENCE APIs ---------------------

// Create Experience
export const createExperience = async (formData) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await axios.post(
            "http://localhost:4000/api/experience/create",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get All Experiences
export const getAllExperiences = async () => {
    try {
        const response = await Api.get("/experience", getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get All Experiences API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Get Experience By ID
export const getExperienceById = async (id) => {
    try {
        const response = await Api.get(`/experience/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get Experience By ID API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Update Experience
export const updateExperience = async (id, formData) => {
    try {
        const response = await Api.put(`/experience/${id}`, formData, {
            ...getAuthConfig(),
            headers: {
                ...getAuthConfig().headers, 
                "Content-Type": "multipart/form-data", // For handling file uploads
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update Experience API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Delete Experience
export const deleteExperience = async (id) => {
    try {
        const response = await Api.delete(`/experience/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Delete Experience API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// ----------------- BOOKING APIs ---------------------

// Create a new booking
export const createBookingApi = async (bookingData) => {
    try {
        const response = await Api.post("/bookings", bookingData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Create Booking API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Get all bookings for a user
export const getUserBookingsApi = async (userId) => {
    try {
        const response = await Api.get(`/bookings/user/${userId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Get User Bookings API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Update a booking (e.g., change status)
export const updateBookingApi = async (bookingId, updateData) => {
    try {
        const response = await Api.put(`/bookings/${bookingId}`, updateData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Update Booking API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Cancel a booking
export const cancelBookingApi = async (bookingId) => {
    try {
        const response = await Api.put(`/bookings/${bookingId}/cancel`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Cancel Booking API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Delete a booking
export const deleteBookingApi = async (bookingId) => {
    try {
        const response = await Api.delete(`/bookings/${bookingId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Delete Booking API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export default Api;