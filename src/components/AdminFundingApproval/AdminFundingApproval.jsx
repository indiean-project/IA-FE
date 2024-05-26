import { useEffect, useState } from "react";
import { adminUser, searchFundApprovalList, updateFundStatus } from "../../apis/admin";
import './AdminFundingApproval.scss';
import FundInputBar from "../FundInputBar";
import SelectBar from "../SelectBar/SelectBar";
import toast from "react-hot-toast";

function AdminFundingApproval() {
    const [fundingRequest, setFundingRequest] = useState([])
    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'createDate',
        keyword: ''
    })

    // 아래 주석 처리한 함수들은 backEnd 작업 후 활성화 하시면 됩니다.
    // 단, test에 기재해놓은 데이터 형식에 맞춰 dto 반환해주셔야 합니다.

    // useEffect(()=> {
    //     getList();
    // }, []);

    // const getList = async () => {
    //     const result = await adminUser();
    //     console.log(result);
    //     if (result.status === "SUCCESS")
    //         setFundingRequest(result.data);
    // }

    const test = [
        {
            fundNo: 1,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가함 -> BACKEND쪽에서 당일 날짜로 update 필요
            fundStatus: 'AWAIT' //여유가 있다면 해당 문구를 '승인대기' 등과 같은 value 값으로 변환해서 뽑아주세요(BackEnd)
        },
        {
            fundNo: 2,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가함
            fundStatus: 'AWAIT'
        },
        {
            fundNo: 3,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가함
            fundStatus: 'AWAIT'
        },
        {
            fundNo: 4,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가함
            fundStatus: 'AWAIT'
        },
        {
            fundNo: 5,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가함
            fundStatus: 'AWAIT'
        },
        {
            fundNo: 6,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가함
            fundStatus: 'AWAIT'
        },
    ]

    const searchCategory = [
        { label: '전체', value: 'all' },
        { label: '펀드번호', value: 'fundNo' },
        { label: '아티스트', value: 'artistName' },
        { label: '타이틀', value: 'fundTitle' },
    ]
    const sortCategory = [
        { label: '요청일', value: 'createDate' },
        { label: '시작일', value: 'startDate' },
        { label: '처리일', value: 'responseDate' },
        { label: '처리상태', value: 'fundStatus' },
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

    const onClickManageBtn = async (fundNo, fundStatus) => {
        //backEnd 작업 후 활성화 시켜주세요.

        // const result = await updateFundStatus({
        //     fundNo: fundNo,
        //     fundStatus: fundStatus
        // })
        // if (result.status === 'SUCCESS'){
        //     toast.success('처리가 완료되었습니다.');
        // } else {
        //     toast.error('처리 실패');
        // }
    }

    const onClickSearch = async() => {
        //backEnd 작업 후 활성화 시켜주세요.

        // const list = await searchFundApprovalList(standard);
        // if (list.status === 'SUCCESS'){
        //     setFundingRequest(list.data);
        //     toast.success('총' + list.data.length + '건의 검색 결과');
        // } else {
        //     toast.error('검색 실패');
        // }
    }

    return (
        <div className="adminFundingApproval__container">
            <div className="adminFundingApproval__header">
                <div className="adminFundingApproval__search">
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
                    <button>검색</button>
                </div>
                <div className="adminFundingApproval__sort">
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
                        <th>아티스트명</th>
                        <th>펀딩 타이틀</th>
                        <th>펀딩 기간</th>
                        <th>승인 요청일</th>
                        <th>요청 처리일</th>
                        <th>처리 상태</th>
                        <th>승인 관리</th>
                    </tr>
                </thead>
                <tbody>
                    {test.map((item) => {
                        return (
                            <tr key={item.fundNo}>
                                <td>{item.fundNo}</td>
                                <td>{item.artistName}</td>
                                <td>{item.fundTitle}</td>
                                <td>{item.startDate} ~ {item.endDate}</td>
                                <td>{item.createDate}</td>
                                <td>{item.responseDate}</td>
                                <td>{item.fundStatus}</td>
                                <td>{item.fundStatus === 'AWAIT' ? <div><button onClick={() => onClickManageBtn(item.fundNo, 'APPROVAL')}>승인</button><button onClick={() => onClickManageBtn(item.fundNo, 'REJECT')}>반려</button></div> :
                                    item.fundStatus === 'REJECT' ? <div><button onClick={() => onClickManageBtn(item.fundNo, 'APPROVAL')}>승인</button><button onClick={() => onClickManageBtn(item.fundNo, 'REJECT')}>보류</button></div> :
                                        <button onClick={() => onClickManageBtn(item.fundNo, 'REJECT')}>승인취소</button>}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default AdminFundingApproval;