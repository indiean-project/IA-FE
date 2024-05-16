import { API } from "../core"

export const selectConcert = async(concertNo)=>{
    
    try {
        const {data} = await API.post('/api/concert/detail?concertNo='+concertNo);
        return data.data;
    } catch (e){
        console.log(e);
    }
}