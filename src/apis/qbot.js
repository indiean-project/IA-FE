import API from "../core"

export const question = async(params) => {
    try {
        const {data} = await API.post("/api/question", params);
        return data;
    } catch (e) {
        console.log(e);
    }
}

