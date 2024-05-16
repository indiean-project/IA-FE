import './FundPayment.scss';

import ModalWindow from "../ModalWindow";
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isModalActive } from '../../recoil/IsModalActive';

function FundPayment({ reward, totalPrice }) {
    const [orderList, setOrderList] = useState([]);
    const setModal = useSetRecoilState(isModalActive);
    useEffect(() => {
        setOrderList(reward);
    }, [])
    useEffect(() => {

    }, [orderList]);
    return (
        <ModalWindow>
            <div className="fundPayment__container">
                <div className='fundPayment__header'>
                    <h3>결제 안내</h3>
                </div>
                <hr />
                <div className='fundPayment__content'>
                    <div></div>
                    {orderList.map((item) => {
                        return (
                            <div className='reward__option__item' key={item.rewardNo}>
                                <div className='reward__option__item__amount'>
                                    <input type="number" value={item.amount} readOnly />
                                </div>
                                <div className='slash'>/</div>
                                <div className='reward__option__item__content'>
                                    <div className='reward__option__item__header'>
                                        <div className='reward__title'>{item.rewardName}</div>
                                        <div className='reward__price'>{item.rewardPrice
                                            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}

                </div>
                <div className='reward__select__box'>
                    <h5>펀딩 성공 시 마감 익일 자동 결제됩니다.</h5>
                    <div className='reward__select__price'>
                        <h4>합계</h4><h3>{totalPrice
                            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3><h4>원</h4>
                    </div>
                    <div className='reward__select__btn'>
                        <div>결제 진행</div>
                        <div onClick={()=>setModal(false)}>취소</div>
                    </div>
                </div>
            </div>
        </ModalWindow>
    );
}
export default FundPayment;