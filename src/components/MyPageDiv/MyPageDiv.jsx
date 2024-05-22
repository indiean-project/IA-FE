import React from 'react';
import './MyPageDiv.scss';

function MyPageDiv({onPage, setProfilePage}) { 
    return (
        <div className="myPage__divs">
            <div className={`state ${onPage === 'main' ? 'active' : ''}`}
            onClick={() => setProfilePage('main')}>
                프로필
            </div>
            <div className={`state ${onPage === 'board' ? 'active' : ''}`}
            onClick={() => setProfilePage('board')}>
                작성글
            </div>
            <div className={`state ${onPage === 'reply' ? 'active' : ''}`}
            onClick={() => setProfilePage('reply')}>
                작성댓글
            </div>
            <div className={`state ${onPage === 'fund' ? 'active' : ''}`}
            onClick={() => setProfilePage('fund')}>
                참여펀딩
            </div>
            <div className={`state ${onPage === 'report' ? 'active' : ''}`}
            onClick={() => setProfilePage('report')}>
                문의/신고내역
            </div>
        </div>
    )
}

export default MyPageDiv;