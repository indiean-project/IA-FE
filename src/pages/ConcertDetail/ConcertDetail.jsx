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
                            <tr>
                                <th>장소</th><td>오방가르드</td>
                            </tr>
                            <tr>
                                <th>공연시간</th>
                            </tr>
                            <tr>
                                <td>2024.05.11~2024.05.12</td>
                            </tr>
                            <tr>
                                <th></th><td></td>
                            </tr>
                            <tr>
                                <td>dd</td>
                            </tr>
                            <tr>
                                <td>dd</td>
                            </tr>
                            <tr>
                                <td>dd</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default ConcertDetail