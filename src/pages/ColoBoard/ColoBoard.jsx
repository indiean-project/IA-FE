import { useLocation, useNavigate } from "react-router-dom";
import BoardSidebar from "../../components/BoardSidebar";
import ColoBar from "../../components/ColoBar";
import "./ColoBoard.scss";
import { MdThumbUp } from "react-icons/md";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import CommonReply from "../../components/CommonReply/CommonReply";
import { useEffect, useState } from "react";
import { pageMove } from "../../apis/pagination";
import { useRecoilState } from "recoil";
import { cPage } from "../../recoil/page";
import PaginationBar from "../../components/PaginationBar";
import { LikeCount } from "../../apis/board";
import DOMPurify from "dompurify";
import { loginUserState } from "../../recoil/LoginUser";

function ColoBoard() {
    const [replyBtn, setReplyBtn] = useState([]);
    const [boardList, setBoardList] = useState([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/colo/boardlist";
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useRecoilState(cPage);
    const [pageInfo, setPageInfo] = useState();
    const category = "콜로세움";
    const navigate = useNavigate();
    const [likeState, setLikeState] = useState();
    const location = useLocation();
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
        replyBtn.length === 0 ? setReplyBtn(new Array(list.listDto.length).fill('close')) : ""
    }
    
    useEffect(() => {
        location.state !== null ? location.state.state === "SUCCESS" ? window.scrollTo(0, 0) : "" : "";
        list();
    }, [likeState])

    function toggleReplyBtn(index) {
        setReplyBtn((prevState) => {
            const state = [...prevState];
            state[index] = state[index] === 'close' ? 'open' : 'close';
            return state
        })
    }

    const likeCount = async (boardNo) => {
        const like = await LikeCount({
            contentNo: boardNo,
            brType: "BOARD",
            member: {
                userNo: loginUser.userNo
            }
        })
        setLikeState(like.status);
        list();
    }

    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    return (

        <div className="coloBoard__container">
            <div className="coloBoard__box">
                <BoardSidebar category={category}/>
                <div className="coloBoard__items">
                    <div className="coloBoard__item1">
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
                    <div className='coloBoard__item1'>
                        <div className='coloBoard__category'>커뮤니티 &gt; {category}</div>
                        <div className='coloBoard__btn'><a onClick={()=>{navigate("/board/enroll", {state: {category: category}})}}>글쓰기</a></div>
                    </div>
                    <hr />
                    {boardList != undefined && boardList.map((item, index) => {
                        return (
                            <div className="coloBoard__items__area" key={index}>
                                <div className="coloBoard__item2">
                                    <div>No.{item.boardNo}</div>
                                    <div>{item.nickname}</div>
                                    <div>{item.enrollDate} <BsPencilSquare /> <BsTrash /></div>
                                </div>
                                <ColoBar list={item} />
                                <p className="coloBoard__content" dangerouslySetInnerHTML={createMarkUp(item.boardContent)}></p>
                                <div className="coloBoard__item3">
                                    <div className="coloBoard__like" onClick={()=>likeCount(item.boardNo)}>
                                        <div><MdThumbUp /></div>
                                        <div>{item.likeCount}</div>
                                    </div>
                                </div>

                                <div className="coloBoard__item4">

                                    <div className="coloBoard__reply__btn" onClick={() => toggleReplyBtn(index)}>
                                        {replyBtn[index] === 'close' ? '∧' : '∨'} 댓글({item.replies})</div>

                                    <div className="coloBoard__report__btn">신고</div>
                                </div>
                                <div className={replyBtn[index] === 'close' ? 'displayNone' : ''}>
                                    <CommonReply />

                                </div>
                            </div>

                        )
                    })}
                    <PaginationBar pageInfo={pageInfo} list={list} />
                </div>
            </div>
        </div>

    )
} export default ColoBoard;