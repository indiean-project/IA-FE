import axios from "axios";

const API = axios.create({
    baseURL: "/server",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default API;