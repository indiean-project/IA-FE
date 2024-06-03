import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getUserRewardLog } from '../../apis/user';
import { loginUserState } from '../../recoil/LoginUser';
import MyPageRewardLog from '../MyPageRewardLog';
import './MyPageFund.scss';

function MyPageFund({ fundList }) {

    const loginUser = useRecoilValue(loginUserState);
    const [selectFund, setSelectFund] = useState(null);
    const [rewardList, setRewardList] = useState([]);
    // const [FundCategory, setFundCategory] = useRecoilState();

    useEffect(() => {
        const fetchUserRewardLog = async () => {
            if (selectFund) {  // selectFundNo가 null이 아닐 때만 호출
                try {
                    const rwlog = await getUserRewardLog(loginUser.userNo, selectFund.fundNo);
                    setRewardList(rwlog.data);
                } catch (error) {
                    console.error("Failed to fetch user boards", error);
                }
            }
        };

        fetchUserRewardLog();
    }, [loginUser.userNo, selectFund]);

    useEffect(() => {

    }, [selectFund]); // selectFundNo 값이 변하면 새로 렌더링

    if (!fundList) {
        return <></>
    }
    function clickItem(fundNo) {
        setSelectFund(fundNo === (selectFund ? selectFund.fundNo : null) ? null : fundNo);
        // selectFund가 true면 fundNo를 가져오고, 이를 클릭 아이템의 fundNo와 비교해서 참 거짓 비교

    }

    return (
        <>
            <div className='userFund__container'>
                <table className='userFund__table'>
                    <thead>
                        <tr>
                            <th className='userFund__thead__title'>제목</th>
                            <th className='userFund__thead__totalPrice'>투자금액</th>
                            <th className='userFund__thead__paymentDate'>결제 예정일</th>
                            <th className='userFund__thead__orderDate'>투자일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundList.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => clickItem(item)}>
                                    <td className='userFund__tbody__title'>{item.fundTitle}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.paymentDate}</td>
                                    <td>{item.orderDate}</td>
                                </tr>
                                {selectFund && selectFund.fundNo === item.fundNo && (
                                    <tr><td colSpan={4}>
                                        <MyPageRewardLog
                                            userNo={loginUser.userNo}
                                            fundNo={item.fundNo}
                                            selectFund = {selectFund}
                                            rewardList={rewardList} />
                                    </td></tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default MyPageFund;