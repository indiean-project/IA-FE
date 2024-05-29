import './Reply.scss';
import { BsChat } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { useEffect, useState } from 'react';
import { isModalActive } from '../../recoil/IsModalActive';
import { concertReplyUpdate, deleteConcertReply } from '../../apis/concert/concertDetail';
import ReportModal from '../ReportModal';
import ModalWindow from '../ModalWindow';
import { BoardReplyDelete, BoardReplyUpdate } from '../../apis/reply/reply';
import toast from 'react-hot-toast';

function Reply({ type, replyList, setReplyState, replyState }) {
    const [replyIdx,setReplyIdx] = useState(-1);
    const loginUser = useRecoilValue(loginUserState);
    const [modal, setModal] = useRecoilState(isModalActive);
    const [modalType, setModalType] = useState("");
    const [replyItem, setReplyItem] = useState();
    const [replyCount, setReplyCount] = useState(0);
    const [updateState, setUpdateState] = useState(true);
    const [updateContent, setUpdateContent] = useState();

    const replyDelete = async () => {
        setModal(false);
        const result = type === "게시글" ? await BoardReplyDelete(replyItem) : await deleteConcertReply(replyItem);
        if (result.status === "SUCCESS") {
            toast.success("댓글이 삭제되었습니다.");
            setReplyState(replyState === 1 ? 0 : 1);
        }else{
            toast.error("댓글이 삭제에 실패했습니다.");
            setReplyState(replyState === 1 ? 0 : 1);
        }
        
    }

    const updateReply = async (item) => {

        if (updateContent.trim() === "") {
            toast.error("내용을 입력해주세요.");
            return
        }

        const result = type === "게시글" ? await BoardReplyUpdate({
            member: {
                userNo: loginUser.userNo
            },
            board: {
                boardNo: item.boardNo
            },
            replyContent: updateContent,
            replyNo: item.replyNo
        }) : await concertReplyUpdate({
            member: {
                userNo: loginUser.userNo
            },
            concert: {
                concertNo: item.concertNo
            },
            replyContent: updateContent,
            concertReplyNo: item.concertReplyNo
        });
        if (result.status === "SUCCESS") {
            toast.success("댓글이 수정되었습니다.")
            setReplyIdx(-1);
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
                                    <td className='title'>{item.nickName}</td><td>&nbsp; {item.createDate} {loginUser.userNo === item.userNo ? <><BsPencilSquare className='pointer' onClick={() => {setReplyIdx(index === replyIdx ? -1 : index); setUpdateContent(item.replyContent)}} /> <BsTrash className='pointer' onClick={() => { setModalType("삭제"); setModal(true); setReplyItem(item) }} /></> : ""}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {replyIdx !== index? <td className='text' colSpan={2}>{item.replyContent}</td> : <td className='text' colSpan={2}><input className='reply__inputBar' type="text" value={updateContent} onChange={(e)=>{setUpdateContent(e.target.value)}} /><button className='reply__btn' onClick={()=>{updateReply(item)}}>수정</button></td>}{(loginUser.userId !== "") && (loginUser.nickname !== item.nickName) ? <td className='report' onClick={() => { setModalType("신고"); setModal(true); setReplyItem(item) }}> 신고</td> : <td></td>}
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
                    modal && modalType === "신고" ? <ReportModal replyItem={replyItem} brType={type === "게시글" ? "REPLY" : "CONCERTREPLY" } setModal={setModal} /> : ""}

            </div>
        </div>
    )
} export default Reply