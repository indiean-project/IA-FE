import './Reply.scss';
import { BsChat } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { useEffect, useState } from 'react';
import { isModalActive } from '../../recoil/IsModalActive';
import ReportModal from '../ReportModal';
import ModalWindow from '../ModalWindow';
import { ReplyDelete } from '../../apis/reply/reply';
import toast from 'react-hot-toast';

function Reply({ replyList, setReplyState, replyState }) {
    const loginUser = useRecoilValue(loginUserState);
    const [modal, setModal] = useRecoilState(isModalActive);
    const [modalType, setModalType] = useState("");
    const [contentNo, setContentNo] = useState();
    const [replyCount, setReplyCount] = useState(0);

    const replyDelete = async () => {
        setModal(false);
        const result = await ReplyDelete(contentNo);
        result.status === "SUCCESS" ? toast.success("댓글이 삭제되었습니다.") : "";
        setReplyState(replyState === 1 ? 0 : 1);
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
                                    <td className='title'>{item.nickName}</td><td>&nbsp; {item.createDate} {loginUser.userNo === item.userNo ? <><BsPencilSquare className='pointer' /> <BsTrash className='pointer' onClick={() => { setModalType("삭제"); setModal(true); setContentNo(item.replyNo) }} /></> : ""}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='text' colSpan={2}>{item.replyContent}</td>{loginUser.userId !== "" ? <td className='report' onClick={() => { setModalType("신고"); setModal(true); setContentNo(item.replyNo) }}> 신고</td> : <td></td>}
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