import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import { isModalActive } from '../../recoil/IsModalActive';
import { updateUser, imgDelete, imgMove } from '../../apis/user';
import UserProfile from '../../components/UserProfile';
import UserTextInfo from '../../components/UserTextInfo';
import UserFavorite from '../../components/UserFavorite';
import UserWriteHistory from '../../components/UserWriteHistory';
import UserUpdateModal from '../../components/UserUpdateModal';

import './MyPage.scss';

function MyPage() {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [doEdit, setDoEdit] = useState(null);
    const [updateInfo, setUpdateInfo] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalActive);
    const [tempImgUrls, setTempImgUrls] = useState([]); // 임시 업로드 이미지들 리스트화


    const onDoEdit = (id) => {
        setDoEdit(id);
    };

    const [editAccount, setEditAccount] = useState({
        userNo: loginUser.userNo,
        nickname: loginUser.nickname,
        userName: loginUser.userName,
        userPwd: loginUser.userPwd,
        phone: loginUser.phone,
        address: loginUser.address,
        userProfileImg: loginUser.userProfileImg,
        userContent: loginUser.userContent,
        userFavoriteArtist: loginUser.userFavoriteArtist,
        userFavoriteMusic: loginUser.userFavoriteMusic
    });

    const onChangeUserInfo = (e) => {
        setEditAccount({
            ...editAccount,
            [e.target.name]: e.target.value,
        })
    };

    const onAddTempImg = (imgUrl) => {
        setTempImgUrls((prev) => [...prev, imgUrl]);
    }

    const onClickUpdate = async () => {
        console.log(editAccount);
        const result = await updateUser(editAccount);
        console.log(result);
        setIsModalOpen(true);

        if (result.status == "SUCCESS") {
            setLoginUser(editAccount);
            setUpdateInfo(true);

            // const usedImages = new Set(Object.values(editAccount));
            const usedImage = editAccount.userProfileImg;
            const response = await imgMove({
                userNo : loginUser.userNo,
                userProfileImg : usedImage
            }); 
            const unusedImages = tempImgUrls.filter(img => img !== usedImage);

            console.log(usedImage);
            console.log(unusedImages);

            // if (usedImages.size > 0) {
            //     await imgMove(Array.from(usedImages));
            // }

            if (unusedImages.length > 0) {
                await imgDelete(unusedImages);
            }

        } else {
            if (result.response?.data?.name == "HAS_NICKNAME" ||
                result.response?.data?.name == "HAS_PHONE") {
                setErrorMsg(result.response?.data?.name);
                setUpdateInfo(false);
            } else {
                setUpdateInfo(false); // 기본적으로 실패한 경우 false로 설정
            }
        }
    }


    return (
        <>
            <div className="myPage__container">
                <div className="myPage__box">
                    <div className="headh2"><h2>{loginUser.nickname} 님의 페이지입니다.</h2></div>
                    <UserProfile
                        editAccount={editAccount}
                        doEdit={doEdit}
                        onChangeUserInfo={onChangeUserInfo}
                        onAddTempImg={onAddTempImg}
                        onDoEdit={onDoEdit} />
                    <UserTextInfo
                        editAccount={editAccount}
                        doEdit={doEdit}
                        onChangeUserInfo={onChangeUserInfo}
                        onDoEdit={onDoEdit} />
                    <UserFavorite
                        editAccount={editAccount}
                        doEdit={doEdit}
                        onChangeUserInfo={onChangeUserInfo}
                        onDoEdit={onDoEdit} />
                    <UserWriteHistory />
                </div>
                <button className="btn-update" onClick={onClickUpdate} >정보 수정</button>
            </div>
            {isModalOpen &&
                <UserUpdateModal updateInfo={updateInfo} errorMsg={errorMsg} />}
        </>
    );


}
export default MyPage;

// const result = await updateUser({
//     userNo: editAccount.userNo,
//     nickname: editAccount.nickname,
//     userName: editAccount.userName,
//     userPwd: editAccount.userPwd,
//     phone: editAccount.phone,
//     address: editAccount.address,
//     userProfileImg: editAccount.userProfileImg,
//     userContent: editAccount.userContent,
//     userFavoriteArtist: editAccount.userFavoriteArtist,
//     userFavoriteMusic: editAccount.userFavoriteMusic
// })