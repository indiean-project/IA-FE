import { useNavigate } from 'react-router-dom';
import PaginationBar from '../PaginationBar';
import './FreeBoardItem.scss';
import { ViewCount } from '../../apis/board';
import { useRecoilState } from 'recoil';
import { boardPoint } from '../../recoil/boardPoint';

function FreeBoardItem(props) {
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);

    if(!props.boardList) {
        return <></>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("free");
        navigate("/board/detail/"+item.boardNo);
    }

    return (
        <div className='freeboarditem__container'>
            <hr />
            <table className='freeboarditem__table'>
                <thead>
                    <tr>
                        <th className='freeboarditem__thead__no'>번호</th>
                        <th className='freeboarditem__thead__title'>제목</th>
                        <th className='freeboarditem__thead__writer'>작성자</th>
                        <th className='freeboarditem__thead__enrolldate'>등록일</th>
                        <th className='freeboarditem__thead__count'>조회</th>
                        <th className='freeboarditem__thead__like'>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {props.boardList.map((item, index) => {
                        return (
                            <tr key={index} onClick={()=>clickItem(item)}>
                                <td>{item.boardNo}</td>
                                <td className='freeboarditem__tbody__title'>{item.boardTitle}<span>[{item.replies}]</span></td>
                                <td>{item.nickname}</td>
                                <td>{item.enrollDate}</td>
                                <td>{item.viewCount}</td>
                                <td>{item.likeCount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PaginationBar pageInfo={props.pageInfo} list={props.list} />
        </div>
    )
} export default FreeBoardItem;