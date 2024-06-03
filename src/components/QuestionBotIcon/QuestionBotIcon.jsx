import { useState } from 'react';
import { ChatSquareDotsFill, QuestionLg } from 'react-bootstrap-icons';

import QuestionBot from '../QuestionBot';

import './QuestionBotIcon.scss';

function QuestionBotIcon() { 

    const [activeQbot, setActiveQbot] = useState(false);

    const clickQBot = () => {
        setActiveQbot(!activeQbot);
    }

    return (
        <>
            <div className="chatbotIcon__container" onClick={clickQBot}>
                 <QuestionLg size={30}
                 />
            </div>
            <QuestionBot activeQbot={activeQbot}/>
        </>
    )
}

export default QuestionBotIcon;