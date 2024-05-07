import './FundDetail.scss';
import { useEffect, useRef, useState } from "react";
import FundItemDetail from "../../components/FundItemDetail";
import FundNav from "../../components/FundNav/FundNav";

function FundDetail() {
    const fundNavRef = useRef([]);
    const [changeNav, setChangeNav] = useState(0);
    const navRef = useRef([])
    const [refY, setRefY] = useState([
    ]);
    const onClickChangeNav = (idx) => {
        if (idx != changeNav) {
            fundNavRef.current[changeNav].style = 'background : rgba(12, 12, 12, 1)';
            fundNavRef.current[idx].style = 'background : rgba(63, 63, 63, 1)';
            setChangeNav(idx);
        }
    }

    useEffect(() => {
        fundNavRef.current[changeNav].style = 'background : rgba(63, 63, 63, 1)';
    }, [changeNav])
    useEffect(() => {
        setRefY([
            (window.scrollY + navRef.current[0].getBoundingClientRect().top)-80,
            (window.scrollY + navRef.current[1].getBoundingClientRect().top)-80,
            (window.scrollY + navRef.current[2].getBoundingClientRect().top)-80,
            (window.scrollY + navRef.current[3].getBoundingClientRect().top)-80,])
    },[])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean
        }
    })

    const handleScroll = () => {
        const scroll = window.scrollY;
        if (scroll < refY[1]) {
            onClickChangeNav(0);
        } else if (refY[1] <= scroll && scroll < refY[2]) {
            onClickChangeNav(1);
        } else if (refY[2] <= scroll && scroll < refY[3]) {
            onClickChangeNav(2);
        } else if (scroll > refY[3]) {
            onClickChangeNav(3);
        }
    }

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
                changeNav={changeNav}
                setChangeNav={setChangeNav}
                fundNavRef={fundNavRef}
                onClickChangeNav={onClickChangeNav} />
            <div className='fundDetail__main'>
                <FundItemDetail nav={nav} navRef={navRef} />
            </div>
        </div>
    );
}
export default FundDetail;