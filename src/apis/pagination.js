import { API } from "../core"

export const pageMove = async(params) => {
    try {
        
        const {data} = await API.post("/api/"+params.url, params );
        
        return data.data;
    } catch (e){
        console.log(e);
    }
}