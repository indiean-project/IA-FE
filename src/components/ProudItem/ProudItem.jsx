import "./ProudItem.scss";
import img from "./10cm.jpg";
import { MdThumbUp, MdOutlineRemoveRedEye } from "react-icons/md";
import PaginationBar from "../PaginationBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardPoint } from "../../recoil/boardPoint";
import { ViewCount } from "../../apis/board";

function ProudItem(props) {
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);

    if(!props.boardList) {
        return <></>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("proud");
        navigate("/board/detail/"+item.boardNo);
    }

    return (
        <div className="proudItem__container">
            <div className="proudItem__box">        
                <div className="proudItem__area">
                    {props.boardList.map((item, index)=>{
                        return (
                            <div className="proudItem__items" key={index} onClick={()=>{clickItem(item)}}>
                                <div className="proudItem__img__area">
                                    <img src={img} alt="" />
                                </div>
                                <div className="proudItem__item1">
                                    <div className="proudItem__title">
                                        <label htmlFor="">{item.boardTitle}<span>[{item.replies}]</span></label>
                                    </div>
                                    <div className="proudItem__nickName">
                                        {item.nickname}
                                    </div>
                                    <div className="proudItem__item2">
                                        <div><MdOutlineRemoveRedEye/> {item.viewCount}</div>
                                        <div><MdThumbUp/> {item.likeCount}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="proudItem__page__area">
                    <PaginationBar pageInfo={props.pageInfo} list={props.list} />
                </div>
            </div>
        </div>
    )
} export default ProudItem;