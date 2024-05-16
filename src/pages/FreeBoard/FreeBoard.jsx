import { NavLink } from 'react-router-dom';
import BoardSidebar from '../../components/BoardSidebar';
import './FreeBoard.scss';
import { useEffect, useState } from 'react';
import { pageMove } from '../../apis/pagination';
import { boardPoint } from '../../recoil/boardPoint';
import { useSetRecoilState } from 'recoil';
import FreeBoardItem from '../../components/FreeBoardItem';


function FreeBoard() {
    const [boardList, setBoardList] = useState ([]);
    const [sort, setSort] = useState("boardNo");
    const url = "board/free/boardlist";
    const page = 1;
    
    useEffect(() => {
        async function list() {
            // const list = await freeBoardList(page);
            const list = await pageMove({
                url: url,
                page: page,
                sort: sort
            });
            setBoardList(list);
            console.log(list);
        }
        list();
    }, [])

    return (
        <div className='freeboard__container'>
            <div className='freeboard__box'>
                <BoardSidebar />
                <div className='freeboard__items'>
                    <div className='freeboard__item'>
                        <div>
                            <label>자유게시판</label>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="boardNo">최신순</option>
                                <option value="">인기순</option>
                            </select>
                        </div>
                    </div>
                    <div className='freeboard__item'>
                        <div className='freeboard__category'>커뮤니티 &gt; 자유게시판</div>
                        <div className='freeboard__btn'><NavLink to={"/board/enroll"}>글쓰기</NavLink></div>
                    </div>
                    <FreeBoardItem boardList={boardList}/>
                </div>
            </div>
        </div>
    )
} export default FreeBoard;