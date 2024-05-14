import { API } from "../core"

export const adminFund = async() => {
    try {
        const {data} = await API.post("api/admin/fundList");
        return data;
    } catch (e){
        console.log(e);
    }

}

export const adminFundSearch = async(params) => {
    try {
        const {data} = await API.post("api/admin/fundSearch", params);
        return data;
    } catch (e){
        console.log(e);
    }
}