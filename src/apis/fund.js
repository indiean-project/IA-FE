import { API } from "../core"

export const selectAllFund = async(params)=>{
    try {
        const {data} = await API.post('/api/fund/allList', params);
        return data;
    } catch (e){
        console.log(e);
    }
}