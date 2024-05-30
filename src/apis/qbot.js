import {API} from "../core";

export const qEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/question/enroll", params);
        return data.status;
    } catch (e) {
        console.log(e);
    }
}

