import { useEffect , useState} from "react";
import './AdminUserAuthority.scss';
import { adminUserAuthority, adminUserAuthoritySearchByTitle, searchByAuthorityType
    ,searchByAuthorityProcessingStatus} from "../../apis/admin";


function AdminUserAuthority(){
    const  [userAuthorityRequest, setUserAuthorityRequest] = useState([])
    const [searchItem, setSearchItem] = useState({
        keyword:'',
    });


    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const result = await adminUserAuthority();
        console.log(result.data)
        if(result.status ==="SUCCESS")
            setUserAuthorityRequest(result.data);
    }
    const onClickSearch = async() => {
        const result = await adminUserAuthoritySearchByTitle(searchItem.keywword);
       setUserAuthorityRequest(result.data);
       
    }
    const onChangeSearch = (e)=>{
        setSearchItem({
            ...searchItem,
            [e.target.name]: e.target.value
        })
    }

    const onChangeAuthorityType = async(e)=> {
        const result = await searchByAuthorityType(e.target.value);
        setUserAuthorityRequest(result.data);

    }
    const onChangeProcessingStatus = async(e) => {
        const result = await searchByAuthorityProcessingStatus(e.target.value);
        setUserAuthorityRequest(result.data);
    }


    return(
        <div>
            <div className="adminuserauthority__container">
                
                <h1 className="adminuserauthority__request">유저권한 승급요청</h1>
                <div className="adminuserauthority__optionsearch"> 

                <select name='userRole' onChange={(e)=>onChangeAuthorityType(e)}>
                    <option value={''}>유저권한</option>
                    <option value={'일반'}>일반</option>
                    <option value={'아티스트'}>아티스트</option>
                    <option value={'관리자'}>관리자</option>                    
                </select>

                <select name='status' onChange={(e)=>onChangeProcessingStatus(e)}>
                    <option value={''}>처리상태</option>
                    <option value={'N'}>미승인</option>
                    <option value={'Y'}>승인</option>
                </select>

                <input type="text" name="keyword" value={searchItem.keyword} onChange={(e)=>onChangeSearch(e)} placeholder='제목을 입력하세요'/>
                <button onClick={()=>onClickSearch()}>검색</button>
                
                </div>
                <table className="adminuserauthority__table" border={1}>
                    <thead className="adminuserauthority__tablehead">
                        <tr>
                            <th>No.</th>                            
                            <th>아티스트명</th>
                            <th>처리 상태</th>
                            <th>유저 이름</th>
                       </tr>
                    </thead>
                    <tbody className="adminuserauthority__tablebody">
                          {userAuthorityRequest.map((data, index) => (
                            <tr key={index}>
                                <td>{data.artistNo}</td>
                                <td>{data.artistName}</td>          
                                <td>{data.artistRoleStatus}</td>
                                <td>{data.member.userName}</td>                                 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default AdminUserAuthority;



