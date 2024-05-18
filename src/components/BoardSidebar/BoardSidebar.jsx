import { useEffect, useState } from 'react';
import './BoardSidebar.scss';
import { FaFireFlameCurved } from "react-icons/fa6";
import { MdPeopleAlt, MdThumbUp } from "react-icons/md";
import { BoardAmount } from '../../apis/board';
function BoardSidebar({category}) {
    const [amountList, setAmountList] = useState([]);

    const boardAmount = async() => {
        const amount = await BoardAmount();
        setAmountList(amount.data);
    }
    useEffect(()=>{
        boardAmount();
    }, [])
    return (
        <div className="boardSidebar__container">
            <div className='boardSidebar__box'>
                <div className='boardSidebar__category'>커뮤니티 &gt; {category}</div>
                <hr/>
                <div className='boardSidebar__label'>
                    <label>인기글 <FaFireFlameCurved /></label>
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
                    <div className='community__list__item'>
                        <div>자유게시판</div>
                        <div>{amountList[0]}</div>
                    </div>
                    <div className='community__list__item'>
                        <div>아티스트 자랑</div>
                        <div>{amountList[1]}</div>
                    </div>
                    <div className='community__list__item'>
                        <div>콜로세움</div>
                        <div>{amountList[2]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
} export default BoardSidebar;