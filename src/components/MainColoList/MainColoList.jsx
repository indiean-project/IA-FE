import { NavLink } from 'react-router-dom';
import { pageMove } from '../../apis/pagination';
import ColoBar from '../ColoBar/ColoBar';
import './MainColoList.scss';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { weeklyColo } from '../../apis/board';
import { shuffle } from 'lodash';

function MainColoList() {
    const [coloList, setColoList] = useState([]);
    const [openCheck, setOpenCheck] = useState([false, false, false, false]);

    useEffect(()=>{
        getColoList();
    },[])

    const getColoList = async()=>{
        const list = await weeklyColo();
        setColoList(shuffle(list['data']).slice(5, list['data'].length -1));
    }

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
                <NavLink to={'/board/colo'}>이슈 더보기</NavLink>
            </div>
            <div className='mainColoList__box'>
                {coloList.map((item, idx) => {
                    return (
                        <div className='mainColoList__item' key={idx}>
                            <div className='mainColoList__item__info' onClick={() => onClickDetail(idx)}>
                                <div>자세히 보기</div>
                            </div>
                            <ColoBar list={item} />
                            <AnimatePresence>
                                {openCheck[idx] && <motion.div className='mainColoList__item__content' dangerouslySetInnerHTML={createMarkUp(item.boardContent)}>
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