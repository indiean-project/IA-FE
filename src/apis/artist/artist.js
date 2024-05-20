import { API } from "../../core"

export const selectArtist = async(params)=>{
    try {
        const {data} = await API.post('/api/artist/artistList', params);
        console.log(data.data);
        return data.data;
    } catch (e){
        console.log(e);
    }
}

export const artistItme = async(params) =>{
    try{
        const {data} = await API.get('/api/artist/detail?artistNo='+params)
        return data.data
    }catch(e){
        console.log(e);
    }
    
}