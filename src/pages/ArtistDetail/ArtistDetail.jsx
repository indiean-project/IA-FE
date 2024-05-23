import './ArtistDetail.scss';
import { artistItem } from '../../apis/artist/artist';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share } from 'react-bootstrap-icons';
import { BsInstagram, BsYoutube} from "react-icons/bs";
import MusicBox from '../../components/MusicBox';
import test from './10cm.jpg';



function ArtistDetail() {

    const parama = useParams().id;

    const [artist, setArtist] = useState();
    const concertItem = async () => {
        const artistInfo = await artistItem(parama);
        setArtist(artistInfo);
    }
    useEffect(() => {
        concertItem();

    }, [])

    const snsMove = (link) =>{
        if(link==='i'){
            location.href=artist.instagramLink
        }else{
            location.href=artist.youtubeLink
        }
    }

    if(artist != null)


    return (
        <div className='artistDetail'>
            <div className='btn__area'>
                <div>
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
                        <img src={test} />
                    </div>
                    <div className='artist__info'>
                        <div className=''>데뷔<br />{artist.debutDate}</div>
                        <div className=''>장르<br />{artist.musicCategory}</div>
                    </div>
                </div>
                <div className='artist__content'>
                    <h2>아티스트 소개</h2>
                    <div className='aritst__text'>
                        <span dangerouslySetInnerHTML={{ __html: artist.artistInfo}}>
                            
                        </span>
                    </div>
                    <div className='sns__btn__area'>
                        {artist.instagramLink === undefined? <div className='sns__btn' onClick={()=>{snsMove('i')}}><BsInstagram size={40} /></div>:""}
                        {artist.youtubeLink === undefined? <div className='sns__btn'onClick={()=>{snsMove('y')}}><BsYoutube size={40} /></div>:""}
                    </div>
                </div>
            </div>
            <div className='musicList'>
               <MusicBox/>
            </div>

        </div>
    )
} export default ArtistDetail