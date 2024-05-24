import './NoticeSidebar.scss';

function NoticeSidebar() {
    return (
        <div className="noticeSidebar__container">
            <div className='noticeSidebar__box'>
                <div className='noticeSidebar__category'>고객지원 &gt; 공지사항</div>
                <hr />
                <div className='noticeSidebar__label'>
                    <label>고객지원</label>
                </div>
                    <div className='noticeSidebar__post' >1:1 문의</div>
                    <div className='noticeSidebar__post' >아티스트 신청하기</div>
            </div>
        </div>
    )
} export default NoticeSidebar;