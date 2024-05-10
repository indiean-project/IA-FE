import { API } from "../core"

export const selectAllFund = async()=>{
    try {
        const {data} = await API.post('/api/fund/allList');
        return data;
    } catch (e){
        console.log(e);
    }
}