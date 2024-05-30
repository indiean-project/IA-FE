import { API } from "../core"

export const adminUser = async() => {
    try {
        const {data} = await API.post("/api/admin/fundList");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const updateFundStatus = async(params) => {
    try {
        const {data} = await API.post("/api/admin/fund/updateStatus", params);
        return data;
    } catch (e){
        console.log(e);
    }
}

export const searchFundApprovalList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/fund/searchList", params);
        return data;
    } catch (e){
        console.log(e);
    }
}

export const updateQuestion = async(params) => {
    try {
        const {data} = await API.post("/api/admin/question/updateQuestion",params);
        return data;
    } catch (e){
        console.log(e);
    }
}

export const adminQuestion = async() => {
    try {
        const {data} = await API.get("/api/admin/question/list");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const searchQuestionApprovalList = async(params) =>{
    try {
        const {data} = await API.post("/api/admin/question/questionSearchList", params);
        return data;
    } catch (e){
        console.log(e);
    }

}
export const searchArtistList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/concert/searchList");
        return data;
    } catch (e){
        console.log(e);
    }
}
//admin user
export const enrollUser = async(params) => {
    try {
        const {data} = await API.post("/api/admin/user/enroll");
        return data;
    } catch (e){
        console.log(e);
    }
}
export const adminUserList = async(params) => {
    try {
        const {data} = await API.get("/api/admin/user/list");
        return data;
    } catch (e){
        console.log(e);
    }
}
export const searchUserList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/user/searchList");
        return data;
    } catch (e){
        console.log(e);
    }
}
export const adminUserdelete = async(params) => {
    try {
        const {data} = await API.post("/api/admin/user/delete");
        return data;
    } catch (e){
        console.log(e);
    }
}
//admin artist
export const adminArtistList = async(params) => {
    try {
        const {data} = await API.get("/api/admin/artist/list");
        return data;
    } catch (e){
        console.log(e);
    }
}
export const updateArtostStatus = async(params) => {
    try {
        const {data} = await API.post("/api/admin/artist/updateStatus");
        return data;
    } catch (e){
        console.log(e);
    }
}
export const adminsearchArtistList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/artist/searchList");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const adminReportList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/report/reportList");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const updateReportStatus = async(params) => {
    try {
        const {data} = await API.post("/api/admin/report/updateStatus");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const searchReportList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/report/searchList");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const selectBoardNo = async(params) => {
    try {
        const {data} = await API.post("/api/admin/report/selectBoardNo");
        return data;
    } catch (e){
        console.log(e);
    }
}