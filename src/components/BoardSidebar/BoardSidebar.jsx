import { useEffect, useState } from 'react';
import './BoardSidebar.scss';
import { FaFireFlameCurved } from "react-icons/fa6";
import { MdPeopleAlt, MdThumbUp } from "react-icons/md";
import { BoardAmount, BoardSideBar } from '../../apis/board';
import { NavLink } from 'react-router-dom';
function BoardSidebar({category}) {
    const [amountList, setAmountList] = useState([]);

    const boardAmount = async() => {
        const amount = await BoardAmount();
        setAmountList(amount.data);
    }
    const sideBarList = async() => {
        const result = await BoardSideBar(category);
        console.log(result);
    }
    useEffect(()=>{
        sideBarList();
        boardAmount();
    }, [])
    return (
        <div className="boardSidebar__container">
            <div className='boardSidebar__box'>
                <div className='boardSidebar__category'>커뮤니티 &gt; {category}</div>
                <hr/>
                <div className='boardSidebar__label'>
                    <label>주목받는 게시글 <FaFireFlameCurved /></label>
                </div>
                <div className='boardSidebar__post'>나는야 인기글</div>
                <div className='boardSidebar__post'>나는야 인기글</div>
                <div className='boardSidebar__post'>나는야 인기글</div>
                <div className='boardSidebar__post'>나는야 인기글</div>
                <div className='boardSidebar__post'>나는야 인기글</div>
                <hr />
                <div className='boardSidebar__label'>
                    <label>추천글 <MdThumbUp className='boardSidebar__thumb'/></label>
                </div>
                <div className='boardSidebar__post'>나는야 추천글</div>
                <div className='boardSidebar__post'>나는야 추천글</div>
                <div className='boardSidebar__post'>나는야 추천글</div>
                <div className='boardSidebar__post'>나는야 추천글</div>
                <div className='boardSidebar__post'>나는야 추천글</div>
                <hr />
                <div className='boardSidebar__label'>
                    <label>커뮤니티 <MdPeopleAlt className='boardSidebar__community'/></label>
                </div>
                <div className='community__list'>
                    <NavLink to={"/board/free"}>
                        <div className='community__list__item'>
                            <div>자유게시판</div>
                            <div>{amountList[0]}</div>
                        </div>
                    </NavLink>
                    <NavLink to={"/board/proud"}>
                        <div className='community__list__item'>
                            <div>아티스트 자랑</div>
                            <div>{amountList[1]}</div>
                        </div>
                    </NavLink>
                    <NavLink to={"/board/colo"}>
                        <div className='community__list__item'>
                            <div>콜로세움</div>
                            <div>{amountList[2]}</div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
} export default BoardSidebar;