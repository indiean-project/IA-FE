import { API } from "../core"

export const pageMove = async(info) => {
    try {
        console.log(info);
        const {data} = await API.post("/api/"+info.url+"?page="+info.page, info.sort);
        return data.data;
    } catch (e){
        console.log(e);
    }
}