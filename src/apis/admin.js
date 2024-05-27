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
        const {data} = await API.post("/api/admin/fund/updateStatus");
        return data;
    } catch (e){
        console.log(e);
    }
}

export const searchFundApprovalList = async(params) => {
    try {
        const {data} = await API.post("/api/admin/fund/searchList");
        return data;
    } catch (e){
        console.log(e);
    }
}