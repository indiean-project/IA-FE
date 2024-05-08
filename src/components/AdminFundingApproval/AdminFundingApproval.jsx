import  {useEffect, useState} from "react";
import { adminUser } from "../../apis/admin";

function AdminFundingApproval(){
    const [fundingRequest, setFundingRequest] = useState([])

    useEffect(()=> {
        getList();
    }, []);

    const getList = async () => {
        const result = await adminUser();
        console.log(result);
        if (result.status === "SUCCESS")
            setFundingRequest(result.data);
    }
   
    // const test = [
    //     {
    //         fundNo : 2,
    //         fundTitle : "띠요잉",
    //         fundContent : "dddd",
    //         nickname : '옥암동 불꽃낙지'
    //     },
    //     {
    //         fundNo : 3,
    //         fundTitle : "띠요잉",
    //         fundContent : "dddd",
    //         nickname : '옥암동 불꽃낙지'
    //     },
    //     {
    //         fundNo : 4,
    //         fundTitle : "띠요잉",
    //         fundContent : "dddd",
    //         nickname : '옥암동 불꽃낙지'
    //     },
    //     {
    //         fundNo : 5,
    //         fundTitle : "띠요잉",
    //         fundContent : "dddd",
    //         nickname : '옥암동 불꽃낙지'
    //     },
    //     {
    //         fundNo : 6,
    //         fundTitle : "띠요잉",
    //         fundContent : "dddd",
    //         nickname : '옥암동 불꽃낙지'
    //     },    
    // ]



    return(
        <div>
            <br/><br/><br/><br/>
            <h1>펀딩 요청</h1>
            <select>
                <option>작성자</option>
                <option>펀딩명</option>
                <option>내용</option>
            </select>
            <input type="text" name="keyowrd" value=""/>
            <button type="submit">검색</button>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>                      
                        <th>펀딩명</th>
                        <th>내용</th>
                        <th>작성자</th>
                    </tr>                    
                </thead>
                <tbody>                    
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
                            <td>{data.fundTitle}</td>
                            <td>{data.fundContent}</td>
                            <td>{data.nickname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default AdminFundingApproval;