import './Reply.scss';
import { BsChat } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { useEffect, useState } from 'react';
import { isModalActive } from '../../recoil/IsModalActive';
import { deleteConcertReply } from '../../apis/concert/concertDetail';
import ReportModal from '../ReportModal';
import ModalWindow from '../ModalWindow';
import { BoardReplyDelete, BoardReplyUpdate } from '../../apis/reply/reply';
import toast from 'react-hot-toast';

function Reply({ type, replyList, setReplyState, replyState }) {
    
    const loginUser = useRecoilValue(loginUserState);
    const [modal, setModal] = useRecoilState(isModalActive);
    const [modalType, setModalType] = useState("");
    const [contentNo, setContentNo] = useState();
    const [replyCount, setReplyCount] = useState(0);
    const [updateState, setUpdateState] = useState(true);
    const [updateContent, setUpdateContent] = useState();

    const replyDelete = async () => {
        setModal(false);
        console.log(contentNo);
        const result = type === "게시글" ? await BoardReplyDelete(contentNo) : await deleteConcertReply(contentNo);
        if (result.status === "SUCCESS") {
            toast.success("댓글이 삭제되었습니다.");
            setReplyState(replyState === 1 ? 0 : 1);
        }else{
            toast.error("댓글이 삭제에 실패했습니다.");
            setReplyState(replyState === 1 ? 0 : 1);
        }
        
    }

    const updateReply = async (replyNo) => {
        if (updateContent.trim() === "") {
            toast.error("내용을 입력해주세요.");
            return
        }

        const result = type === "게시글" ? await BoardReplyUpdate({
            member: {
                userNo: loginUser.userNo
            },
            board: {
                boardNo: contentNo
            },
            replyContent: updateContent,
            replyNo: replyNo
        }) : "";
        if (result.status === "SUCCESS") {
            toast.success("댓글이 수정되었습니다.")
            setUpdateState(updateState ? false : true);
            setReplyState(replyState === 1 ? 0 : 1);
        };
    }

    if (!replyList) {
        return <></>
    }


    return (
        <div className='reply__container'>
            <div className='reply__count'><BsChat /> &nbsp; 댓글({replyList.length})</div>
            <div className='reply__text'>
                {replyList.map((item, index) => {
                    return (
                        <table key={index}>
                            <thead>
                                <tr>
                                    <td className='title'>{item.nickName}</td><td>&nbsp; {item.createDate} {loginUser.userNo === item.userNo ? <><BsPencilSquare className='pointer' onClick={() => {setUpdateState(updateState ? false : true); setUpdateContent(item.replyContent)}} /> <BsTrash className='pointer' onClick={() => { setModalType("삭제"); setModal(true); setContentNo(item.replyNo) }} /></> : ""}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {updateState ? <td className='text' colSpan={2}>{item.replyContent}</td> : <td className='text' colSpan={2}><input className='reply__inputBar' type="text" value={updateContent} onChange={(e)=>{setUpdateContent(e.target.value)}} /><button className='reply__btn' onClick={()=>{updateReply(item.replyNo)}}>수정</button></td>}{loginUser.userId !== "" ? <td className='report' onClick={() => { setModalType("신고"); setModal(true); setContentNo(item.replyNo) }}> 신고</td> : <td></td>}
                                </tr>
                                <tr>
                                    <td colSpan={3}><hr></hr></td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
                {modal && modalType === "삭제" ? <ModalWindow>
                    <div className='boardDetail__modal'>
                        정말로 삭제 하시겠습니까?
                        <div className='boardDetail__modal__buttom'>
                            <div onClick={() => { replyDelete() }}>예</div>
                            <div onClick={() => { setModal(false) }}>아니요</div>
                        </div>
                    </div>
                </ModalWindow> :
                    modal && modalType === "신고" ? <ReportModal contentNo={contentNo} brType={"REPLY"} setModal={setModal} /> : ""}

            </div>
        </div>
    )
} export default Reply