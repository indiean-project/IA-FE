

function AdminPage(){

    return(
        <div>
            <h1>indian(admin)버전이라고 따로 주고싶어요</h1>
            <table>
                <tr>
                    <th><button>유저권한 요청건</button></th>
                    <th><button>펀딩승인 요청건</button></th>
                    <th><button>문의 관리</button></th>
                    <th><button>신고 관리</button></th>
                    <th><button>유저 정보</button></th>
                </tr>
            </table>
            <input palceholder="유저네임 or 키워드로 검색하세요..?"></input>
            <input type="radio" id="" name="" value=""></input>
            <label for ="option1">처리되지 않은 요청만 보기</label>
            <table>
                <tr>
                    <th></th>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>
            <div> 페이징 처리</div>
        </div>

    );
}
export default AdminPage;