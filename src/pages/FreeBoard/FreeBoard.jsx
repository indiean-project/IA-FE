import { NavLink, useNavigate } from 'react-router-dom';
import BoardSidebar from '../../components/BoardSidebar';
import './FreeBoard.scss';
import { useEffect, useState } from 'react';
import { pageMove } from '../../apis/pagination';
import { useRecoilState } from 'recoil';
import FreeBoardItem from '../../components/FreeBoardItem';
import { cPage } from '../../recoil/page';


function FreeBoard() {
    const [boardList, setBoardList] = useState ([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/free/boardlist";
    const [keyword, setKeyword] = useState("");
    const [currentPage,setCurrentPage] = useRecoilState(cPage);
    const [pageInfo, setPageInfo] = useState();
    const category = "자유게시판";
    const navigate = useNavigate();
    
    async function list() {
        const list = await pageMove({
            url: url,
            page: currentPage,
            sort: sort,
            keyword: keyword
        });
        setBoardList(list.listDto);
        setPageInfo(list.pageinfo);
    }
    useEffect(() => {
        list();
    }, [])

    return (
        <div className='freeboard__container'>
            <div className='freeboard__box'>
                <BoardSidebar category={category}/>
                <div className='freeboard__items'>
                    <div className='freeboard__item'>
                        <div>
                            <label>자유게시판</label>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="boardNo">최신순</option>
                                <option value="">인기순</option>
                            </select>
                        </div>
                    </div>
                    <div className='freeboard__item'>
                        <div className='freeboard__category'>커뮤니티 &gt; 자유게시판</div>
                        <div className='freeboard__btn'><a onClick={()=>{navigate("/board/enroll", {state: {category: category}})}}>글쓰기</a></div>
                    </div>
                    <FreeBoardItem boardList={boardList} pageInfo={pageInfo} list={list}/>
                </div>
            </div>
        </div>
    )
} export default FreeBoard;