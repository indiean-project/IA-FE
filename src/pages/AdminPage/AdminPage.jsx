import { NavLink } from "react-router-dom";

function AdminPage(){

    return(
        <div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            
            <table>
                <tr>
                    <th><NavLink to={"/admin/userAuthority"} ><h2>유저 권한 요청</h2></NavLink></th> <br/> <br/><br/><br/>        
                    <th><NavLink to={"/admin/fund"} ><h2>펀딩 승인 요청</h2></NavLink></th><br/><br/><br/><br/>
                    <th><NavLink to={"/admin/questions"}><h2>문의 관리</h2></NavLink></th><br/><br/><br/><br/>
                    <th><NavLink to={"/admin/report"} ><h2>신고 관리</h2></NavLink></th><br/><br/><br/><br/>
                </tr>            
            </table>
            <input placeholder="유저네임?으로 검색해주세요."/>
            <button type="submit">검색</button>
            <br/>
            <input type="radio" ></input>         
            <label>읽지 않은 내용만 보기</label>            
        </div>

    );
}
export default AdminPage;