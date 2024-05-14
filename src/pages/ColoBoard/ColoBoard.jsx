import { NavLink } from "react-router-dom";
import BoardSidebar from "../../components/BoardSidebar";
import ColoBar from "../../components/ColoBar";
import "./ColoBoard.scss";
import { MdThumbUp } from "react-icons/md";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import CommonReply from "../../components/CommonReply/CommonReply";
import { useState } from "react";

function ColoBoard() {
    const [replyBtn, setReplyBtn] = useState('close');
    const [replyBtnValue, setReplyBtnValue] = useState('∨');


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
                        <div className="coloBoard__item2">
                            <div>No.3469</div>
                            <div>user01</div>
                            <div>2024-04-23 <BsPencilSquare /> <BsTrash /></div>
                        </div>
                        <ColoBar />
                        <p className="coloBoard__content">
                            본문 내용@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                        </p>
                        <div className="coloBoard__item3">
                            <div className="coloBoard__like">
                                <div><MdThumbUp /></div>
                                <div>38</div>
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
                            }}>{replyBtnValue} 댓글(38)</div>

                            <div className="coloBoard__report__btn">신고</div>
                        </div>
                        <div className={replyBtn === 'close' ? 'coloBoard__reply__close' : ''}>
                            <CommonReply />

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
} export default ColoBoard;