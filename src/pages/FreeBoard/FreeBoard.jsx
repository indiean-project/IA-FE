import { NavLink, useNavigate } from 'react-router-dom';
import BoardSidebar from '../../components/BoardSidebar';
import './FreeBoard.scss';
import { useEffect, useState } from 'react';
import { pageMove } from '../../apis/pagination';
import { useRecoilState } from 'recoil';
import FreeBoardItem from '../../components/FreeBoardItem';
import { cPage } from '../../recoil/page';
import { boardPoint } from '../../recoil/boardPoint';
import { loginUserState } from '../../recoil/LoginUser';
import toast from 'react-hot-toast';


function FreeBoard() {
    const [boardList, setBoardList] = useState([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/free/boardlist";
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useRecoilState(cPage);
    const [pageInfo, setPageInfo] = useState();
    const category = "자유게시판";
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);

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
    }, [sort])

    function writerBtn() {
        loginUser.userNo !== '' ? navigate("/board/enroll", { state: { category: category } }) : (toast.error("로그인 후 글쓰기가 가능합니다."), navigate("/login"));
    }

    return (
        <div className='freeboard__container'>
            <div className='freeboard__box'>
                <BoardSidebar category={category} />
                <div className='freeboard__items'>
                    <div className='freeboard__item'>
                        <div>
                            <label>{category}</label>
                        </div>
                        <div>
                            <select onChange={(e) => { setSort(e.target.value) }}>
                                <option value="boardNo">최신순</option>
                                <option value="viewCount">조회순</option>
                            </select>
                        </div>
                    </div>
                    <div className='freeboard__item'>
                        <div className='freeboard__category'>커뮤니티 &gt; {category}</div>
                        <div className='freeboard__btn'><a onClick={() => { writerBtn() }}>글쓰기</a></div>
                    </div>
                    <FreeBoardItem setKeyword={setKeyword} boardList={boardList} pageInfo={pageInfo} list={list} />
                </div>
            </div>
        </div>
    )
} export default FreeBoard;