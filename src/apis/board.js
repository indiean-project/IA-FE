import { API } from "../core";

export const freeboardEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/board/free/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const freeBoardList = async(params) => {
    try {
        const {data} = await API.post("/api/board/free/boardlist?page=" + params);
        return data;
    } catch (e) {
        console.log(e);
    }
}