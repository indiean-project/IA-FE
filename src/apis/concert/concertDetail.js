import { API } from "../../core";


export const selectConcert = async(parama)=>{
    
    try {
        const {data} = await API.get('/api/concert/detail?concertNo='+parama);
        
        return data.data;
    } catch (e){
        console.log(e);
    }
}
export const concertReply = async(parama)=>{
    try {
        const {data} = await API.get('/api/concert/replyList?concertNo='+parama);
        
        return data;
    } catch (e){
        console.log(e);
    }

}
export const addConcertReply = async(parama)=>{
    try {
        const {data} = await API.post('/api/concert/addReply',parama);
        
        return data;
    } catch (e){
        console.log(e);
    }

}
export const deleteConcertReply = async(parama)=>{
    try {
        const {data} = await API.post('/api/concert/deleteReply',parama.concertReplyNo);
        
        return data;
    } catch (e){
        console.log(e);
    }
}
export const concertReplyUpdate = async(parama)=>{
    try {
        const {data} = await API.post('/api/concert/updateReply',parama);
        
        return data;
    } catch (e){
        console.log(e);
    }

}
export const concertEnroll = async(parama) =>{
    console.log(parama)
    try {
        
        const {data} = await API.post('/api/concert/enroll',parama);
       
        return data;
    } catch (e){
        console.log(e);
    }
}
