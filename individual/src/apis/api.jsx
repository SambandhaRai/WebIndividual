// Importing axios
import axios from "axios";

// Creating Axios instance
const Api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
});

// Function to get the authentication token dynamically
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// Creating test API (requires authentication)
export const testApi = () => Api.get("/test", getAuthConfig());

// Creating register API (no authentication needed)
export const registerApi = (data) => Api.post("/api/users/create", data);

// Creating login API (no authentication needed)
export const loginApi = (data) => Api.post("/api/auth/login", data);


export default Api;