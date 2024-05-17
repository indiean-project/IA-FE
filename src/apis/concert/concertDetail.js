import { API } from "../../core";


export const selectConcert = async(parama)=>{
    
    try {
        const {data} = await API.get('/api/concert/detail?concertNo='+parama);
        
        return data.data;
    } catch (e){
        console.log(e);
    }
}