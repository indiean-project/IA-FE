import { useState } from 'react';
import { ChatSquareDotsFill } from 'react-bootstrap-icons';

import QuestionBot from '../QuestionBot';

import './QuestionBotIcon.scss';

function QuestionBotIcon() { 

    const [activeQbot, setActiveQbot] = useState(false);

    const clickQBot = () => {
        setActiveQbot(!activeQbot);
        console.log(activeQbot);
    }

    return (
        <>
            <div className="chatbotIcon__container">
                <ChatSquareDotsFill size={64} color="#F2613F" 
                onClick={clickQBot} />
            </div>
            <QuestionBot activeQbot={activeQbot}/>
        </>
    )
}

export default QuestionBotIcon;