import { NavLink, useLocation, useParams } from 'react-router-dom';
import './ConcertDetail.scss';
import poster from './poster.jpg';
import { useEffect, useState } from 'react';
import ConcertInfo from '../../components/ConcertInfo';
import CommonReply from '../../components/CommonReply/CommonReply';
import ArtistLineUp from '../../components/ArtistLineUp';
import { selectConcert } from '../../apis/concert/concertDetail';
import { Share } from 'react-bootstrap-icons';

function ConcertDetail() {
    const boardUrl = "concert";
    const parama = useParams().id;
    const [concert, setConcert] = useState([]);
    const [detailState, setDetailState] = useState('info');
    const [lineup, setLineup] = useState();
    const concertItem = async () => {
        const concertInfo = await selectConcert(parama);
        setLineup(concertInfo.concertLineupList);
        setConcert(concertInfo)

    }


    useEffect(() => {

        concertItem()
    }, [])


    return (


        <div className='concertDetail__container'>
            <div className='concertDetail__top'>
                <div className='concertDetail__title'>
                    <h1>{concert.concertTitle}</h1>
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
                                <h2>장소</h2>
                                <div className='concertInfo'>{concert.location}</div>
                            </li>
                            <li>
                                
                                <h2>공연기간</h2>
                                <div className='concertInfo'>{concert.startDate}~{concert.endDate}</div>
                            </li>
                            <li>
                                <h2>공연시간</h2>
                                <div className='concertInfo'>{concert.runtime}</div>
                            </li>
                            <li>
                                <h2>가격</h2>
                                <div className='concertInfo'>{(+concert.concertPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                            </li>
                            <li>
                                <div className='ticketlink'>
                                    {concert.ticketUrl !== null ? <div className='btn'><NavLink target='_blank' to={concert.ticketUrl}>티켓구매</NavLink></div> : <div></div>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='concert__lineupTilte'>
                <h2>LINE UP</h2>
                <div className='btn__area'>
                    <div>
                        <Share size={20} />
                        <span className='btn1'>공유하기</span>
                    </div>
                </div>
            </div>
            <ArtistLineUp lineup={lineup} />
            <div className='concert__content__top'>
                <div>
                    <span className={`${detailState === 'info' ? 'state__on' : ''}`} onClick={() => { setDetailState('info') }}>공연정보</span>
                    <span className={`${detailState === 'reply' ? 'state__on' : ''}`} onClick={() => { setDetailState('reply') }} >기대글</span>
                </div>
            </div>
            <div className='detail__content'>
                <div className='detail__content_item'>
                    {detailState === 'info' ? <ConcertInfo /> : <CommonReply />}
                </div>
            </div>
        </div>
    )
}
export default ConcertDetail