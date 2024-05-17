import { API, imgAPI } from "../core"

export const tempImg = async(params) => {
    try {
        const {data} = await imgAPI.post("/api/imgfilter/tempImg", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const imgDelete = async(params) => {
    try {
        const {data} = await API.post("/api/imgfilter/imgDelete", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const imgMove = async(params) => {
    try {
        const {data} = await API.post("/api/imgfilter/imgMove", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

