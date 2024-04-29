import BoardSidebar from '../../components/BoardSidebar';
import './FreeBoard.scss';

function FreeBoard() {
    return (
        <div className='freeboard__container'>
            <BoardSidebar/>
            <div className='freeboard__box'>자유게시판</div>
        </div>
    )
} export default FreeBoard;