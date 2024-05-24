import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { isQuestionFormActive } from '../../recoil/IsModalActive';
import { MusicPlayerFill, SendFill } from 'react-bootstrap-icons';
import logo_white from '../../assets/logo/logo_white.png';
import QuestionForm from '../QuestionForm';

import './QuestionBot.scss';

function QuestionBot({ activeQbot }) {

    const [check, setCheck] = useState('');
    const [isModalOpen, setIsModalOpen] = useRecoilState(isQuestionFormActive);

    const [messages, setMessages] = useState([
        { text: 'INDIE:안 에 오신걸 환영해요!', sender: 'bot' }
    ]);

    const options = [
        '자유 문의', '공지사항', '문의 작성', '아티스트 조회', '음악 추천'
    ];

    const handleOptionClick = (index, option) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: (index+1)+'. '+option, sender: 'user' },
            getBotResponse(option)
        ]);
    };

    const handleSendMessage = () => {
        const input = document.getElementById('chatInput');
        const userMessage = input.value;
        if (userMessage.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userMessage, sender: 'user' },
                getBotResponse(userMessage)
            ]);
            input.value = '';
        }
    };

    const getBotResponse = (userMessage) => {
        switch (userMessage) {
            case '자유 문의':
                return { text: '자유 문의를 선택하셨습니다. 무엇을 도와드릴까요?', sender: 'bot' };
            case '공지사항':
                return {
                    text: (
                        <>
                            공지사항을 선택하셨습니다. 최신 공지를 확인하세요.<br/>
                            <NavLink to={"/notice"}>공지사항</NavLink>
                        </>
                    ), sender: 'bot'
                };
            case '문의 작성':
                return { 
                    text: (
                        <>
                            다음과 같이 문의 작성이 가능한 페이지로 안내드리겠습니다.<br/>
                            <p onClick={openQuestion}>* 문의 작성 폼</p>
                        </>
                    ), sender: 'bot' };
            case '아티스트 조회':
                return { text: '아티스트 조회를 선택하셨습니다. 조회할 아티스트의 이름을 입력해주세요.', sender: 'bot' };
            case '음악 추천':
                return { text: '음악 추천을 선택하셨습니다. 기분이나 상황에 맞는 음악을 추천해드릴게요.', sender: 'bot' };
            default:
                return { text: `${userMessage}`, sender: 'bot' };
        }
    };

    const openQuestion = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        if (activeQbot) {
            setCheck('operate');
        } else {
            setCheck('');
        }
    }, [activeQbot]);

    return (
        <>
            <div className={`chatbot__container ${check}`}>
                <div className="chatbot__header">
                    <img className="logo" src={logo_white} alt="logo" />
                    <p className="qbot">QuestionBot</p>
                </div>
                <div className="message__container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {message.sender === 'bot' && <MusicPlayerFill size={24} color="#F2613F" />}
                            <span>{message.text}</span>
                        </div>
                    ))}
                </div>
                <div className="options__container">
                    {options.map((option, index) => (
                        <button key={index} className="option" onClick={() => handleOptionClick(index, option)}>
                            {index + 1}. {option}
                        </button>
                    ))}
                </div>
                <div className="chatbot__footer">
                    <input type="text" id="chatInput" name="chatInput" placeholder="입력" />
                    <div className="inputButton" onClick={handleSendMessage}>
                        <SendFill size={24} color="#F2613F" />
                    </div>
                </div>
            </div>
            {isModalOpen && <QuestionForm />}
        </>
    )
}

export default QuestionBot;