import './AdminUserAuthorityArtisttable.scss';
import FundInputBar from "../FundInputBar";
import SelectBar from "../SelectBar/SelectBar";
import { useState, useEffect } from 'react';
import { updateArtostStatus,adminArtistList,adminsearchArtistList } from '../../apis/admin';

function AdminUserAuthorityArtisttable() {
    const [adminArtistRequest, setAdminArtistRequest] = useState([])
    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'createDate',
        keyword: ''
    })
    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        const result = await adminArtistList();
        console.log(result)
        console.log(typeof result);
        if (result.status === "SUCCESS")
            setAdminArtistRequest(result.data);
    }
    
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
    const searchCategory = [
        { label: '전체', value: 'all' },
        { label: '아티스트 명', value: 'artistName' },
        { label: '아이디', value: 'userId' },
    ]
    const sortCategory = [
        { label: '등록순', value: 'artistNo' },
        { label: '처리상태', value: 'fundStatus' },
    ]
    const onClickManageBtn = async (artistNo, artistStatus) => {
        //backEnd 작업 후 활성화 시켜주세요.

        const result = await updateArtostStatus({
            artistNo: artistNo,
            artistStatus: artistStatus
        })
        if (result.status === 'SUCCESS'){
            toast.success('처리가 완료되었습니다.');
        } else {
            toast.error('처리 실패');
        }
    }
    // const test = [
    //     {
    //         artistNo: 1,
    //         artistName: "박혜성밴드1",
    //         debut_date: "2024-05-23",
    //         userId: '아이디1',
    //         musicCategory: '나락도락',
    //         artistStatus: 'N',
    //     },
    //     {
    //         artistNo: 2,
    //         artistName: "박혜성밴드2",
    //         debut_date: "2024-05-23",
    //         userId: '아이디2',
    //         musicCategory: '나락도락',
    //         artistStatus: 'Y',
    //     },
    //     {
    //         artistNo: 3,
    //         artistName: "박혜성밴드3",
    //         debut_date: "2024-05-23",
    //         userId: '아이디3',
    //         musicCategory: '나락도락',
    //         artistStatus: 'N',
    //     },
    // ]
    const onClickSearch = async() => {
        //backEnd 작업 후 활성화 시켜주세요.

        const list = await adminsearchArtistList(standard);
        if (list.status === 'SUCCESS'){
            setAdminArtistRequest(list.data);
            toast.success('총' + list.data.length + '건의 검색 결과');
        } else {
            toast.error('검색 실패');
        }
    }
    return (
        <>
            <h1>아티스트 관리</h1>
            <div className="adminUserAuthority__header">
                <div className="adminUserAuthority__search">
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
                <div className="adminUserAuthority__sort">
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
                        <th>아이디</th>
                        <th>아티스트명</th>
                        <th>데뷔 날짜</th>
                        <th>음악 장르</th>
                        <th>처리 상태</th>
                        <th>승인 관리</th>
                    </tr>
                </thead>
                <tbody>
                    {adminArtistRequest.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <th>{item.artistNo}</th>
                                <th>{item.userId}</th>
                                <th>{item.artistName}</th>
                                <th>{item.debut_date}</th>
                                <th>{item.musicCategory}</th>
                                <th>{item.artistStatus}</th>
                                <th>{item.artistStatus === 'N' ? <div><button onClick={() => onClickManageBtn(item.artistNo, 'Y')}>승인</button></div> :
                                    <div><button onClick={() => onClickManageBtn(item.artistNo, 'N')}>취소</button></div>}</th>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
} export default AdminUserAuthorityArtisttable;