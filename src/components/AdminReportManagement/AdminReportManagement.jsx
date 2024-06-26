import FundInputBar from "../FundInputBar";
import './AdminReportManagement.scss';
import SelectBar from "../SelectBar/SelectBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminReportList, searchReportList, selectBoardNo, updateReportStatus } from "../../apis/admin";


function AdminReportManagement() {
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();
    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'reportNo',
        keyword: ''
    })


    // 아래 주석 처리한 함수들은 backEnd 작업 후 활성화 하시면 됩니다.
    // 단, test에 기재해놓은 데이터 형식에 맞춰 dto 반환해주셔야 합니다.

    // useEffect(()=>{
    //     list();
    // }, []);

    // const list = async () => {
    //     const result = await adminReportList();
    //     result.status === "SUCCESS" ? setReportList(result.data) : "";
    // }


    const test = [
        {
            reportNo: 1,
            nickname: '옥암동불꽃낙지0',              // dto에서 변환 필요!
            brType: 'B',
            contentNo: 1,
            reportTypeNo: 1,
            reportDate: '2024-05-22',
            solveNo: 'N'
        },
        {
            reportNo: 2,
            nickname: '옥암동불꽃낙지1',
            brType: 'B',
            contentNo: 5,
            reportTypeNo: 2,
            reportDate: '2024-05-24',
            solveNo: 'N'
        },
        {
            reportNo: 3,
            nickname: '옥암동불꽃낙지2',
            brType: 'B',
            contentNo: 3,
            reportTypeNo: 3,
            reportDate: '2024-05-19',
            solveNo: 'N'
        },
        {
            reportNo: 4,
            nickname: '옥암동불꽃낙지3',
            brType: 'R',
            contentNo: 1,
            reportTypeNo: 4,
            reportDate: '2024-05-26',
            solveNo: 'N'
        },
        {
            reportNo: 5,
            nickname: '옥암동불꽃낙지4',
            brType: 'R',
            contentNo: 3,
            reportTypeNo: 5,
            reportDate: '2024-05-25',
            solveNo: 'N'
        }
    ]

    const searchCategory = [
        { label: '전체', value: 'all' },
        { label: '신고번호', value: 'reportNo' },
        { label: '유형', value: 'brType' },
    ]
    const sortCategory = [
        { label: '신고일', value: 'reportDate' },
        { label: '유형', value: 'brType' },
        { label: '신고타입', value: 'reportTypeNo' },
        { label: '처리상태', value: 'solveNo' },
    ]

    const onChangeKeyword = (e) => {
        setStandard({
            ...standard,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSearchStandard = (item) => {
        setStandard({
            ...standard,
            searchValue: item
        })
    }

    const onChangeSortStandard = (item) => {
        setStandard({
            ...standard,
            sortValue: item
        })
    }

    const moveContent = async (contentNo, brType) => {
        //backEnd 작업 후 활성화 시켜주세요.
        
        // if (brType === "B") {
        //     navigate("/board/detail/" + contentNo)
        // } else {     // 댓글일 경우 join하여 게시글 번호 뽑아와야 함.
        //     const result = await selectBoardNo(contentNo);
        //     result.status === "SUCCESS" ? navigate("/board/detail/" + result.data) : toast.error("처리 실패");
        // }
    }

    const updateState = async (reportNo) => {
        //backEnd 작업 후 활성화 시켜주세요.

        // const result = await updateReportStatus(reportNo);
        // if (result.status === "SUCCESS") {
        //     toast.success("처리 완료");
        // } else {
        //     toast.error("처리 실패");
        // }
    }

    const onClickSearch = async() => {
        //backEnd 작업 후 활성화 시켜주세요.

        // const list = await searchReportList(standard);
        // if (list.status === 'SUCCESS'){
        //     setReportList(list.data);
        // } else {
        //     toast.error('검색 실패');
        // }
    }

    return (
        <div className="adminReportManagement__container">
            <div className="adminReportManagement__header">
                <div className="adminReportManagement__search">
                    <FundInputBar
                        width={'300px'}
                        paddingLeft={'5px'}
                        value={standard.keyword}
                        onChangeValue={onChangeKeyword}
                        name={'keyword'}
                    />
                    <SelectBar
                        list={searchCategory} onChangeValue={onChangeSearchStandard}
                    />
                    <button onClick={()=>{onClickSearch()}}>검색</button>
                </div>
                <div className="adminReportManagement__sort">
                    <p>정렬</p>
                    <SelectBar
                        list={sortCategory} onChangeValue={onChangeSortStandard}
                    />
                </div>
            </div>
            <table className="admin__table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>신고자</th>
                        <th>유형</th>
                        <th>게시글/댓글 번호</th>
                        <th>신고타입</th>
                        <th>신고일</th>
                        <th>처리 상태</th>
                        <th>제재 관리</th>
                    </tr>
                </thead>
                <tbody>
                    {test.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.reportNo}</td>
                                <td>{item.nickname}</td>
                                <td>{item.brType === "B" ? "게시글" : "댓글"}</td>
                                <td className="adminReportManagement__contentType" onClick={()=>{moveContent(item.contentNo, item.brType)}}>{item.contentNo}</td>
                                <td>
                                    {item.reportTypeNo === 1 ? "허위사실유포" :
                                    item.reportTypeNo === 2 ? "명예훼손" :
                                    item.reportTypeNo === 3 ? "욕설" :
                                    item.reportTypeNo === 4 ? "광고" : "기타"}
                                </td>
                                <td>{item.reportDate}</td>
                                <td>{item.solveNo}</td>
                                <td><button onClick={()=>{updateState(item.reportNo)}} disabled={item.solveNo === "Y"}>{item.solveNo === "N" ? "처리" : "완료"}</button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    );
}

export default AdminReportManagement;