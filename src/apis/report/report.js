import { API } from "../../core";

export const ReportEnroll = async(params) => {
    try {
        const {data} = await API.post("/api/report/enroll", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}