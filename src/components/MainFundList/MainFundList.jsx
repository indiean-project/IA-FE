import { useEffect, useState } from 'react';
import './MainFundList.scss';
import { selectSoonFund } from '../../apis/fund/fund';
import { shuffle } from 'lodash';
import { motion, AnimatePresence } from "framer-motion";
import FundItem from '../FundItem';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

const fundVariants1 = {
    entry: (active) => ({
        x: active ? -800 : -445,
        opacity: 0,
        scale: active ? 0.6 : 0.6
    }),
    center: {
        opacity: 0.3,
        x: -630,
        scale: 0.6,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? -445 : -800,
        opacity: 0,
        scale: active ? 0.6 : 0.6,
        transition: { duration: 0.3 }
    })
};
const fundVariants2 = {
    entry: (active) => ({
        x: active ? -630 : -230,
        opacity: 0,
        scale: active ? 0.6 : 0.8
    }),
    center: {
        opacity: 0.6,
        x: -445,
        scale: 0.6,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? -230 : -630,
        opacity: 0,
        scale: active ? 0.8 : 0.6,
        transition: { duration: 0.3 }
    })
};
const fundVariants3 = {
    entry: (active) => ({
        x: active ? -445 : 0,
        opacity: active ? 0 : 1,
        scale: active ? 0.6 : 1
    }),
    center: {
        opacity: 0.7,
        x: -230,
        scale: 0.8,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? 0 : -445,
        opacity: 0,
        scale: active ? 1 : 0.6,
        transition: { duration: 0.3 }
    })
};
const fundVariants4 = {
    entry: (active) => ({
        x: active ? -230 : 230,
        opacity: 0,
        scale: 0.8
    }),
    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? 230 : -230,
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3 }
    })
};
const fundVariants5 = {
    entry: (active) => ({
        x: active ? 0 : 445,
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.6
    }),
    center: {
        opacity: 0.7,
        x: 230,
        scale: 0.8,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? 445 : 0,
        opacity: 0,
        scale: active ? 0.6 : 1,
        transition: { duration: 0.3 }
    })
};
const fundVariants6 = {
    entry: (active) => ({
        x: active ? 230 : 630,
        opacity: 0,
        scale: active ? 0.8 : 0.6
    }),
    center: {
        opacity: 0.6,
        x: 445,
        scale: 0.6,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? 630 : 230,
        opacity: 0,
        scale: active ? 0.6 : 0.8,
        transition: { duration: 0.3 }
    })
};
const fundVariants7 = {
    entry: (active) => ({
        x: active ? 445 : 800,
        opacity: 0,
        scale: 0.6
    }),
    center: {
        opacity: 0.3,
        x: 630,
        scale: 0.6,
        transition: { duration: 0.3 }
    },
    exit: (active) => ({
        x: active ? 800 : 445,
        opacity: 0,
        scale: 0.6,
        transition: { duration: 0.3 }
    })
};

function MainFundList() {
    const [fundList, setFundList] = useState([]);
    const [active, setActive] = useState({
        isActive: false,
        idx: [0, 1, 2, 3, 4, 5, 6]
    });

    const selectFundList = async () => {
        const list = await selectSoonFund();
        const shuffleList = shuffle(list['data']);
        let addList = [];
        if (shuffleList.length < 10 && shuffleList.length != 0){
            for(let i = 0; i < Math.ceil(10/shuffleList.length); i++ ){
                addList.push(...shuffleList);
            }
            setFundList(addList);
        } else {
            setFundList(shuffleList);
        }
    }

    useEffect(() => {
        selectFundList();
    }, [])

    const nextActive = () => {
        let list = [...active.idx]
        list[0] = list[0] === fundList.length - 1 ? 0 : list[0] + 1;
        list[1] = list[1] === fundList.length - 1 ? 0 : list[1] + 1;
        list[2] = list[2] === fundList.length - 1 ? 0 : list[2] + 1;
        list[3] = list[3] === fundList.length - 1 ? 0 : list[3] + 1;
        list[4] = list[4] === fundList.length - 1 ? 0 : list[4] + 1;
        list[5] = list[5] === fundList.length - 1 ? 0 : list[5] + 1;
        list[6] = list[6] === fundList.length - 1 ? 0 : list[6] + 1;
        setActive({
            isActive: false,
            idx: list
        });
    }

    const prevActive = () => {
        let list = [...active.idx]
        list[0] = list[0] === 0 ? fundList.length - 1 : list[0] - 1;
        list[1] = list[1] === 0 ? fundList.length - 1 : list[1] - 1;
        list[2] = list[2] === 0 ? fundList.length - 1 : list[2] - 1;
        list[3] = list[3] === 0 ? fundList.length - 1 : list[3] - 1;
        list[4] = list[4] === 0 ? fundList.length - 1 : list[4] - 1;
        list[5] = list[5] === 0 ? fundList.length - 1 : list[5] - 1;
        list[6] = list[6] === 0 ? fundList.length - 1 : list[6] - 1;
        setActive({
            isActive: true,
            idx: list
        });
    }

    return (
        <div className='mainFundList__container'>
            <div className='mainFundList__header'>
                <h1>곧 마감하는 펀딩이에요!</h1>
                <NavLink to={'/funding'}>펀딩 더보기</NavLink>
            </div>
            
            {fundList.length != 0 ? <div className='mainFundList__box'>
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item1'
                        custom={active.isActive}
                        variants={fundVariants1}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[0]}
                    >
                        <FundItem
                            item={fundList[active.idx[0]]} />
                    </motion.div>
                </AnimatePresence>
                }
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item1'
                        custom={active.isActive}
                        variants={fundVariants2}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[1]}
                    >
                        <FundItem
                            item={fundList[active.idx[1]]} />
                    </motion.div>
                </AnimatePresence>
                }
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item1'
                        custom={active.isActive}
                        variants={fundVariants3}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[2]}
                    >
                        <FundItem
                            item={fundList[active.idx[2]]} />
                    </motion.div>
                </AnimatePresence>
                }
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item2'
                        custom={active.isActive}
                        variants={fundVariants4}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[3]}
                    >
                        <FundItem
                            item={fundList[active.idx[3]]} />
                    </motion.div>
                </AnimatePresence>
                }
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item3'
                        custom={active.isActive}
                        variants={fundVariants5}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[4]}
                    >
                        <FundItem
                            item={fundList[active.idx[4]]} />
                    </motion.div>
                </AnimatePresence>
                }
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item1'
                        custom={active.isActive}
                        variants={fundVariants6}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[5]}
                    >
                        <FundItem
                            item={fundList[active.idx[5]]} />
                    </motion.div>
                </AnimatePresence>
                }
                {fundList.length != 0 && <AnimatePresence custom={active.isActive}>
                    <motion.div
                        className='mainFundList__item1'
                        custom={active.isActive}
                        variants={fundVariants7}
                        initial='entry'
                        animate='center'
                        exit='exit'
                        key={active.idx[6]}
                    >
                        <FundItem
                            item={fundList[active.idx[6]]} />
                    </motion.div>
                </AnimatePresence>
                }
                <div className='mainFundList__arrow'>
                    <div className='arrow__next' onClick={() => prevActive()}> <ChevronCompactLeft size={50} /> </div>
                    <div className='arrow__prev' onClick={() => nextActive()}> <ChevronCompactRight size={50} /> </div>
                </div>
            </div> : <div className='mainFundList__info'><h2>현재 등록된 펀딩이 없습니다.😢</h2></div>}

        </div>
    );
}
export default MainFundList;