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
// return e.response.data;
export const checkUserId = async(params) => {
    try {
        const {data} = await API.post("/apis/user/signUp/checkId", params);
        return data;
    } catch (e){
        console.log(e);
        return e;
    }
}

export const checkUserPwd = async(params) => {
    try {
        const {data} = await API.post("/apis/user/signUp/checkPwd", params);
        return data;
    } catch (e){
        console.log(e);
        return e;
    }
}