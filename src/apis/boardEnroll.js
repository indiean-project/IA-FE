import { API } from "../core";

export const boardEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/board/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}