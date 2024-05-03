import API from "../core"

export const loginUser = async(params) => {
    try {
        const {data} = await API.post("/user/login", params);
        return data;
    } catch (e){
        console.log(e);
    }
}