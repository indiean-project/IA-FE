import { useEffect, useState } from 'react';
import { adminFund, adminFundSearch, searchByfundType, searchByprocessingStatus, adminFundSearchByTitle} from "../../apis/admin";
import './AdminFundingApproval.scss';

function AdminFundingApproval() {
    const [fundingRequest, setFundingRequest] = useState([])
    const [searchItem, setSearchItem] = useState({
        keyword: '',     
    });
   

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const result = await adminFund();
        console.log(result);
        if (result.status === "SUCCESS")
            setFundingRequest(result.data);
    }

    const onClickSearch = async()=>{
        const result = await adminFundSearchByTitle(searchItem.keyword);
        setFundingRequest(result.data);
        console.result(result);
    }
    const onChangeSearch = (e)=>{
        setSearchItem({
            ...searchItem,
            [e.target.name]: e.target.value
        })
    }

    const onChangeFundType = async(e)=>{
        const result = await searchByfundType(e.target.value);
        setFundingRequest(result.data);
        console.log(result);
    }

    const onChangeProcessingStatus = async(e)=>{
        const result = await searchByprocessingStatus(e.target.value);
        setFundingRequest(result.data);
        console.log(result);
    }

    return (
        <div>
            <div className="adminfunding__container">
                
                <h1 className="adminfunding__request">펀딩 요청</h1>
                <div className="adminfunding__optionsearch"> 
                {/* <form action="api/admin/fundSearch" method="post"> */}
                <select name='fundType' onChange={(e)=>onChangeFundType(e)}>
                    <option value={''}>펀딩종류</option>
                    <option value={'CONCERT'}>공연</option>
                    <option value={'ALBUM'}>앨범</option>
                    <option value={'GOODS'}>굿즈</option>
                    <option value={'FANMEETING'}>팬미팅</option>
                </select>

                <select name='status' onChange={(e)=>onChangeProcessingStatus(e)}>
                    <option value={''}>처리상태</option>
                    <option value={'N'}>미승인</option>
                    <option value={'Y'}>승인</option>
                </select>

                <input type="text" name="keyword" value={searchItem.keyword} onChange={(e)=>onChangeSearch(e)} placeholder='펀딩 제목을 입력하세요'/>
                <button onClick={()=>onClickSearch()}>검색</button>
                {/* </form> */}
                </div>
                <table className="adminfunding__table" border={1}>
                    <thead className="adminfunding__tablehead">
                        <tr>
                            <th>No.</th>
                            <th>펀딩타입</th>
                            <th>펀딩제목</th>
                            <th>유저넘버</th>
                            <th>처리상태</th>
                        </tr>
                    </thead>
                    <tbody className="adminfunding__tablebody">
                        {/* <tr>
                       {test.map((data,index)=>(
                         <span key={index}>
                            {data}
                         </span>
                       ))}
                    </tr> */}
                        {fundingRequest.map((data, index) => (
                            <tr key={index}>
                                <td>{data.fundNo}</td>
                                <td>{data.fundTypeNo}</td>
                                <td>{data.fundTitle}</td>
                                <td>{data.userNo}</td>
                                <td>{data.fundStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default AdminFundingApproval;