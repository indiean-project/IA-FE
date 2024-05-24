import { useNavigate } from 'react-router-dom';

import './MyPageRewardLog.scss';

function MyPageRewardLog({ userNo, fundNo, selectFund , rewardList }) {

    const navigate = useNavigate();

    function onClickFunding() {
        navigate("/funding/detail/" + fundNo);
    }

    return (
        <>
            <div className="rewardLog__container">
                <table className='rewardLog__table'>
                    <thead>
                        <tr>
                            <th className='rewardLog__thead__name'>리워드명</th>
                            <th className='rewardLog__thead__price'>개별 금액</th>
                            <th className='rewardLog__thead__amount'>수량</th>
                            <th className='rewardLog__thead__totalPrice'>총액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rewardList.map((item, index) => {
                            return (
                            <tr key={index}>
                                <td className='rewardLog__tbody__name'>{item.rewardName}</td>
                                <td>{item.rewardPrice}</td>
                                <td>{item.rewardAmount}</td>
                                <td>{item.rewardTotalPrice}</td>
                            </tr>
                            )}
                        )}
                    </tbody>
                </table>
                <br/>
                <div className="btn-fund__detail" onClick={onClickFunding}>바로가기</div>
                <div className="rewardLog__totalPrice">총액 : {selectFund.totalPrice}</div>
            </div>
        </>
    )
}

export default MyPageRewardLog;