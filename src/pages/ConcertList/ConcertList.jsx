import './ConcertList.scss';
import ConcertItem from '../../components/ConcertItem';
import PaginationBar from '../../components/PaginationBar';
import { NavLink } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {  useRecoilValue , useSetRecoilState} from 'recoil';

import {cPage} from '../../recoil/page'
import {pageMove} from '../../apis/pagination'
import { useEffect, useState } from 'react';

function ConcertList(){
    
    
    const currentPage = useRecoilValue(cPage);
    const [concertList,setConcertList] = useState([]);
    const [sort,setSort] = useState("최신순");
    const [text,setText] = useState();
    
    const [pageInfo,setPageInfo] = useState();
    const list = async () => {
        const currentBoard = 'concert/concertList'
                 const result =  await pageMove({
                    url: currentBoard,
                    page : currentPage,
                    sort : sort,
                    text : text
                    });
                    
                    setConcertList(result.listDto)
                    setPageInfo(result.pageinfo)
                    
    }
    useEffect(()=>{
      
        
        list();
        
    },[])
    const handleKeyEnter = (e)=>{
        if (e.key === 'Enter') { 
            list();
        }
    }

    return(
        <div className='concert__list'>
            <div className='title'>
                <h1>CONCERT LIST</h1>
                <input className='concert__search' type="text" name="search" placeholder='검색어를 입력하세요' value={text} onChange={(e)=>{setText(e.target.value)}} onKeyPress={(e)=>{handleKeyEnter(e)}}/>
            </div>
            <div className='btn__area'>
                <div>
                    <select name="score" id="select-id" onChange={(e)=>{setSort(e.target.value)}}>
                        <option value="최신순">최신순</option>
                        <option value="마감순">마감순</option>
                        <option value="조회수">죄회수</option>
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