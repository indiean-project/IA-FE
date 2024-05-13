import './ConcertList.scss';
import ConcertItem from '../../components/ConcertItem';
import PaginationBar from '../../components/PaginationBar';
import { NavLink } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRecoilState , useRecoilValue} from 'recoil';
import { boardPoint } from '../../recoil/boardPonit';
import {cPage} from '../../recoil/page'
import {pageMove} from '../../apis/pagination'
import { useEffect, useState } from 'react';

function ConcertList(){
    
    const [cBoard,setCboard] = useRecoilState(boardPoint);
    const currentPage = useRecoilValue(cPage);
    const [concertList,setConcertList] = useState([]);

    useEffect(()=>{
        const list = async () => {
            const currentBoard = 'concert/concertList'
            setCboard('concert/concertList')
            setConcertList(await pageMove(currentBoard,currentPage));
          console.log(currentPage)
        }
        list();
    },[])

    return(
        <div className='concert__list'>
            <div className='title'>
                <h1>CONCERT LIST</h1>
                <input className='concert__search' type="text" name="" placeholder='검색어를 입력하세요'/>
            </div>
            <div className='btn__area'>
                <div>
                    <select name="score" id="select-id">
                        <option value="A">최신순</option>
                        <option value="B">지역별</option>
                        <option value="C">추천순</option>
                    </select> &nbsp;
                    <span>정렬</span>
                </div>
                <div className='btnQ'><NavLink>공연문의</NavLink></div>
            </div>
            <ConcertItem concertList={concertList}></ConcertItem>
            <PaginationBar></PaginationBar>
            <div className='calendar__space'>
                <FullCalendar
                    locale="kr"
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true} // 주말 표시 속성
                    events={[
                    { title: 'Event 1', date: '2024-05-01' },
                    { title: 'Event 2', date: '2024-05-02' }

                    ]}
                />
            </div>

        </div>
       
    );
}
export default ConcertList;