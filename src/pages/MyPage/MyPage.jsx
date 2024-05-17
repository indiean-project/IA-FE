import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PencilSquare } from 'react-bootstrap-icons';

import { loginUserState } from '../../recoil/LoginUser';

import './MyPage.scss';
import { updateUser } from '../../apis/user';

function MyPage() {
    const loginUser = useRecoilValue(loginUserState);
    const [doEdit, setDoEdit] = useState(null);

    const onDoEdit = (id) => {
        setDoEdit(id);
    };

    // loginUserState는 id, name, nickname, phone, address 5개 항목만 저장 중이다.
    // 1. loginUserState default값 변경해야함
    // 2. 서버에서의 Dto 항목 변경 및 통합 필요? <- UserInfodto라는 별도의 이름 객체 생성 중
    const [editAccount, setEditAccount] = useState({
        userNo : loginUser.data.userNo,
        nickname: loginUser.data.nickname,
        userName: loginUser.data.userName,
        userPwd: loginUser.data.userPwd,
        phone: loginUser.data.phone,
        address: loginUser.data.address,
        userProfileImg: loginUser.data.userProfileImg,
        userContent: loginUser.data.userContent,
        userFavoriteArtist: loginUser.data.userFavoriteArtist,
        userFavoriteMusic: loginUser.data.userFavoriteMusic
    });

    const onChangeUserInfo = (e) => {
        setEditAccount({
            ...editAccount,
            [e.target.name]: e.target.value,
        })
    };

    const onClickUpdate = async () => {
        console.log(editAccount);
        const result = await updateUser({
            userNo : editAccount.userNo,
            nickname: editAccount.nickname,
            userName: editAccount.userName,
            userPwd: editAccount.userPwd,
            phone: editAccount.phone,
            address: editAccount.address,
            userProfileImg: editAccount.userProfileImg,
            userContent: editAccount.userContent,
            userFavoriteArtist: editAccount.userFavoriteArtist,
            userFavoriteMusic: editAccount.userFavoriteMusic
        })
        console.log(result);
        // if(result.response && result.response.data.name === "HAS_NICKNAME") {
            
        // }
    }

    return (
        <>
            <div className="myPage__container">
                <div className="myPage__box">
                    <div className="headh2"><h2>{loginUser.data.nickname} 님의 페이지입니다.</h2></div>
                    <div className="profile__img">
                        {/* img란입니다. , profile__intro와 묶어서 쓸 예정 <UserProfile />*/}
                        <div className="showImg">
                            <img src={editAccount.userProfileImg} alt="xxxx" />
                            {/* <input type="image" /> */}
                        </div>
                    </div>
                    <div className="text__info">
                        {/* 각종 개인 정보가 들어갈 란입니다. <UserTextInfo />*/}
                        <div>
                            <input type="text" value={editAccount.nickname} id="nickname" name="nickname"
                                readOnly={doEdit !== "nickname"} onChange={(e) => onChangeUserInfo(e)} />
                            <button type="button" onClick={() => onDoEdit("nickname")} ><PencilSquare /></button>
                            <br /><br />
                            <input type="text" value={editAccount.userName} id="userName" name="userName"
                                readOnly={doEdit !== "userName"} onChange={(e) => onChangeUserInfo(e)} />
                            <button type="button" onClick={() => onDoEdit("userName")}><PencilSquare /></button>
                            <br /><br />
                            <input type="password" value={editAccount.userPwd} id="userPwd" name="userPwd"
                                readOnly={doEdit !== "userPwd"} onChange={(e) => onChangeUserInfo(e)} />
                            <button type="button" onClick={() => onDoEdit("userPwd")}><PencilSquare /></button>
                            <br /><br />
                            <input type="text" value={editAccount.phone} id="phone" name="phone"
                                readOnly={doEdit !== "phone"} onChange={(e) => onChangeUserInfo(e)} />
                            <button type="button" onClick={() => onDoEdit("phone")}><PencilSquare /></button>
                            <br /><br />
                            <input type="text" value={editAccount.address} id="address" name="address"
                                readOnly={doEdit !== "address"} onChange={(e) => onChangeUserInfo(e)} />
                            <button type="button" onClick={() => onDoEdit("address")}><PencilSquare /></button>
                        </div>
                    </div>
                    <div className="profile__intro">
                        <textarea value={editAccount.userContent} id="userContent" name="userContent"
                            onChange={(e) => onChangeUserInfo(e)}
                            readOnly={doEdit !== "userContent"}
                            onDoubleClick={() => onDoEdit("userContent")} />
                    </div>
                    <div className="favorite">
                        {/* 선호 아티스트 및 음악 등록란 :: spotify 키 필요, <UserFavorite /> */}
                        <h3>Favorite</h3>
                        <div>
                            <div className="fav__artist">
                                <div className="fav__img">
                                    <img src={editAccount.userFavoriteArtist} alt="xx" />
                                </div>
                                <p>{editAccount.userFavoriteArtist}아티스트명</p>
                            </div>
                            <br />
                            <div className="fav__music">
                                <div className="fav__img">
                                    <img src={editAccount.userFavoriteMusic} alt="xx" />
                                </div>
                                <p>{editAccount.userFavoriteMusic}음악제목</p>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="bList">
                        {/* <UserWriteHistory /> */}
                        작성글 및 댓글 불러올 공간
                    </div>
                </div>
                <button className="btn-update" onClick={onClickUpdate} >정보 수정</button>
            </div>
        </>
    );
}
export default MyPage;

// const [editAccount, setEditAccount] = useState({
//     nickname : '',
//     userName : '',
//     userPwd : '',
//     phone : '',
//     address : '',
//     userProfileImg : '',
//     userContent : '',
//     userFavoriteArtist : '',
//     userFavoriteMusic : ''
// })