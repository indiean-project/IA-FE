import axios from "axios";

export const API = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const imgAPI = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});