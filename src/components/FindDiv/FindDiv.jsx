import React from 'react';
import './FindDiv.scss';

function FindDiv({onPage, setFindState}) { 
    return (
        <div className="find__divs">
            <div className={`state ${onPage === 'userId' ? 'active' : ''}`}
            onClick={() => setFindState('userId')}>
                아이디 찾기
            </div>
            <div className={`state ${onPage === 'userPwd' ? 'active' : ''}`}
            onClick={() => setFindState('userPwd')}>
                비밀번호 찾기
            </div>
        </div>
    )
}

export default FindDiv;