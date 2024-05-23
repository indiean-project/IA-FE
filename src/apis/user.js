import { API, imgAPI } from "../core"

export const loginUser = async(params) => {
    try {
        const {data} = await API.post("/api/user/login", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const signUpUser = async(params) => {
    try {
        const {data} = await API.post("/api/user/signUp", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}
// return e.response.data;
export const checkUserId = async(params) => {
    try {
        const {data} = await API.post("/api/user/signUp/checkId", params);
        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const checkUserPwd = async(params) => {
    try {
        const {data} = await API.post("/api/user/signUp/checkPwd", params);
        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const sendEmail = async(params) => {
    try {
        const {data} = await API.get("/api/user/signUp/sendEmail?userId="+ params.userId);
        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const checkCertNum = async(params) => {
    try {
        const {data} = await API.post("/api/user/signUp/checkCertNum", params);
        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const updateUser = async(params) => {
    try {
        const {data} = await API.post("/api/user/myPage/update", params);
        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const getUserBoard = async(userNo) => {
    try {
        const {data} = await API.get("/api/user/myPage/board?userNo=" + userNo);
        return data;
    } catch(e) {
        console.log(e);
        return e;
    }
}

export const getUserFund = async(userNo) => {
    try {
        const {data} = await API.get("/api/user/myPage/fund?userNo=" + userNo);
        return data;
    } catch(e) {
        console.log(e);
        return e;
    }
}

export const getUserRewardLog = async(userNo, fundNo) => {
    try {
        const {data} = await API.get("/api/user/myPage/fund/reward?userNo=" + userNo
                                        + "&fundNo=" + fundNo);
        return data;
    } catch(e) {
        console.log(e);
        return e;
    }
}

// 임시로 이미지 관련 주소 바꾸어서 이용함
export const tempImg = async(params) => {
    try {
        const {data} = await imgAPI.post("/api/user/tempImg", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const imgDelete = async(params) => {
    try {
        const {data} = await API.post("/api/user/imgDelete", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const imgMove = async(params) => {
    try {
        const {data} = await API.post("/api/user/imgMove", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}