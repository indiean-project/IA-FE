import {API} from "../core"

export const pageMove = async(currentBoard,currentPage) => {
    try {
        const {data} = await API.post("/api/"+currentBoard+"?page="+currentPage);
        return data.data;
    } catch (e){
        console.log(e);
    }
}