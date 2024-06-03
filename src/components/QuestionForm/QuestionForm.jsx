import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { qEnroll } from '../../apis/qbot';
import logo_white from '../../assets/logo/logo_white.png';
import { loginUserState } from '../../recoil/LoginUser';
import { isQuestionFormActive } from '../../recoil/IsModalActive';
import ModalBackground from "../ModalBackground";

import './QuestionForm.scss';
import toast from 'react-hot-toast';

function QuestionForm() {

    const loginUser = useRecoilValue(loginUserState);
    const setModal = useSetRecoilState(isQuestionFormActive);
    const [byte, setByte] = useState(0);

    const [editQuestion, setEditQuestion] = useState({
        userNo: loginUser.userNo,
        questionContent: ''
    });

    const modalClose = () => {
        setModal(false);
    }
    const onEditQuestion = (e) => {
        setEditQuestion({
            ...editQuestion,
            [e.target.name] : e.target.value
        })
    }
    const questionUpload = async() => {
        if(byte > 4000) {
            toast.error("입력 가능한 글자 수를 초과하였습니다.");
            return;
        } else if (byte === 0) {
            toast.error("글이 입력되지 않았습니다.");
            return;
        }
    
        const result = await qEnroll(editQuestion); 

        if(result) {
            toast.success("문의 등록 성공");
            setModal(false);
        } else {
            toast.error("문의 등록 실패.");
        }
    }
    
    useEffect(() => {
        let byte = 0;
        for (let i = 0; i < editQuestion.questionContent.length; i++) {
            editQuestion.questionContent.charCodeAt(i) > 127? byte +=3 : byte++;
        }
        setByte(byte);
        if (byte > 4000) {
            toast.error("입력 가능한 글자수를 초과하였습니다.");
        }
    }, [editQuestion])

    return (
        <ModalBackground>
            <div className="questionForm__container">
                <div className="questionForm__header">
                    <img className="logo" src={logo_white} />
                    <hr />
                    <h2>문의 작성</h2>
                </div>
                <div className="questionForm__content">
                    <textarea value={editQuestion.questionContent}
                        onChange={(e) => onEditQuestion(e)}
                        id="questionContent" name="questionContent" />
                </div>
                <div className="questionForm__byte"><div>byte : {byte} / 4000 </div></div>
                <div className="questionForm__footer">
                    <div className="btn-questionForm apply" onClick={questionUpload}>등록</div>
                    <div className="btn-questionForm cancel" onClick={() => modalClose()}>취소</div>
                </div>
            </div>
        </ModalBackground>
    )
}

export default QuestionForm;