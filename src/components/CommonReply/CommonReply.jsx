import { useState, useRef, useEffect } from 'react';
import './CommonReply.scss';
import Reply from '../Reply'
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import toast from 'react-hot-toast';
import { BoardReplyEnroll, BoardReplyList } from '../../apis/reply/reply';

function CommonReply({ type, contentNo }) {
    const inputRef = useRef(null);
    const loginUser = useRecoilValue(loginUserState);
    const [replyText, setReplyText] = useState('');
    const [replyList, setReplyList] = useState();

    useEffect(() => {
        if (loginUser.userId === "") {
            inputRef.current.placeholder = "로그인이 필요합니다.";
            inputRef.current.readOnly = true;
        }
        reply();
    }, [])

    const clickOn = async () => {
        if (loginUser.userId === "") {
            toast.error("로그인해주세요");
            return;
        }
        const result = type === "게시글" ? await BoardReplyEnroll({
            member: {
                userNo: loginUser.userNo
            },
            board: {
                boardNo: contentNo
            },
            replyContent: replyText
        }) : "";
        if (result.status === "SUCCESS") {
            toast.success("댓글이 등록되었습니다.");
            setReplyText("");
            reply();
        }
    }

    const reply = async () => {
        const result = type === "게시글" ? await BoardReplyList(contentNo) : "";
        setReplyList(result.data);
        console.log(result.data);
    }
    return (
        <>
            <div className='Common__reply__box'>
                <div className='Common__reply__content'>
                    <div className='reply__input'>
                        <textarea type="text" ref={inputRef} value={replyText} rows={6} onChange={(e) => { setReplyText(e.target.value) }} />
                        <div className='Common__reply__btn__area'>
                            <div className='btn' onClick={clickOn}>등록</div>
                        </div>
                    </div>
                    <Reply replyList={replyList}></Reply>
                </div>
            </div>
        </>
    )

} export default CommonReply