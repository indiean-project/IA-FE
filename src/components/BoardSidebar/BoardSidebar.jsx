import './BoardSidebar.scss';

function BoardSidebar() {
    return (
        <div className="boardSidebar__container">
            <div className='boardSidebar__box'>
                <div>커뮤니티 > 자유게시판</div>
                <hr/>
                <label>인기글</label>
                <div>나는야 인기글</div>
                <div>나는야 인기글</div>
                <div>나는야 인기글</div>
                <div>나는야 인기글</div>
                <div>나는야 인기글</div>
                <hr />
                <label>추천글</label>
                <div>나는야 추천글</div>
                <div>나는야 추천글</div>
                <div>나는야 추천글</div>
                <div>나는야 추천글</div>
                <div>나는야 추천글</div>
                <hr />
                <label>커뮤니티</label>
                <div className='community__list'>
                    <div>자유게시판</div>
                    <div>4624</div>
                </div>
                <div className='community__list'>
                    <div>아티스트 자랑</div>
                    <div>3849</div>
                </div>
                <div className='community__list'>
                    <div>콜로세움</div>
                    <div>3469</div>
                </div>
            </div>
        </div>
    )
} export default BoardSidebar;