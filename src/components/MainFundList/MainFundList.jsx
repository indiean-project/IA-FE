import { useEffect, useState } from 'react';
import './MainFundList.scss';
import { selectSoonFund } from '../../apis/fund/fund';
import { shuffle } from 'lodash';
import { motion, AnimatePresence } from "framer-motion";
import FundItem from '../FundItem';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';

function MainFundList() {
    const [fundList, setFundList] = useState([]);
    const [startNum, setStartNum] = useState(0);
    const [endNum, setEndNum] = useState(3);
    const [active, setActive] = useState(true);

    const selectFundList = async () => {
        const list = await selectSoonFund();
        setFundList(shuffle(list['data']));
    }

    useEffect(() => {
        selectFundList();
    }, [])

    const onClickArrow = (i) => {
        setActive(false);
        if (startNum === 0 && i === -1) {
            return;
        } else if (endNum === 10 && i === 1) {
            return;
        }
        setStartNum(startNum + i);
        setEndNum(endNum + i);
        setActive(true);
    }

    return (
        <div className='mainFundList__container'>
            <div onClick={() => onClickArrow(-1)}> <ChevronCompactLeft size={50} /> </div>
            <div className='mainFundList__item'>
                {fundList.filter(item => fundList.indexOf(item) >= startNum && fundList.indexOf(item) < endNum)
                    .map((item, idx) => {
                        return (
                            <AnimatePresence>
                                { active &&
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    >
                                    <FundItem key={item.fundNo}
                                        item={item} />
                                </motion.div>}
                            </AnimatePresence>
                        );
                    })
                }
            </div>
            <div onClick={() => onClickArrow(1)}> <ChevronCompactRight size={50} /> </div>
        </div>
    );
}
export default MainFundList;