import { API } from "../../core"

export const selectArtist = async (params) => {
    try {
        const { data } = await API.post('/api/artist/artistList', params);

        return data.data;
    } catch (e) {
        console.log(e);
    }
}

export const artistItem = async (params) => {
    try {
        const { data } = await API.get('/api/artist/detail?artistNo=' + params)

        return data.data
    } catch (e) {
        console.log(e);
    }

}
export const artistEnroll = async (params) => {
    try {
        const { data } = await API.post('/api/artist/enroll', params)

        return data
    } catch (e) {
        console.log(e);
    }
}

export const spotifyGetAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(import.meta.env.VITE_SPOTIFY_CLIENT_ID + ':' + import.meta.env.VITE_SPOTIFY_CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
};

export const getHomeArtist = async () => {
    try {
        const { data } = await API.post('/api/artist/home');
        return data
    } catch (e) {
        console.log(e);
    }

}
export const artistConfirmation = async (params) =>{
    console.log(params)
    try{
        const {data} = await API.get('/api/artist/confirmation?userNo='+params);
        return data
    }catch(e){
        console.log(e);
    }
}