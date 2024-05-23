import './MyPageFund.scss';

function MyPageFund({ fundList }) {

    return (
        <>
            <div className='userFund__container'>
                <table className='userFund__table'>
                    <thead>
                        <tr>
                            <th className='userFund__thead__title'>제목</th>
                            <th className='userFund__thead__writer'>투자금액</th>
                            <th className='userFund__thead__updatedate'>결제 예정일</th>
                            <th className='userFund__thead__count'>투자일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundList.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => clickItem(item)}>
                                    <td className='userFund__tbody__title'>{item.fundTitle}<span>[{item.replies}]</span></td>
                                    <td>{item.nickname}</td>
                                    <td>{item.updateDate}</td>
                                    <td>{item.viewCount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyPageFund;