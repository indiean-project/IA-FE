import axios from "axios";

export const API = axios.create({
    baseURL: "/server",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const imgAPI = axios.create({
    baseURL: "/server",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});