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

export const BoardAmount = async(params) => {
    try {
        const {data} = await API.post("/api/board/amount", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const BoardDelete = async(params) => {
    try {
        const {data} = await API.post("/api/board/delete", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const BoardSideBar = async(params) => {
    try {
        const {data} = await API.post("/api/board/side/list", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const DetailBoard = async(params) => {
    try {
        const {data} = await API.post("/api/board/detail", params.boardNo);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const ColoVote = async(params) => {
    try {
        const {data} = await API.post("/api/board/colo/vote", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const SelectVote = async(params) => {
    try {
        const {data} = await API.post("/api/board/colo/selectVote", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const DetailNotice = async(params) => {
    try {
        const {data} = await API.post("/api/notice/detail", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}