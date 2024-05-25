import { useEffect, useState } from "react";
import { adminUser } from "../../apis/admin";
import './AdminFundingApproval.scss';
import FundInputBar from "../FundInputBar";
import SelectBar from "../SelectBar/SelectBar";

function AdminFundingApproval() {
    const [fundingRequest, setFundingRequest] = useState([])
    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'createDate',
        keyword: ''
    })

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
            responseDate: '', //컬럼 추가 필요
            fundStatus: '승인요청'
        },
        {
            fundNo: 2,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가 필요
            fundStatus: '승인요청'
        },
        {
            fundNo: 3,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가 필요
            fundStatus: '승인요청'
        },
        {
            fundNo: 4,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가 필요
            fundStatus: '승인요청'
        },
        {
            fundNo: 5,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가 필요
            fundStatus: '승인요청'
        },
        {
            fundNo: 6,
            artistName: "박혜성밴드",
            fundTitle: "박혜성 점심 사주기 프로젝트",
            createDate: '2024-05-23',
            startDate: '2024-05-30',
            endDate: '2024-06-25',
            responseDate: '', //컬럼 추가 필요
            fundStatus: '승인요청'
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

    return (
        <div className="adminFundingApproval__container">
            <div className="adminFundingApproval__header">
                <div className="adminFundingApproval__search">
                    <FundInputBar
                        width={'300px'}
                        paddingLeft={'5px'}
                        value={standard.keyword}
                        onChangeValue={onChangeKeyword}
                    />
                    <SelectBar
                        list={searchCategory} onChangeValue={onChangeSearchStandard}
                    />
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default AdminFundingApproval;