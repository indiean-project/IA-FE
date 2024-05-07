import API from "../core"

export const signUpUser = async(params) => {
    try {
        const {data} = await API.post("/apis/user/signUp", params);
        return data;
    } catch (e){
        console.log(e);
    }
}