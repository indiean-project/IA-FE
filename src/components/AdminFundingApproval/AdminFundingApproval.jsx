import { useEffect, useState } from 'react';
import { adminFund, adminFundSearch } from "../../apis/admin";
import './AdminFundingApproval.scss';

function AdminFundingApproval() {
    const [fundingRequest, setFundingRequest] = useState([])
    const [searchItem, setSearchItem] = useState({
        keyword: '',
        type: '',
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
        console.log(searchItem);
        const result = await adminFundSearch(searchItem);
        setFundingRequest(result.data);
        console.result(result);
    }
    const onChangeSearch = (e)=>{
        setSearchItem({
            ...searchItem,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <div className="adminfunding__container">
                
                <h1 className="adminfunding__request">펀딩 요청</h1>
                <div className="adminfunding__optionsearch"> 
                {/* <form action="api/admin/fundSearch" method="post"> */}
                <select name='type' onChange={(e)=>onChangeSearch(e)}>
                    <option value={'1'}>제목</option>
                    <option value={'2'}>펀딩종류</option>
                    <option value={'3'}>처리상태</option>
                </select>

                <input type="text" name="keyword" value={searchItem.keyword} onChange={(e)=>onChangeSearch(e)}/>
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