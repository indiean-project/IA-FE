import { API } from "../../core"

export const selectArtist = async(params)=>{
    try {
        const {data} = await API.post('/api/aritst/artistList', params);
        return data.data;
    } catch (e){
        console.log(e);
    }
}