import { API } from "../../core";

export const BoardReplyList = async(params) => {
    try {
        const {data} = await API.post("/api/reply/list", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const BoardReplyEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/reply/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const BoardReplyDelete = async(params) => {
    try {
        const {data} = await API.post("/api/reply/delete", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const BoardReplyUpdate = async(params) => {
    try {
        const {data} = await API.post("/api/reply/update", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}