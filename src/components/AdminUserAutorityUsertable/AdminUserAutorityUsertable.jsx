import { useEffect, useState } from 'react';
import './AdminUserAutorityUsertable.scss';
import FundInputBar from "../FundInputBar";
import SelectBar from "../SelectBar/SelectBar";
import { enrollUser, adminUserList, adminUserdelete, searchUserList } from '../../apis/admin';
import toast from 'react-hot-toast';

function AdminUserAutorityUsertable() {
    const [adminUserRequest, setAdminUserRequest] = useState([])
    const [editingContent, setEditingContent] = useState(null);
    const [standard, setStandard] = useState({
        searchValue: 'all',
        sortValue: 'createDate',
        keyword: ''
    })
    // 초기 리스트 불러오는 함수들
    // useEffect(() => {
    //     getList();
    // }, [])
    // const getList = async () => {
    //     const result = await adminUserList(standard);
    //     
    //     if (result.status === "SUCCESS")
    //         setAdminUserRequest(result.data);
    // }
    const onChangeKeyword = (e) => {
        setStandard({
            ...standard,
            [e.target.name]: e.target.value
        })
    }
    // const contnetEnrollBtn = async () => {
    //     setEditingContent(null)
    //      유정 정보를 수정하는 함수
    //     const result = await enrollUser();
    //     if (result.status === 'SUCCESS') {
    //         setAdminUserRequest(result.data);
    //         toast.success('성공적으로 수정되었습니다.');
    //     } else {
    //         toast.error('수정 실패');
    //     }
    //     getList();
    // }

    // 유저 삭제하는 함수
    // const deleteUser = async (userNo) => {
    //     const deleteResult = await adminUserdelete(userNo)
    //     if (deleteResult.status === 'SUCCESS') {
    //         toast.success('성공적으로 수정되었습니다.');
    //     } else {
    //         toast.error('수정 실패');
    //     }
    //     getList();
    // }
    const onChangeSearchStandard = (item) => {
        setStandard({
            ...standard,
            searchValue: item
        })
    }
    const onChangeUserRole = (item) => {
        setNewUserContent({
            ...newUsercontent,
            userRole: item
        })
    }
    const onChangeNewUsercontent = (e) => {
        setNewUserContent({
            ...newUsercontent,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSortStandard = (item) => {
        setStandard({
            ...standard,
            sortValue: item
        })
    }
    
    const [newUsercontent, setNewUserContent] = useState({
        userNo: '',
        userId: '',
        nickName: '',
        address: '',
        phone: '',
        userRole: '',
        createDate: ''
    })
    const enrollbtn = (item, idx) => {
        setNewUserContent(item)
        setEditingContent(idx)
    }
    useEffect(() => {

    }, [newUsercontent])
    const roleCategory = [
        { label: 'ADMIN', value: 'ADMIN' },
        { label: 'USER', value: 'USER' },
        { label: 'ARTIST', value: 'ARTIST' },
    ]
    const searchCategory = [
        { label: '전체', value: 'all' },
        { label: '일반', value: 'USER' },
        { label: '아티스트', value: 'ARTIST' },
        { label: '관리자', value: 'ADMIN' },
    ]
    const sortCategory = [
        { label: '가입일', value: 'createDate' },
    ]
    const test = [
        {
            userNo: 1,
            userId: '아이디1',
            nickName: '강서구 귀요미1',
            address: '서울시 강서구 공항동',
            phone: '01031058440',
            userRole: 'ADMIN',
            createDate: '2024-05-28'
        },
        {
            userNo: 2,
            userId: '아이디2',
            nickName: '강서구 귀요미2',
            address: '서울시 강서구 공항동',
            phone: '01031058440',
            userRole: 'USER',
            createDate: '2024-05-28'
        },
        {
            userNo: 3,
            userId: '아이디3',
            nickName: '강서구 귀요미3',
            address: '서울시 강서구 공항동',
            phone: '01031058440',
            userRole: 'ARTIST',
            createDate: '2024-05-28'
        },
        {
            userNo: 4,
            userId: '아이디4',
            nickName: '강서구 귀요미4',
            address: '서울시 강서구 공항동',
            phone: '01031058440',
            userRole: 'USER',
            createDate: '2024-05-28'
        },
        {
            userNo: 5,
            userId: '아이디5',
            nickName: '강서구 귀요미5',
            address: '서울시 강서구 공항동',
            phone: '01031058440',
            userRole: 'ARTIST',
            createDate: '2024-05-28'
        },
    ]
    const onClickSearch = async () => {
        //backEnd 작업 후 활성화 시켜주세요.

        // const list = await searchUserList(standard);
        // if (list.status === 'SUCCESS'){
        //     setAdminUserRequest(list.data);
        //     toast.success('총' + list.data.length + '건의 검색 결과');
        // } else {
        //     toast.error('검색 실패');
        // }
    }
    return (
        <>
            <h1>유저 관리</h1>
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
                    <button onClick={onClickSearch}>검색</button>
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
                        <th>닉네임</th>
                        <th>전화번호</th>
                        <th>유저 주소</th>
                        <th>유저 권한</th>
                        <th>수정/삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {test.map((item, idx) => {
                        return (editingContent !== idx ?
                            <tr key={idx}>
                                <th>{item.userNo}</th>
                                <th>{item.userId}</th>
                                <th>{item.nickName}</th>
                                <th>{item.phone}</th>
                                <th>{item.address}</th>
                                <th>{item.userRole}</th>
                                <th><div><button onClick={() => { enrollbtn(item, idx) }}>수정</button><button onClick={() => deleteUser(item.userNo)}>삭제</button></div></th>
                            </tr>
                            : <tr key={idx}>
                                <th>{item.userNo}</th>
                                <th><FundInputBar
                                    value={newUsercontent.userId}
                                    onChangeValue={onChangeNewUsercontent}
                                    name={'userId'} /></th>
                                <th><FundInputBar
                                    value={newUsercontent.nickName}
                                    onChangeValue={onChangeNewUsercontent}
                                    name={'nickName'} /></th>
                                <th><FundInputBar
                                    value={newUsercontent.phone}
                                    onChangeValue={onChangeNewUsercontent}
                                    name={'phone'} /></th>
                                <th><FundInputBar
                                    value={newUsercontent.address}
                                    onChangeValue={onChangeNewUsercontent}
                                    name={'address'} /></th>
                                <th><SelectBar
                                    list={roleCategory} onChangeValue={onChangeUserRole}
                                /></th>
                                <th><div><button onClick={() => contnetEnrollBtn()}>수정</button><button onClick={() => setEditingContent(null)}>취소</button></div></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
} export default AdminUserAutorityUsertable;