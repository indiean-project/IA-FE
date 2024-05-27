import { PlusSquareFill, Share } from 'react-bootstrap-icons';
import FundMainImage from '../FundMainImage/FundMainImage';
import './FundItemDetail.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectFundDetail } from '../../apis/fund/fund';
import DOMPurify from 'dompurify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import moment from 'moment';
import FundPayment from '../FundPayment/FundPayment';
import { isModalActive } from '../../recoil/IsModalActive';
import toast from 'react-hot-toast';
import { handleCopyClipBoard } from '../../apis/common/copyClipBoard';

function FundItemDetail({ nav, navRef, navHandle }) {

    const params = useParams().id;
    const loginUser = useRecoilValue(loginUserState);
    const [modal, setModal] = useRecoilState(isModalActive);
    const navigate = useNavigate();
    const [fund, setFund] = useState({});
    const [day, setDay] = useState();

    const [rate, setRate] = useState(0);
    const [price, setPrice] = useState(0);
    const [people, setPeople] = useState(0);
    const priceRef = useRef(0);
    const rateRef = useRef(0);
    const peopleRef = useRef(0);
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getFundDetail();
    }, []);

    useEffect(() => {
        const eDay = new Date(fund.endDate);
        const today = new Date();
        let dDay = eDay.getTime() - today.getTime();
        dDay = Math.ceil(dDay / (1000 * 60 * 60 * 24));
        setDay(dDay);
    }, [fund])

    const getFundDetail = async () => {
        const detail = await selectFundDetail(params);
        setFund(detail['data']);
        counting(detail['data'].revenue, detail['data'].target, detail['data'].people);
    }

    useEffect(() => {

        if (fund.rewardList != undefined) {
            let list = [...fund.rewardList];
            for (let i = 0; i < list.length; i++) {
                list[i] = {
                    ...list[i],
                    amount: 0
                }
            }
            setOrderList(list);
        }
    }, [fund])

    const counting = (count, goal, peopleCount) => {
        if(peopleCount === 0){
            setPrice(0);
            setRate(0);
            setPeople(0);
            return;
        }
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

    const onClickReward = (reward, num) => {
        let list = [...orderList];
        const idx = list.findIndex(e=> e.rewardNo === reward.rewardNo);
        if (num === null) {
            list[idx] = {
                ...list[idx],
                amount: parseInt(list[idx].amount) + 1
            }
        } else if(num === '') {
            list[idx] = {
                ...list[idx],
                amount: 0
            }
        } else {
            list[idx] = {
                ...list[idx],
                amount: num
            }
        }
        setOrderList(list);
        let total = 0;
        list.map((item)=>{
            total += item.amount * item.rewardPrice;
        })
        setTotalPrice(total);
    }
    useEffect(() => {
        
    }, [orderList])

    //XSS 공격 방지를 위해 DOMpurify 라이브러리 사용
    //HTML 문자열에서 스크립트 실행과 같은 유해한 부분을 삭제 후 반환
    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    const onClickPayment = ()=>{
        if(loginUser.userId === ''){
            toast.error("펀딩은 로그인 후 이용 가능합니다.");
            return;
        }
        if(totalPrice === 0){
            toast.error("리워드를 1개 이상 선택해주세요.");
            return;
        }
        setModal(true)
    }

    let rateColor = {
        background: `linear-gradient(90deg, #E3651D ${rate}%, #FFFFFF ${rate}%)`
    };

    return (
        <div className='fundItemDetail__container'>
            {modal && <FundPayment reward={orderList} totalPrice={totalPrice} fundNo={params}/>}
            <div className='fundItemDetail__title' id={nav[0].id} ref={(e) => (navRef.current[0] = e)}>
                <h1>{fund.fundTitle}</h1>
                <div className='fundItemDetail__title__item1'>
                    <FundMainImage imgItem={fund.imgUrlList} />
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
                            <h2>{day <= -1 ? '마감' : 'D-' + day}</h2>
                        </div>
                        <div>{moment(fund.startDate).format('YYYY/MM/DD')} ~ {moment(fund.endDate).format('YYYY/MM/DD')}</div>
                    </div>

                    <div className='fundItemDetail__title__btn'>
                        <div onClick={handleCopyClipBoard}>
                            <Share size={20} />
                            <span>공유하기</span>
                        </div>
                        <div onClick={()=>navigate('/artist/detail/' + fund.artistNo)}>
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
                        <div className='item__content' >
                                {fund.budgetManage}
                        </div>
                        <hr />
                    </div>
                    <div className='fundItemDetail__content__item' id={nav[3].id} ref={(e) => (navRef.current[3] = e)}>
                        <h3>일정</h3>
                        <div className='item__content' >
                                {fund.schedule}
                        </div>
                    </div>
                </div>
                <div className='fundItemDetail__reward'>
                    <div className='fundItemDetail__reward__item'>
                        {fund.rewardList != null && fund.rewardList.map((item, idx) => {
                            return (
                                <div className='reward__option__item' key={item.rewardNo}  >
                                    <PlusSquareFill size={35} onClick={() => onClickReward(item, null)} />
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
                        {orderList.filter(item => item.amount != 0).map((item, idx) => {
                            return (
                                <div className='reward__option__item' key={item.rewardNo}>
                                    <div className='reward__option__item__amount'>
                                        <input type="number" value={item.amount} onChange={(e) => onClickReward(item, e.target.value)} />
                                    </div>
                                    <div className='slash'>/</div>
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
                        })}
                        <div className='reward__select__box'>
                            <h5>펀딩 성공 시 마감 익일 자동 결제됩니다.</h5>
                            <div className='reward__select__price'>
                                <h4>합계</h4><h3>{totalPrice
                                    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3><h4>원</h4>
                            </div>
                            <div className='reward__select__btn' onClick={()=>onClickPayment()}>
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