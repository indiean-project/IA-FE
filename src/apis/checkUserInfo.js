import API from "../core"

export const checkUserInfo = async(params) => {
    try {
        const {data} = await API.post("/apis/user/signUp/checkInput", params);
        return data;
    } catch (e){
        console.log(e);
    }
}