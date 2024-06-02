import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import { isModalActive } from '../../recoil/IsModalActive';
import { deleteUser, updateUser } from '../../apis/user';
import { imgDelete, imgMove } from '../../apis/imgFilter';
import UserProfile from '../UserProfile';
import UserTextInfo from '../UserTextInfo';
// import UserFavorite from '../UserFavorite';
import UserUpdateModal from '../UserUpdateModal';
import UserDeleteModal from '../UserDeleteModal';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './MyPageProfile.scss';

function MyPageProfile() {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [doEdit, setDoEdit] = useState(null);
    const [updateInfo, setUpdateInfo] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalActive);
    const [tempImgUrls, setTempImgUrls] = useState([]); // 임시 업로드 이미지들 리스트화
    const [modalType, setModalType] = useState('');

    const navigate = useNavigate();

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
        userFavoriteMusic: loginUser.userFavoriteMusic,
        socialstatus: loginUser.socialstatus
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
        setModalType("update");
        const newImg = editAccount.userProfileImg;

        let usedImage = newImg;

        // 이미지가 변경됐으면...
        if (loginUser.userProfileImg !== newImg) {
            // 기존 이미지가 존재한다면 삭제함
            if (loginUser.userProfileImg) {
                await imgDelete([loginUser.userProfileImg]);
            }

            const imgResponse = await imgMove([newImg]);
            usedImage = imgResponse.data[0];
            console.log(newImg);
            console.log(usedImage);

            // 변경된 이미지를 포함하여 새로운 editAccount 객체 생성
            const updateAccount = {
                ...editAccount,
                userProfileImg: usedImage,
            }

            const result = await updateUser(updateAccount);
            console.log(result);

            if (result.status == "SUCCESS") {
                setLoginUser(updateAccount);
                setIsModalOpen(true);
                setUpdateInfo(true);

                const unusedImages = tempImgUrls.filter(img => img !== usedImage);

                console.log(unusedImages);
    
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
        } else {
            // 이미지가 변경되지 않은 경우
            const result = await updateUser(editAccount);
            console.log(result);

            if (result.status == "SUCCESS") {
                setLoginUser(editAccount);
                setIsModalOpen(true);
                setUpdateInfo(true);
            } else {
                if (result.response?.data?.name === "HAS_NICKNAME" ||
                    result.response?.data?.name === "HAS_PHONE") {
                    setErrorMsg(result.response?.data?.name);
                    setUpdateInfo(false);
                } else {
                    setUpdateInfo(false); // 기본적으로 실패한 경우 false로 설정
                }
            }
        }
    }

    const onClickDelete = () => {
        setModalType("delete");
        setIsModalOpen(true);
    }

    const onDeleteUser = async () => {
        const result = await deleteUser({
            userNo : loginUser.userNo,
            deleteYn : "Y"
        })
        console.log(result);
        if (result.status === "SUCCESS") {
            setLoginUser('');
            toast.success("회원 탈퇴에 성공하셨습니다. 그동안 이용해주셔서 감사합니다.");
            navigate("/");
        } else {
            toast.error("회원 탈퇴에 실패했습니다.")
        }

    }

    const confirmDelete = async () => {
        await onDeleteUser();
        setIsModalOpen(false);
    }

    return (
        <>
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
            {/* <UserFavorite
                editAccount={editAccount}
                doEdit={doEdit}
                onChangeUserInfo={onChangeUserInfo}
                onDoEdit={onDoEdit} /> */}
            <div className="myPage__buttons">
                <button className="btn-update" onClick={onClickUpdate} >정보 수정</button>
                <button className="btn-delete" onClick={onClickDelete} >회원 탈퇴</button>
            </div>
            {isModalOpen && modalType == "update" &&
                <UserUpdateModal updateInfo={updateInfo} errorMsg={errorMsg} />}
            {isModalOpen && modalType == "delete" &&
                <UserDeleteModal onConfirm={confirmDelete}/>}
        </>
    );

}

export default MyPageProfile;
