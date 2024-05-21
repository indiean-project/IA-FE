import './ArtistDetail.scss';
import { artistItme } from '../../apis/artist/artist';
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
        const artistInfo = await artistItme(parama);
        setArtist(artistInfo);
    }
    useEffect(() => {
        concertItem();

    }, [])


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
                    <div className='title'>아티스트 이름</div>
                    <div className='artist__picture'>
                        <img src={test} />
                    </div>
                    <div className='artist__info'>
                        <div className=''>데뷔<br />2016.10.16</div>
                        <div className=''>장르<br />이런저런</div>
                    </div>
                </div>
                <div className='artist__content'>
                    <div className='aritst__text'>
                        <span>
                            <p>
                                <ul>
                                    <li><b>생일 : </b>1992.09.14</li>
                                    <li><b>활동유형 : </b>솔로</li>
                                    <li><b>소속사 : </b>KOZ 엔터테인먼트</li>
                                </ul>
                                <p className='text'>
                                    소개글 작성하는곳이당
                                </p>
                            </p>
                        </span>
                    </div>
                    <div className='sns__btn__area'>
                        <div className='sns__btn'><BsInstagram size={40} /></div>
                        <div className='sns__btn'><BsYoutube size={40} /></div>
                    </div>
                </div>
            </div>
            <div className='musicList'>
               <MusicBox/>
            </div>

        </div>
    )
} export default ArtistDetail