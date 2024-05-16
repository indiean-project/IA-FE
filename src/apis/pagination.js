import { API } from "../core"

export const pageMove = async(params) => {
    try {
        
        const {data} = await API.post("/api/"+params.url+"?page="+params.page ,params);
        
        return data.data;
    } catch (e){
        console.log(e);
    }
}