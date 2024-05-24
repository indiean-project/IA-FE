import './FundDetail.scss';
import { useEffect, useRef, useState } from "react";
import FundItemDetail from "../../components/FundItemDetail";
import FundNav from "../../components/FundNav/FundNav";
import { entries } from 'lodash';

function FundDetail() {
    const fundNavRef = useRef([]);
    const changeNav = useRef(0);
    const navRef = useRef([])
    
    const onClickChangeNav = (idx) => {
        if (idx !== changeNav.current) {
            fundNavRef.current[changeNav.current].style = 'background : rgba(12, 12, 12, 1)';
            fundNavRef.current[idx].style = 'background : rgba(63, 63, 63, 1)';
            changeNav.current = idx;
        }
    }

    useEffect(() => {
        const navHandle = entries => {
            entries.map((entry) => {
                if (entry.isIntersecting){
                    // console.log(entry.target);
                    // console.log(navRef.current.indexOf(entry.target))
                    onClickChangeNav(navRef.current.indexOf(entry.target))
                }
            });
        }

        const observer = new IntersectionObserver(navHandle)

        navRef.current.forEach(nav => observer.observe(nav));

        return () => observer.disconnect();
    }, [])

    useEffect(() => {
        fundNavRef.current[changeNav.current].style = 'background : rgba(63, 63, 63, 1)';
    }, [])

    const nav = [
        {
            id: 'fundInfo',
            value: '프로젝트 소개'
        },
        {
            id: 'artistInfo',
            value: '아티스트 소개'
        },
        {
            id: 'budget',
            value: '예산'
        },
        {
            id: 'schedule',
            value: '일정'
        }
    ];
    const onClickNav = (idx) => {
        navRef.current[idx].scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="fundDetail__container">
            <FundNav nav={nav}
                onClickNav={onClickNav}
                fundNavRef={fundNavRef}
                 />
            <div className='fundDetail__main'>
                <FundItemDetail nav={nav} navRef={navRef} />
            </div>
        </div>
    );
}
export default FundDetail;