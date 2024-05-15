import { Arrow90degRight, HandThumbsUp, Linkedin, PlusSquareFill, Share } from 'react-bootstrap-icons';
import FundMainImage from '../FundMainImage/FundMainImage';
import './FundItemDetail.scss';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectFundDetail } from '../../apis/fund/fund';
function FundItemDetail({ nav, navRef }) {

    const params = useParams().id
    const [fund, setFund] = useState({});

    const [rate, setRate] = useState(0);
    const [price, setPrice] = useState(0);
    const [people, setPeople] = useState(0);
    const priceRef = useRef(0);
    const rateRef = useRef(0);
    const peopleRef = useRef(0);

    useEffect(()=>{
        getFundDetail();
    },[])

    useEffect(()=>{
        console.log(fund.revenue);
        console.log(fund.target);
    },[fund])

    const getFundDetail = async()=>{
        const detail = await selectFundDetail(params);
        setFund(detail['data']);
    }

    const counting = ()=>{
        let count = fund.revenue;
        let goal = fund.target;
        let peopleCount = fund.people;
        const timer = setInterval(() => {
            priceRef.current += Math.floor(count/peopleCount);
            peopleRef.current += 1;
            rateRef.current = (100 * (priceRef.current/goal)).toFixed(1);
            setPrice(priceRef.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            setRate(rateRef.current);
            setPeople(peopleRef.current);
            if (priceRef.current >= count) {
                setPrice(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                setPeople(peopleCount);
                clearInterval(timer);
            }
        }, 10);
    }

    useEffect(() => { //동적으로 숫자 카운팅
        counting();
    }, [])

    let rateColor = {
        background: `linear-gradient(90deg, #E3651D ${rate}%, #FFFFFF ${rate}%)`
    };

    return (
        <div className='fundItemDetail__container'>
            <div className='fundItemDetail__title' id={nav[0].id} ref={(e) => (navRef.current[0] = e)}>
                <h1>쏜애플 2024년 연말 공연 [불장난]</h1>
                <div className='fundItemDetail__title__item1'>
                    <FundMainImage />
                    <div className='fundItemDetail__title__content'>
                        <h4>목표금액</h4>
                        <div className='fundItemDetail__title__price'>
                            <h2 id='not__shadow'>20,000,000</h2><div>원</div>
                        </div>
                        <h4>펀딩금액</h4>
                        <div className='fundItemDetail__title__price'>
                            <h2>{price}</h2><div>원</div>
                            <h4>
                                {rate}%
                            </h4>
                        </div>
                        <div className='fundItem__goalBar' style={rateColor}>
                        </div>
                        <h4>참가자</h4>
                        <div className='fundItemDetail__title__price'>
                            <h2>{people}</h2><div>명</div>
                        </div>
                    </div>
                </div>
                <div className='fundItemDetail__title__item2'>
                    <div className='fundItemDetail__title__schedule'>
                        <div className='fundItemDetail__title__schedule__item'>
                            <h4>펀딩기간</h4>
                            <h2>D-4</h2>
                        </div>
                        <div>2024/04/25 ~ 2024/05/25</div>
                    </div>

                    <div className='fundItemDetail__title__btn'>
                        <div>
                            <HandThumbsUp size={20} />
                            <span>63</span>
                        </div>
                        <div>
                            <Share size={20} />
                            <span>공유하기</span>
                        </div>
                        <div>
                            <div>아티스트 방문</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fundItemDetail__content'>
                <div className='fundItemDetail__content__items'>
                    <div className='fundItemDetail__content__item' >
                        프로젝트 소개
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[1].id} ref={(e) => (navRef.current[1] = e)}>
                        아티스트 소개
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[2].id} ref={(e) => (navRef.current[2] = e)}>
                        예산
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[3].id} ref={(e) => (navRef.current[3] = e)}>
                        일정
                    </div>
                </div>
                <div className='fundItemDetail__reward'>
                    <div className='fundItemDetail__reward__item'>
                        <div className='reward__option__item'>
                            <PlusSquareFill size={35} />
                            <div className='reward__option__item__content'>
                                <div className='reward__option__item__header'>
                                    <div className='reward__title'>리워드 타이틀</div>
                                    <div className='reward__price'>50,500원</div>
                                </div>
                                <div className='reward__info'>
                                    리워드 간단 설명
                                </div>
                            </div>
                        </div>
                        <div className='reward__option__item'>
                            <PlusSquareFill size={35} />
                            <div className='reward__option__item__content'>
                                <div className='reward__option__item__header'>
                                    <div className='reward__title'>리워드 타이틀</div>
                                    <div className='reward__price'>50,500원</div>
                                </div>
                                <div className='reward__info'>
                                    리워드 간단 설명
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fundItemDetail__reward__item'>
                        <div className='reward__option__item'>
                            <div className='reward__option__item__amount'>
                                15
                            </div>
                            <div className='slash'>/</div>
                            <div className='reward__option__item__content'>
                                <div className='reward__option__item__header'>
                                    <div className='reward__title'>리워드 타이틀</div>
                                    <div className='reward__price'>50,500원</div>
                                </div>
                                <div className='reward__info'>
                                    리워드 간단 설명
                                </div>
                            </div>
                        </div>
                        <div className='reward__select__box'>
                            <h5>펀딩 성공 시 마감 익일 자동 결제됩니다.</h5>
                            <div className='reward__select__price'>
                                <h4>합계</h4><h3>201,000</h3><h4>원</h4>
                            </div>
                            <div className='reward__select__btn'>
                                펀딩 신청하기
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default FundItemDetail;