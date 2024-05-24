import './ArtistDetail.scss';
import { artistItem, spotifyGetAccessToken } from '../../apis/artist/artist';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share } from 'react-bootstrap-icons';
import { BsInstagram, BsYoutube } from "react-icons/bs";
import {handleCopyClipBoard} from '../../apis/common/copyClipBoard'
import MusicBox from '../../components/MusicBox';
import baseImg from '../../assets/logo/logo_white.png'



function ArtistDetail() {

    const parama = useParams().id;
    const [spotifyResults, setSpotifyResults] = useState([])
    const [artist, setArtist] = useState();
    const concertItem = async () => {
        const artistInfo = await artistItem(parama);
        setArtist(artistInfo);
    }
    const searchSpotify = async () => {
        const accessToken = await spotifyGetAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${artist.artistName}&type=track&limit=3`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const data = await response.json();
        setSpotifyResults(data.tracks.items);

    };
    useEffect(() => {
        concertItem();

    }, [])
    useEffect(() => {
        searchSpotify()
    }, [artist])

    const snsMove = (link) => {
        if (link === 'i') {
            window.open(artist.instagramLink);
        } else {
            window.open(artist.youtubeLink);
        }
    }

    if (artist != null)
        return (
            <div className='artistDetail'>
                <div className='btn__area'>
                    <div onClick={handleCopyClipBoard}>
                        <Share size={20} />
                        <span className='btn1'>공유하기</span>
                    </div>
                    <div>
                        <span className='btn2'>수정요청</span>
                    </div>
                </div>
                <div className='artist__container'>
                    <div className='artist__title'>
                        <div className='title'>{artist.artistName}</div>
                        <div className='artist__picture'>
                            <img src={artist.titleUrl !== null?artist.titleUrl:baseImg} />
                        </div>
                        <div className='artist__info'>
                            <div className=''>데뷔<br />{artist.debutDate}</div>
                            <div className=''>장르<br />{artist.musicCategory}</div>
                        </div>
                    </div>
                    <div className='artist__content'>
                        <h2>아티스트 소개</h2>
                        <div className='aritst__text' dangerouslySetInnerHTML={{ __html: artist.artistInfo }}>

                        </div>
                        <div className='sns__btn__area'>
                            {artist.instagramLink !== null ? <div className='sns__btn' onClick={() => { snsMove('i') }}><BsInstagram size={40} /></div> : ""}
                            {artist.youtubeLink !== null ? <div className='sns__btn' onClick={() => { snsMove('y') }}><BsYoutube size={40} /></div> : ""}
                        </div>
                    </div>
                </div>
                <div className='musicList'>
                    {spotifyResults.length > 0 ? spotifyResults.map((result, idx) => {
                        return (<MusicBox music={result} key={idx} />)
                    }) : <div className='notList'>등록된 음악이 없습니다.</div>
                    }
                </div>

            </div>
        )
} export default ArtistDetail