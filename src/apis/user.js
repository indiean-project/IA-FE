import API from "../core"

export const loginUser = async(params) => {
    try {
        const {data} = await API.post("/apis/user/login", params);
        return data;
    } catch (e){
        console.log(e);
    }
}

export const signUpUser = async(params) => {
    try {
        const {data} = await API.post("/apis/user/signUp", params);
        return data;
    } catch (e){
        console.log(e);
    }
}

export const checkUserInfo = async(params) => {
    try {
        const {data} = await API.post("/apis/user/signUp/checkInfo", params);
        return data;
    } catch (e){
        console.log(e);
        return e.response.data;
    }
}