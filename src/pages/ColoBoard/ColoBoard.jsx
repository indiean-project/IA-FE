import { NavLink } from "react-router-dom";
import BoardSidebar from "../../components/BoardSidebar";
import ColoBar from "../../components/ColoBar";
import "./ColoBoard.scss";
import { MdThumbUp } from "react-icons/md";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import CommonReply from "../../components/CommonReply/CommonReply";
import { useEffect, useState } from "react";
import { pageMove } from "../../apis/pagination";

function ColoBoard() {
    const [replyBtn, setReplyBtn] = useState('close');
    const [replyBtnValue, setReplyBtnValue] = useState('∨');
    const [boardList, setBoardList] = useState([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/colo/boardlist";
    const page = 1;

    useEffect(() => {
        async function list() {
            const list = await pageMove({
                url: url,
                page: page,
                sort: sort
            });
            console.log(list);
            setBoardList(list);
        }
        list();
    }, [])


    return (

        <div className="coloBoard__container">
            <div className="coloBoard__box">
                <BoardSidebar />
                <div className="coloBoard__items">
                    <div className="coloBoard__item1">
                        <div>
                            <label>콜로세움</label>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="boardNo">최신순</option>
                                <option value="">인기순</option>
                            </select>
                        </div>
                    </div>
                    <div className='coloBoard__item1'>
                        <div className='coloBoard__category'>커뮤니티 &gt; 콜로세움</div>
                        <div className='coloBoard__btn'><NavLink to={"/board/enroll"}>글쓰기</NavLink></div>
                    </div>
                    <hr />
                    <div className="coloBoard__items__area">
                        {boardList.map((item, index)=>{
                            return (
                                <>
                                    <div className="coloBoard__item2" key={index}>
                                        <div>No.{item.boardNo}</div>
                                        <div>{item.nickname}</div>
                                        <div>{item.enrollDate} <BsPencilSquare /> <BsTrash /></div>
                                    </div>
                                    <ColoBar list={item} />
                                    <p className="coloBoard__content" dangerouslySetInnerHTML={{__html: item.boardContent}}></p>
                                    <div className="coloBoard__item3">
                                        <div className="coloBoard__like">
                                            <div><MdThumbUp /></div>
                                            <div>{item.likeCount}</div>
                                        </div>
                                    </div>

                                    <div className="coloBoard__item4">

                                        <div className="coloBoard__reply__btn" onClick={() => {
                                            setReplyBtn(() => {
                                                replyBtn === 'close' ? setReplyBtn('open') : setReplyBtn('close')
                                            }),
                                                setReplyBtnValue(() => {
                                                    replyBtn === 'close' ? setReplyBtnValue('∧') : setReplyBtnValue('∨')
                                                })
                                        }}>{replyBtnValue} 댓글({item.replies})</div>

                                        <div className="coloBoard__report__btn">신고</div>
                                    </div>
                                    <div className={replyBtn === 'close' ? 'displayNone' : ''}>
                                        <CommonReply />

                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
} export default ColoBoard;