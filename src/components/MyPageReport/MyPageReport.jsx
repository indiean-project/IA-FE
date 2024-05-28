function MyPageReport( { reportList }) {
    return (
        <>
            <div className='userReport__container'>
                <table className='userReport__table'>
                    <thead>
                        <tr>
                            <th className='userReport__thead__title'>제목</th>
                            <th className='userReport__thead__writer'>작성자</th>
                            <th className='userReport__thead__updatedate'>수정일</th>
                            <th className='userReport__thead__count'>조회</th>
                            <th className='userReport__thead__like'>추천</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => clickItem(item)}>
                                    <td className='userReport__tbody__title'>{item.boardTitle}<span>[{item.replies}]</span></td>
                                    <td>{item.nickname}</td>
                                    <td>{item.updateDate}</td>
                                    <td>{item.viewCount}</td>
                                    <td>{item.likeCount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <PaginationBar pageInfo={boardList.pageInfo} list={boardList.list} />
            <div className='userBoard__input__area'>
                <FundInputBar width={"40%"} onChangeValue={(e)=>{setKeyword(e.target.value)}}/>
                <div className='userBoard__btn'><a onClick={()=>{list()}}>검색</a></div>
            </div> */}
            </div>
        </>
    )
}

export default MyPageReport;