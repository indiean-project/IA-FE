import { NavLink } from 'react-router-dom';
import BoardSidebar from '../../components/BoardSidebar';
import PaginationBar from '../../components/PaginationBar';
import './FreeBoard.scss';
import { useEffect, useState } from 'react';
import { freeBoardList } from '../../apis/freeboardList';

function FreeBoard() {
    const [BoardList, setBoardList] = useState ([]);
    const currenPage = 1;
    useEffect(() => {
        freeBoardList(currenPage);
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
                                <option value="">최신순</option>
                                <option value="">인기순</option>
                            </select>
                        </div>
                    </div>
                    <div className='freeboard__item'>
                        <div className='freeboard__category'>커뮤니티 &gt; 자유게시판</div>
                        <div className='freeboard__btn'><NavLink to={"/board/enroll"}>글쓰기</NavLink></div>
                    </div>
                    <hr />
                    <table className='freeboard__table'>
                        <thead>
                            <tr>
                                <th className='freeboard__thead__no'>번호</th>
                                <th className='freeboard__thead__title'>제목</th>
                                <th className='freeboard__thead__writer'>작성자</th>
                                <th className='freeboard__thead__enrolldate'>등록일</th>
                                <th className='freeboard__thead__count'>조회</th>
                                <th className='freeboard__thead__like'>추천</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>4624</td>
                                <td className='freeboard__tbody__title'>샘플용 제목<span>[23]</span></td>
                                <td>artis</td>
                                <td>15:23</td>
                                <td>94</td>
                                <td>8</td>
                            </tr>
                        </tbody>
                    </table>
                    <PaginationBar/>
                </div>
            </div>
        </div>
    )
} export default FreeBoard;