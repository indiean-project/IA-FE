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
                        <table>
                            <tbody>
                                <tr>
                                    <th>장소</th><td><span>오방가르드</span></td>
                                </tr>
                                <tr>
                                    <th>공연시간</th>
                                </tr>
                                <tr>
                                    <td className='concertDetail__date' colSpan={2}>2024.05.11~2024.05.12</td>
                                </tr>
                                <tr>
                                    <th>공연시간</th><td>100분</td>
                                </tr>
                                <tr >
                                    <th colSpan={2}>가격</th>
                                </tr>
                                <tr>
                                    <td colSpan={2}><span>• 입장료 <br></br>부산 예매 25,000 / 현매 30,000(정원 100명 한정)</span></td>
                                </tr>
                            </tbody>
                        </table>
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