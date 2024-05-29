import { useNavigate } from 'react-router-dom';
import PaginationBar from '../PaginationBar';
import './FreeBoardItem.scss';
import { ViewCount } from '../../apis/board';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { boardPoint } from '../../recoil/boardPoint';
import FundInputBar from '../FundInputBar';
import { cPage } from '../../recoil/page';
import { IoPrism } from "react-icons/io5";

function FreeBoardItem(props) {
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const setCpage = useSetRecoilState(cPage);

    if (!props.boardList || props.boardList.length < 1) {
        return <><div className='boardItem__none'>게시글이 존재하지 않습니다.</div>
            <div className='freeboarditem__input__area'>
                <FundInputBar width={"40%"} onChangeValue={(e) => { props.setKeyword(e.target.value) }} />
                <div className='freeboarditem__btn'><a onClick={() => { props.list(); setCpage(1); }}>검색</a></div>
            </div>
        </>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("free");
        navigate("/board/detail/" + item.boardNo);
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
                        {props.boardList[0].boardNo !== undefined ? <th className='freeboarditem__thead__like'>추천</th> : ""}
                    </tr>
                </thead>
                <tbody>
                    {props.boardList.map((item, index) => {
                        return (
                            item.boardNo !== undefined ?
                                <tr key={index} onClick={() => clickItem(item)}>
                                    <td>{item.boardNo}</td>
                                    <td className='freeboarditem__tbody__title'>{item.boardTitle}<span>[{item.replies}]</span></td>
                                    <td>{item.nickname}{item.userRole === '2' ? <IoPrism /> : item.userRole === '3' ? <IoPrism className="freeBoard__user__at" /> : item.userRole === '1' ? <IoPrism className="freeBoard__user__ad" /> : ""}</td>
                                    <td>{item.enrollDate}</td>
                                    <td>{item.viewCount}</td>
                                    <td>{item.likeCount}</td>
                                </tr>
                                :
                                <tr key={index} onClick={()=>{props.clickItem(item)}}>
                                    <td>{item.noticeNo}</td>
                                    <td className='freeboarditem__tbody__title'>{item.noticeTitle}</td>
                                    <td>{item.nickName}<IoPrism className="freeBoard__user__ad" /></td>
                                    <td>{item.updateDate === null ? item.enrollDate : item.updateDate}</td>
                                    <td>{item.viewCount}</td>
                                </tr>
                        )
                    })

                    }
                </tbody>
            </table>
            <PaginationBar pageInfo={props.pageInfo} list={props.list} />
            <div className='freeboarditem__input__area'>
                <FundInputBar maxlength={30} width={"40%"} onChangeValue={(e) => { props.setKeyword(e.target.value) }} />
                <div className='freeboarditem__btn'><a onClick={() => { props.list(); setCpage(1); }}>검색</a></div>
            </div>
        </div>
    )
} export default FreeBoardItem;