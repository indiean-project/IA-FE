import { Arrow90degRight, HandThumbsUp, Linkedin, PlusSquareFill, Share } from 'react-bootstrap-icons';
import FundMainImage from '../FundMainImage/FundMainImage';
import './FundItemDetail.scss';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { selectFundDetail } from '../../apis/fund/fund';
import DOMPurify from 'dompurify';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import moment from 'moment';

function FundItemDetail({ nav, navRef }) {

    const params = useParams().id;
    const loginUser = useRecoilValue(loginUserState);
    const [fund, setFund] = useState({});
    const [day, setDay] = useState();

    const [rate, setRate] = useState(0);
    const [price, setPrice] = useState(0);
    const [people, setPeople] = useState(0);
    const priceRef = useRef(0);
    const rateRef = useRef(0);
    const peopleRef = useRef(0);

    const [orderList, setOrderList] = useState([]);
    const orderAmount = useRef([]);

    useEffect(() => {
        getFundDetail();
    }, []);

    useEffect(()=>{
        const eDay = new Date(fund.endDate);
        const today = new Date();
        let dDay = eDay.getTime() - today.getTime();
        dDay = Math.ceil(dDay / (1000 * 60 * 60 * 24));
        setDay(dDay);
        setOrderList(fund.rewardList);
        // for (let i = 0; fun)
    },[fund])

    const getFundDetail = async () => {
        const detail = await selectFundDetail(params);
        setFund(detail['data']);
        counting(detail['data'].revenue, detail['data'].target, detail['data'].people);
    }

    const counting = (count, goal, peopleCount) => {
        const timer = setInterval(() => {
            priceRef.current += Math.floor(count / peopleCount);
            peopleRef.current += 1;
            rateRef.current = (100 * (priceRef.current / goal)).toFixed(1);
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

    const onClickReward = (reward, idx)=>{
        console.log(fund.rewardList);
        let list = orderList;
        list[idx] = {
            ...list[idx],
            amount: orderAmount.current[idx]
        }
        setOrderList(list);
        console.log(orderList);
    }

    //XSS 공격 방지를 위해 DOMpurify 라이브러리 사용
    //HTML 문자열에서 스크립트 실행과 같은 유해한 부분을 삭제 후 반환
    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    let rateColor = {
        background: `linear-gradient(90deg, #E3651D ${rate}%, #FFFFFF ${rate}%)`
    };

    return (
        <div className='fundItemDetail__container'>
            <div className='fundItemDetail__title' id={nav[0].id} ref={(e) => (navRef.current[0] = e)}>
                <h1>{fund.fundTitle}</h1>
                <div className='fundItemDetail__title__item1'>
                    <FundMainImage />
                    <div className='fundItemDetail__title__content'>
                        <h4>목표금액</h4>
                        <div className='fundItemDetail__title__price'>
                            <h2 id='not__shadow'>{fund.target != undefined && fund.target
                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2><div>원</div>
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
                            <h4>펀딩마감</h4>
                            <h2>{day<=-1? '마감': 'D-'+day}</h2>
                        </div>
                        <div>{moment(fund.startDate).format('YYYY/MM/DD')} ~ {moment(fund.endDate).format('YYYY/MM/DD')}</div>
                    </div>

                    <div className='fundItemDetail__title__btn'>
                        <div>
                            <Share size={20} />
                            <span>공유하기</span>
                        </div>
                        <div>
                            <div>아티스트 페이지 방문</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fundItemDetail__content'>
                <div className='fundItemDetail__content__items'>
                    <div className='fundItemDetail__content__item' >
                        <h3>프로젝트 소개</h3>
                        <div className='item__content' dangerouslySetInnerHTML={createMarkUp(fund.fundInfo)}>

                        </div>
                        <hr />
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[1].id} ref={(e) => (navRef.current[1] = e)}>
                        <h3>아티스트 소개</h3>
                        <div className='item__content' dangerouslySetInnerHTML={createMarkUp(fund.artistInfo)}>

                        </div>
                        <hr />
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[2].id} ref={(e) => (navRef.current[2] = e)}>
                        <h3>예산</h3>
                        <div className='item__content' dangerouslySetInnerHTML={createMarkUp(fund.budgetManage)}>

                        </div>
                        <hr />
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[3].id} ref={(e) => (navRef.current[3] = e)}>
                        <h3>일정</h3>
                        <div className='item__content' dangerouslySetInnerHTML={createMarkUp(fund.schedule)}>

                        </div>
                    </div>
                </div>
                <div className='fundItemDetail__reward'>
                    <div className='fundItemDetail__reward__item'>
                        {fund.rewardList != null && fund.rewardList.map((item, idx) => {
                            return (
                                <div className='reward__option__item' key={item.rewardNo}  >
                                    <PlusSquareFill size={35} onClick={()=>onClickReward(item, idx)} />
                                    <div className='reward__option__item__content'>
                                        <div className='reward__option__item__header'>
                                            <div className='reward__title'>{item.rewardName}</div>
                                            <div className='reward__price'>{item.rewardPrice
                                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                        </div>
                                        <div className='reward__info'>
                                            {item.rewardInfo}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        }
                    </div>
                    <div className='fundItemDetail__reward__item'>
                        <div className='reward__option__item'>
                            <div className='reward__option__item__amount'>
                                <input type="number" />
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