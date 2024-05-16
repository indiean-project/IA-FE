import PaginationBar from '../PaginationBar';
import './FreeBoardItem.scss';

function FreeBoardItem(props) {
    return (
        <>
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
                            <tr key={index}>
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
            <PaginationBar />
        </>
    )
} export default FreeBoardItem;