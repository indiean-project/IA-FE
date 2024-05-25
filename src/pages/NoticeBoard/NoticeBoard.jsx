import { useRecoilState } from 'recoil';
import FreeBoardItem from '../../components/FreeBoardItem';
import NoticeSidebar from '../../components/NoticeSidebar';
import './NoticeBoard.scss';
import { cPage } from '../../recoil/page';
import { useEffect, useState } from 'react';
import { pageMove } from '../../apis/pagination';
import { loginUserState } from '../../recoil/LoginUser';

function NoticeBoard() {
    const [boardList, setBoardList] = useState([]);
    const [sort, setSort] = useState("noticeNo");
    const url = "notice/list";
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useRecoilState(cPage);
    const [pageInfo, setPageInfo] = useState();
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);

    const list = async () => {
        const list = await pageMove({
            url: url,
            page: currentPage,
            sort: sort,
            keyword: keyword
        })
        setBoardList(list.listDto);
        setPageInfo(list.pageinfo);
    }

    useEffect(()=>{
        list();
    }, [sort])

    return (
        <div className='noticeboard__container'>
            <div className='noticeboard__box'>
                <NoticeSidebar />
                <div className='noticeboard__items'>
                    <div className='noticeboard__item'>
                        <div>
                            <label>공지사항</label>
                        </div>
                        <div>
                            <select onChange={(e)=>{setSort(e.target.value)}}>
                                <option value="noticeNo">최신순</option>
                                <option value="viewCount">조회순</option>
                            </select>
                        </div>
                    </div>
                    <div className='noticeboard__item'>
                        <div className='noticeboard__category'>커뮤니티 &gt; 공지사항</div>
                        {loginUser.userRole === "ADMIN" ? <div className='noticeboard__btn'><a>글쓰기</a></div> : ""}
                    </div>
                    <FreeBoardItem setKeyword={setKeyword} boardList={boardList} pageInfo={pageInfo} list={list}/>
                </div>
            </div>
        </div>
    )
} export default NoticeBoard;