import "./ProudItem.scss";
import img from "./10cm.jpg";
import { MdThumbUp, MdOutlineRemoveRedEye } from "react-icons/md";
import PaginationBar from "../PaginationBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardPoint } from "../../recoil/boardPoint";
import { ViewCount } from "../../apis/board";
import { IoPrism } from "react-icons/io5";
import FundInputBar from "../FundInputBar";
import { cPage } from "../../recoil/page";

function ProudItem(props) {
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const setCpage = useSetRecoilState(cPage);

    if (!props.boardList || props.boardList.length < 1) {
        return <>
            <div className='boardItem__none'>게시글이 존재하지 않습니다.</div>
            <div className='proudItem__input__area'>
                <FundInputBar width={"40%"} onChangeValue={(e) => { props.setKeyword(e.target.value) }} />
                <div className='ProudItem__btn'><a onClick={() => { props.list(); setCpage(1); }}>검색</a></div>
            </div>
        </>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("proud");
        navigate("/board/detail/" + item.boardNo);
    }

    return (
        <div className="proudItem__container">
            <div className="proudItem__box">
                <div className="proudItem__area">
                    {props.boardList.map((item, index) => {
                        return (
                            <div className="proudItem__items" key={index} onClick={() => { clickItem(item) }}>
                                <div className="proudItem__img__area">
                                    <img src={img} alt="" />
                                </div>
                                <div className="proudItem__item1">
                                    <div className="proudItem__title">
                                        <label htmlFor="">{item.boardTitle}<span>[{item.replies}]</span></label>
                                    </div>
                                    <div className="proudItem__nickName">
                                        {item.nickname}{item.userRole === '2' ? <IoPrism /> : item.userRole === '3' ? <IoPrism className="proudBoard__user__at" /> : item.userRole === '1' ? <IoPrism className="boardDetail__user__ad" /> : ""}
                                    </div>
                                    <div className="proudItem__item2">
                                        <div><MdOutlineRemoveRedEye /> {item.viewCount}</div>
                                        <div><MdThumbUp /> {item.likeCount}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="proudItem__page__area">
                    <PaginationBar pageInfo={props.pageInfo} list={props.list} />
                </div>
                <div className='proudItem__input__area'>
                    <FundInputBar width={"40%"} onChangeValue={(e) => { props.setKeyword(e.target.value) }} />
                    <div className='ProudItem__btn'><a onClick={() => { props.list(); setCpage(1); }}>검색</a></div>
                </div>
            </div>
        </div>
    )
} export default ProudItem;