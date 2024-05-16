import './ArtistLineUp.scss'
import artistImg from './10cm.jpg';
import {useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function ArtistLineUp({ lineup }) {
    
    const navigate = useNavigate()
    const handleOnClick = (artist)=>{
            if(artist === null){
                return false;
            }else{
                handleArtistPost({artist})
            }
    } 

    const handleArtistPost = ({ artist }) => {
        
        navigate('/artist/detail', {
                state:{
                    artistNo : artist.artistNo
                },
        });    
      };
    
    return (
        <div className='line__up'>
            { lineup !== undefined ? lineup.map((artist,idx) => {
                return (
                    <div className='artist_box' key={idx}>
                        <div className='artist__picture'><div onClick={()=>{handleOnClick(artist.artist)}}><img src={artistImg} /></div></div>
                        <span className='artist__name'>{artist.artistName}</span>
                    </div>
                );
                }):""

            }
        </div>
    )
} export default ArtistLineUp