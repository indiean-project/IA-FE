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
import { BoardDelete, LikeCount } from "../../apis/board";
import DOMPurify from "dompurify";
import { loginUserState } from "../../recoil/LoginUser";
import toast from "react-hot-toast";
import { IoPrism } from "react-icons/io5";
import { isModalActive } from "../../recoil/IsModalActive";
import ModalWindow from "../../components/ModalWindow";

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
    const [modal, setModal] = useRecoilState(isModalActive);
    const [boardNo, setBoardNo] = useState();

    async function list() {
        const list = await pageMove({
            url: url,
            page: currentPage,
            sort: sort,
            keyword: keyword
        });
        console.log(list)
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
    const boardDelete = async() => {
        setModal(false);
        const result = await BoardDelete({boardNo: boardNo})
        result.status === "SUCCESS" ? toast.success("게시글이 성공적으로 삭제되었습니다.") : toast.error("게시글 삭제에 실패하였습니다.");
        result.status === "SUCCESS" ? window.scroll(0, 0) : "";
        list();
    }

    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    function writerBtn() {
        loginUser.userNo !== '' ? navigate("/board/enroll", {state: {category: category}}) : (toast.error("로그인 후 글쓰기가 가능합니다."), navigate("/login"));
    }

    function boardUpdate(item) {
        navigate("/board/enroll", {state : {boardItem: item, boardCategory: "colo"}})
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
                        <div className='coloBoard__btn'><a onClick={()=>{writerBtn()}}>글쓰기</a></div>
                    </div>
                    <hr />
                    {boardList != undefined && boardList.map((item, index) => {
                        return (
                            <div className="coloBoard__items__area" key={index}>
                                <div className="coloBoard__item2">
                                    <div>No.{item.boardNo}</div>
                                    <div>{item.nickname}{item.userRole === '2' ? <IoPrism/> : item.userRole === '3' ? <IoPrism className="coloBoard__user__at"/> : boardItem.userRole === '1' ? <IoPrism className="boardDetail__user__ad"/> : ""}</div>
                                    <div>{item.updateDate === null ? item.enrollDate + " " : item.updateDate + "(수정됨) "}
                                    {item.userNo === loginUser.userNo ? 
                                        <>
                                            <BsPencilSquare onClick={()=>{boardUpdate(item)}} /> <BsTrash onClick={()=>{setModal(true); setBoardNo(item.boardNo)}}/>
                                        </>
                                        :
                                        ""
                                    }
                                    </div>
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
            {modal ? <ModalWindow>
                <div className='boardDetail__modal'>
                    정말로 삭제 하시겠습니까?
                    <div className='boardDetail__modal__buttom'>
                        <div onClick={()=>{boardDelete()}}>예</div>
                        <div onClick={()=>{setModal(false)}}>아니요</div>
                    </div>
                </div>
            </ModalWindow> : ""}
        </div>

    )
} export default ColoBoard;