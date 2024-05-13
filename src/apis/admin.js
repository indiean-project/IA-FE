import { API } from "../core"

export const adminUser = async() => {
    try {
        const {data} = await API.post("/admin/fundList");
        return data;
    } catch (e){
        console.log(e);
    }
}