import { API } from "../core";

export const imgEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/imgurl/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}