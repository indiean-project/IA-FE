import { useRecoilState } from "recoil";
import "./NoticeDetail.scss";
import { loginUserState } from "../../recoil/LoginUser";
import { IoPrism } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DetailNotice } from "../../apis/board";
import DOMPurify from "dompurify";

function NoticeDetail() {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [noticeItem, setNoticeItem] = useState();
    let param = useParams().id;

    const detail = async () => {
        const list = await DetailNotice(param);
        setNoticeItem(list.data);
    }

    useEffect(()=>{
        detail();
    }, [])

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
                        {loginUser.userRole === "관리자" ?
                            <>
                                <div>수정</div>
                                <div>삭제</div>
                            </>
                            :
                            ""
                        }
                        <div>목록</div>
                        <div>신고</div>
                    </div>
                </div>
                <div className='noticeDetaill__title'>
                    <label>{noticeItem.noticeTitle}</label>
                    <p dangerouslySetInnerHTML={createMarkUp(noticeItem.noticeContent)}></p>
                </div>
                {/* {modal ? <ModalWindow>
                    <div className='noticeDetail__modal'>
                        정말로 삭제 하시겠습니까?
                        <div className='noticeDetail__modal__buttom'>
                            <div onClick={() => { boardDelete() }}>예</div>
                            <div onClick={() => { setModal(false) }}>아니요</div>
                        </div>
                    </div>
                </ModalWindow> : ""} */}
            </div>
        </>
    )
} export default NoticeDetail;