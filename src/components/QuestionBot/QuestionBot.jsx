import { useState, useEffect } from 'react';

import './QuestionBot.scss';

function QuestionBot({ activeQbot }) { 

    const [check, setCheck] = useState('');

    // const checkQbot = async (check) => {
    //     if(check === '') {
    //         setCheck('');
    //         return;
    //     }
        
    //     if(activeQbot === true) {
    //         setCheck('open');
    //     } else {
    //         setCheck('');
    //     }
    // }
    useEffect(() => {
        if(activeQbot) {
            setCheck('operate');
        } else {
            setCheck('');
        }
    }, [activeQbot]);

    return (
        <>
            <div className={`chatbot__container ${check}`}>
                ㅎㅇㅎㅇㅎㅇㅎㅎㅇㅎㅇㅎㅇㅎ
            </div>
        </>
    )
}

export default QuestionBot;