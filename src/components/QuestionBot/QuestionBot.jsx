import { useState, useEffect } from 'react';
import { MusicPlayerFill, SendFill } from 'react-bootstrap-icons';
import logo_white from '../../assets/logo/logo_white.png'

import './QuestionBot.scss';

function QuestionBot({ activeQbot }) {

    const [check, setCheck] = useState('');

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
                    <img className="logo" src={logo_white} /><p className="qbot">QuestionBot</p>
                </div>
                <div className="message__container">
                    <div className="message bot">
                        <MusicPlayerFill size={24} color="#F2613F" />
                        <span>봇 메세지!!</span>
                    </div>
                    <div className="message user"><span>유저 메세지!!</span></div>
                </div>
                <div className="chatbot__footer">
                    <input type="text" id="chatInput" name="chatInput"
                        placeholder="입력" />
                    <div className="inputButton">
                        <SendFill size={24} color="#F2613F" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default QuestionBot;