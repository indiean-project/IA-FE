import { Navigate, useNavigate } from "react-router-dom";
import BoardSidebar from "../../components/BoardSidebar";
import ProudItem from "../../components/ProudItem";
import "./ProudBoard.scss";
import { useEffect, useState } from "react";
import { cPage } from "../../recoil/page";
import { useRecoilState } from "recoil";
import { pageMove } from "../../apis/pagination";
import { loginUserState } from "../../recoil/LoginUser";
import toast from "react-hot-toast";

function ProudBoard() {
    const [boardList, setBoardList] = useState([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/proud/boardlist";
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useRecoilState(cPage);
    const [pageInfo, setPageInfo] = useState();
    const category = "아티스트 자랑";
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
        <div className="proudBoard__container">
            <div className="proudBoard__box">
                <BoardSidebar category={category} />
                <div className="proudBoard__items">
                    <div className='proudBoard__item'>
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
                    <div className='proudBoard__item'>
                        <div className='proudBoard__category'>커뮤니티 &gt; {category}</div>
                        <div className='proudBoard__btn'><a onClick={() => { writerBtn() }}>글쓰기</a></div>
                    </div>
                    <ProudItem setKeyword={setKeyword} boardList={boardList} pageInfo={pageInfo} list={list} />
                </div>
            </div>
        </div>
    )
} export default ProudBoard;