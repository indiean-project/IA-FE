import { API } from "../core";

export const freeBoardList = async(params) => {
    try {
        const {data} = await API.post("/api/board/freeboardlist", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}