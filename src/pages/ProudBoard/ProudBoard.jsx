import { Navigate, useNavigate } from "react-router-dom";
import BoardSidebar from "../../components/BoardSidebar";
import ProudItem from "../../components/ProudItem";
import "./ProudBoard.scss";
import { useEffect, useState } from "react";
import { cPage } from "../../recoil/page";
import { useRecoilState } from "recoil";
import { pageMove } from "../../apis/pagination";

function ProudBoard() {
    const [boardList, setBoardList] = useState ([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/proud/boardlist";
    const [keyword, setKeyword] = useState("");
    const [currentPage,setCurrentPage] = useRecoilState(cPage);
    const [pageInfo, setPageInfo] = useState();
    const category = "아티스트 자랑";
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
        <div className="proudBoard__container">
            <div className="proudBoard__box">
                <BoardSidebar category={category}/>
                <div className="proudBoard__items">
                    <div className='proudBoard__item'>
                        <div>
                            <label>{category}</label>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="boardNo">최신순</option>
                                <option value="">인기순</option>
                            </select>
                        </div>
                    </div>
                    <div className='proudBoard__item'>
                        <div className='proudBoard__category'>커뮤니티 &gt; {category}</div>
                        <div className='proudBoard__btn'><a onClick={()=>{navigate("/board/enroll", {state: {category: category}})}}>글쓰기</a></div>
                    </div>
                    <ProudItem boardList={boardList} pageInfo={pageInfo} list={list}/>
                </div>
            </div>
        </div>
    )
} export default ProudBoard;