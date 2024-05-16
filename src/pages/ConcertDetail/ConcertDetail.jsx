import { NavLink, useLocation } from 'react-router-dom';
import './ConcertDetail.scss';
import poster from './poster.jpg';
import { useEffect, useState } from 'react';
import ConcertInfo from '../../components/ConcertInfo';
import CommonReply from '../../components/CommonReply/CommonReply';
import ArtistLineUp from '../../components/ArtistLineUp';
import { selectConcert } from '../../apis/concertDetail';

function ConcertDetail (){
    
    const [detailState,setDetailState] = useState('info');
    const location = useLocation();
    const [lineup,setLineup]  = useState([]);
    let concert = [];
    const concertItem =  async() =>{
        concert = await selectConcert(location.state.concertNo);
        setLineup(concert.concertLineupList);
    }
    
    
    useEffect(()=>{
       
        concertItem()  
    },[])


    return (


        <div className='concertDetail__container'>
            <div className='concertDetail__top'>
                <div className='concertDetail__title'>
                    {concert.concertTitle}
                </div>
                <div className='btn'><NavLink>수정요청</NavLink></div>
            </div>
            <div className='concertDetail__itemBox'>
                <div className='concertDetail__item'>
                    <div className='concertDetail__poster'>
                        <img src={poster} />
                    </div>
                    <div className='concertDetail__content'>
                        <ul>
                            <li>
                                <strong>장소</strong>
                                <div className='concertInfo'>오방가르드</div>
                            </li>
                            <li>
                                <strong>공연기간</strong>
                                <div className='concertInfo'>2024.05.11~2024.05.12</div>
                            </li>
                            <li>
                                <strong>공연시간</strong>
                                <div className='concertInfo'>100분</div>
                            </li>
                            <li>
                                <strong>가격</strong>
                                <div className='concertInfo'>부산 예매 25,000 / 현매 30,000(정원 100명 한정)</div>
                            </li>
                        </ul>

                        <div className='ticketlink'>
                                <div className='btn'><NavLink>티켓구매</NavLink></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='concert__lineupTilte'>
                <strong>LINE UP</strong>
                <div><div className='btn'><NavLink>카카오 공유</NavLink></div></div>
            </div>
            <ArtistLineUp lineup={lineup}/>
            <div className='concert__content__top'>
                <div>
                    <span className={`${detailState === 'info' ? 'state__on':''}`} onClick={()=>{setDetailState('info')}}>공연정보</span> 
                    <span className={`${detailState === 'reply' ? 'state__on':''}`} onClick={()=>{setDetailState('reply')}} >기대글</span>
                </div>
            </div>
            <div>
                {detailState ==='info' ? <ConcertInfo/> : <CommonReply/>}
            </div>
        </div>
    )
}
export default ConcertDetail