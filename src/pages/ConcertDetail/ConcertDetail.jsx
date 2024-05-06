import { NavLink } from 'react-router-dom';
import './ConcertDetail.scss';
import poster from './poster.jpg'

function ConcertDetail (){

    



    return (
        <div className='concertDetail__container'>
            <div className='concertDetail__top'>
                <div className='concertDetail__title'>
                [부산] 6eyes 내한 with 소음발광, 칩앤스위트
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

        </div>
    )
}
export default ConcertDetail