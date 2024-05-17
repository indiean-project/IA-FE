import { API } from "../core";

export const BoardEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/board/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const ColoEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/board/colo/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const ViewCount = async(params) => {
    try {
        const {data} = await API.post("/api/board/viewCount", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const LikeCount = async(params) => {
    try {
        const {data} = await API.post("/api/board/likeCount", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}