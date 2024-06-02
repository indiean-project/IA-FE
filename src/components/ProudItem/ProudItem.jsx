import "./ProudItem.scss";
import img from "../../assets/default/defaultImg.png";
import { MdThumbUp, MdOutlineRemoveRedEye } from "react-icons/md";
import PaginationBar from "../PaginationBar";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardPoint } from "../../recoil/boardPoint";
import { ViewCount } from "../../apis/board";
import { IoPrism } from "react-icons/io5";
import FundInputBar from "../FundInputBar";
import { cPage } from "../../recoil/page";
import toast from "react-hot-toast";

function ProudItem(props) {
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const setCpage = useSetRecoilState(cPage);

    if (!props.boardList || props.boardList.length < 1) {
        return <>
            <div className='boardItem__none'>게시글이 존재하지 않습니다.</div>
            <div className='proudItem__input__area'>
                <FundInputBar maxlength={30} width={"40%"} onChangeValue={(e) => { props.setKeyword(e.target.value) }} />
                <div className='ProudItem__btn'><a onClick={() => { searchKeyword() }}>검색</a></div>
            </div>
        </>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("proud");
        navigate("/board/detail/" + item.boardNo);
    }

    function searchKeyword() {
        if (props.keyword.trim() === '') {
            toast.error("키워드를 입력 해 주세요.");
            return
        }
        props.list();
        setCpage(1);
    }

    return (
        <div className="proudItem__container">
            <div className="proudItem__box">
                <div className="proudItem__area">
                    {props.boardList.map((item, index) => {
                        return (
                            <div className="proudItem__items" key={index} onClick={() => { clickItem(item) }}>
                                <div className="proudItem__img__area">
                                    <img src={item.imgUrl !== null ? item.imgUrl : img} alt="" />
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
                    <FundInputBar maxlength={30} width={"40%"} onChangeValue={(e) => { props.setKeyword(e.target.value) }} />
                    <div className='ProudItem__btn'><a onClick={() => { searchKeyword() }}>검색</a></div>
                </div>
            </div>
        </div>
    )
} export default ProudItem;