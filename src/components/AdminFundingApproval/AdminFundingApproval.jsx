import  {useState} from "react";

function AdminFundingApproval(){
    const [fundingRequest, setFundingRequest] = useState([])

    const test = [
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
        {
            fundNo : 2,
            fundTitle : "띠요잉",
            fundContent : "dddd",
            nickname : '옥암동 불꽃낙지'
        },
    ]

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
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    );


}

export default AdminFundingApproval;