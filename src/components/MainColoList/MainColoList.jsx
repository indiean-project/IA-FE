import { NavLink } from 'react-router-dom';
import { pageMove } from '../../apis/pagination';
import ColoBar from '../ColoBar/ColoBar';
import './MainColoList.scss';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const testList = [
    {
        colLeftCount: 35,
        colRightCount: 65,
        boardTitle: '박혜성 VS 세발낙지',
        colLeftTitle: '박혜성',
        colRightTitle: '세발낙지',
        colContent: '<p>나는 박혜성이다 안녕하소 반갑다</p><h1>뭘 봐 나는 박혜성이다<h2>'
    },
    {
        colLeftCount: 35,
        colRightCount: 65,
        boardTitle: '박혜성 VS 세발낙지',
        colLeftTitle: '박혜성',
        colRightTitle: '세발낙지',
        colContent: '<p>나는 박혜성이다 안녕하소 반갑다</p><h1>뭘 봐 나는 박혜성이다<h2>'
    },
    {
        colLeftCount: 165,
        colRightCount: 65,
        boardTitle: '박혜성 VS 세발낙지',
        colLeftTitle: '박혜성',
        colRightTitle: '세발낙지',
        colContent: '<p>나는 박혜성이다 안녕하소 반갑다</p><h1>뭘 봐 나는 박혜성이다<h2>'
    },
    {
        colLeftCount: 35,
        colRightCount: 25,
        boardTitle: '박혜성 VS 세발낙지',
        colLeftTitle: '박혜성',
        colRightTitle: '세발낙지',
        colContent: '<p>나는 박혜성이다 안녕하소 반갑다</p><h1>뭘 봐 나는 박혜성이다<h2>'
    },
];

function MainColoList() {

    const [openCheck, setOpenCheck] = useState([false, false, false, false]);
    //최근 인기 게시물 작업 완료 이후 작업 예정
    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    const onClickDetail = (idx) => {
        let list = [...openCheck];
        list[idx] = list[idx] ? false : true;
        setOpenCheck(list);
    }
    return (
        <div className='mainColoList__container'>
            <div className='mainColoList__header'>
                <h1>금주의 이슈</h1>
                <NavLink to={'#'}>이슈 더보기</NavLink>
            </div>
            <div className='mainColoList__box'>
                {testList.map((item, idx) => {
                    return (
                        <div className='mainColoList__item' key={idx}>
                            <div className='mainColoList__item__info' onClick={() => onClickDetail(idx)}>
                                <div>자세히 보기</div>
                            </div>
                            <ColoBar list={item} />
                            <AnimatePresence>
                                {openCheck[idx] && <motion.div className='mainColoList__item__content' dangerouslySetInnerHTML={createMarkUp(item.colContent)}>
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default MainColoList;