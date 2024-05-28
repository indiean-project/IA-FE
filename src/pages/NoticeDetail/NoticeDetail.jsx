import { useRecoilState } from "recoil";
import "./NoticeDetail.scss";
import { loginUserState } from "../../recoil/LoginUser";
import { IoPrism } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DetailNotice, NoticeDelete } from "../../apis/board";
import DOMPurify from "dompurify";
import { isModalActive } from "../../recoil/IsModalActive";
import ModalWindow from "../../components/ModalWindow";
import toast from "react-hot-toast";

function NoticeDetail() {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [noticeItem, setNoticeItem] = useState();
    const navigate = useNavigate();
    let param = useParams().id;
    const [modal, setModal] = useRecoilState(isModalActive);

    const detail = async () => {
        const list = await DetailNotice(param);
        setNoticeItem(list.data);
    }

    function update() {
        navigate("/notice/enroll", {state: {noticeItem: noticeItem}});
    }
    const deleteNotice = async () => {
        setModal(false);
        const result = await NoticeDelete(param);
        if (result.status === "SUCCESS") {
            toast.success("게시글이 삭제되었습니다.");
            navigate("/notice");
        }
    }

    useEffect(()=>{
        detail();
    }, [param])

    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    if(!noticeItem) {
        return <></>
    }

    return (
        <>
            <div className='noticeDetail__container'>
                <div className='noticeDetail__box'>
                    <div className='noticeDetail__item'>
                        <div>No.{noticeItem.noticeNo}</div>
                        <div>{noticeItem.nickName}<IoPrism className="noticeDetail__user__ad"/></div>
                    </div>
                    <div>{noticeItem.updateDate !== "null" ? noticeItem.updateDate : noticeItem.enrollDate }</div>
                    <div className='noticeDetail__item'>
                        <div>조회 : {noticeItem.viewCount}</div>
                    </div>
                </div>
                <hr className='noticeDetail__hr' />
                <div className='noticeDetail__box'>
                    <div>공지사항</div>
                    <div className='noticeDetail__item'>
                        {loginUser.userRole === "ADMIN" ?
                            <>
                                <div onClick={() => {update()}}>수정</div>
                                <div onClick={() => {setModal(true)}}>삭제</div>
                            </>
                            :
                            ""
                        }
                        <div onClick={()=>{navigate("/notice")}}>목록</div>
                    </div>
                </div>
                <div className='noticeDetaill__title'>
                    <label>{noticeItem.noticeTitle}</label>
                    <p dangerouslySetInnerHTML={createMarkUp(noticeItem.noticeContent)}></p>
                </div>
                <div className="noticeDetail__item__btn">
                    <div className="noticeDetail__btn" onClick={()=>{navigate("/notice")}}>목록</div>
                </div>
                {modal ? <ModalWindow>
                    <div className='noticeDetail__modal'>
                        정말로 삭제 하시겠습니까?
                        <div className='noticeDetail__modal__buttom'>
                            <div className="noticeDetail__btn" onClick={() => { deleteNotice() }}>예</div>
                            <div className="noticeDetail__btn" onClick={() => { setModal(false) }}>아니요</div>
                        </div>
                    </div>
                </ModalWindow> : ""}
            </div>
        </>
    )
} export default NoticeDetail;