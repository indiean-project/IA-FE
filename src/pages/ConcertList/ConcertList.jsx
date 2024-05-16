import './ConcertList.scss';
import ConcertItem from '../../components/ConcertItem';
import PaginationBar from '../../components/PaginationBar';
import { NavLink } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRecoilState} from 'recoil';
import {calendarList} from '../../apis/calendarList'
import { cPage } from '../../recoil/page'
import { pageMove } from '../../apis/pagination'
import { useEffect, useState } from 'react';

function ConcertList() {

    const eventColor = ['blue', 'green', 'red', 'gray', 'black']
    const [currentPage,setCurrentPage] = useRecoilState(cPage);
    const [concertList, setConcertList] = useState([]);
    const [sort, setSort] = useState("createDate");
    const [keyword, setKeyword] = useState("");
    const [event, setEvent] = useState();
    const [pageInfo, setPageInfo] = useState();
    const list = async () => {

        const currentBoard = 'concert/concertList'
        const result = await pageMove({
            url: currentBoard,
            page: currentPage,
            sort: sort,
            keyword: keyword
        });

        setConcertList(result.listDto)
        setPageInfo(result.pageinfo)

    }
    const calendar = async() => {
        
        const currentCalendar = await calendarList();
        const eventList = currentCalendar.map((concert)=>{
            let date = new Date(concert.endDate)
            let endDate = new Date(date.setDate(date.getDate()+1)).toISOString().substring(0,10);
            
            return {title : concert.concertTitle, start: concert.startDate, end : endDate,color: eventColor[Math.floor(Math.random() * 6)]}
        })
        
        setEvent(eventList);
    }
    useEffect(() => {

        calendar();
        list();

    }, [])
    useEffect(() => {
        list();
        
    }, [sort])
    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            list();
        }
    }

    return (
        <div className='concert__list'>
            <div className='title'>
                <h1>CONCERT LIST</h1>
                <input className='concert__search' type="text" name="keyword" placeholder='검색어를 입력하세요' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} onKeyPress={(e) => { handleKeyEnter(e) }} />
            </div>
            <div className='btn__area'>
                <div>
                    <select name="sort" id="select-id" value={sort} onChange={(e) => { setSort(e.target.value), setCurrentPage(1) }}>
                        <option value="createDate">최신순</option>
                        <option value="endDate">마감순</option>
                    </select> &nbsp;
                    <span>정렬</span>
                </div>
                <div className='btnQ'><NavLink>공연문의</NavLink></div>
            </div>
            <ConcertItem concertList={concertList}></ConcertItem>
            <PaginationBar pageInfo={pageInfo} list={list}></PaginationBar>
            <div className='calendar__space'>
                <FullCalendar
                    locale="kr"
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true} // 주말 표시 속성
                    events={event}
                />
            </div>

        </div>

    );
}
export default ConcertList;