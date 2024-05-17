import './FundPayment.scss';

import ModalWindow from "../ModalWindow";
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isModalActive } from '../../recoil/IsModalActive';
import { getBillingKey, payReserve } from '../../apis/fund/fund';
import { loginUserState } from '../../recoil/LoginUser';
import toast from 'react-hot-toast';

function FundPayment({ reward, totalPrice, fundNo }) {
    const userInfo = useRecoilValue(loginUserState);
    const [orderList, setOrderList] = useState([]);
    const setModal = useSetRecoilState(isModalActive);

    useEffect(() => {
        let list = [];
        reward.filter(item=>item.amount > 0).map((item)=>{
            list.push(item)
        })
        setOrderList(list);
    }, [])

    useEffect(() => {

    }, [orderList]);

    const onClickPayReserve = async()=>{
        setModal(false);
        const pay = await getBillingKey({
            application_id: import.meta.env.VITE_PAY_ID,
            pg: 'nicepay',
            tax_free: 0,
            order_name: '펀딩 신청 결제',
            subscription_id: (new Date()).getTime(),
            user: {
                username: userInfo.userName,
                email: userInfo.userId,
                phone: userInfo.phone
            },
            extra: {
                subscription_comment: '펀딩 성공 시 결제 예정일에 자동 결제됩니다.',
                subscribe_test_payment: true
            }
        })
        console.log(pay);
        if(pay.event === 'done'){
            const reserve = await payReserve({
                userNo: userInfo.userNo,
                fundNo: fundNo,
                totalPrice: totalPrice,
                reward: orderList,
                receiptId: pay.data.receipt_id,
            });
            toast.success("결제가 완료되었습니다. 결제 내역은 마이페이지에서 확인 가능합니다.");
        } else {
            toast.error('결제가 취소되었습니다.');
        }
    }

    return (
        <ModalWindow>
            <div className="fundPayment__container">
                <div className='fundPayment__header'>
                    <h3>결제 안내</h3>
                </div>
                <hr />
                <div className='fundPayment__info'>
                    <p>품목과 수량을 확인 후 결제를 진행해주세요.</p>
                    <p>결제 이후 단순변심 등의 이유로 환불이 어려울 수 있습니다.</p>
                </div>
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
                        <div onClick={() => onClickPayReserve()}>결제 진행</div>
                        <div onClick={() => setModal(false)}>취소</div>
                    </div>
                </div>
            </div>
        </ModalWindow>
    );
}
export default FundPayment;