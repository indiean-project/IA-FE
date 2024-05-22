import { API } from "../../core";


export const calendarList = async()=>{
    try {
        const {data} = await API.post('/api/concert/calendarList');
        
        return data.data;
    } catch (e){
        console.log(e);
    }
}