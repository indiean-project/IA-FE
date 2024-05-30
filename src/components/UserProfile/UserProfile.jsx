import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import { tempImg } from '../../apis/user';
import toast from 'react-hot-toast';

import logo_black from '../../assets/logo/logo_black.png';
import './UserProfile.scss';

function UserProfile({ editAccount, doEdit, onChangeUserInfo, onDoEdit, onAddTempImg }) {

    const loginUser = useRecoilValue(loginUserState);
    const [selectProfileImg, setSelectProfileImg] = useState(loginUser.userProfileImg);

    useEffect(() => {
        console.log(selectProfileImg);
        if (selectProfileImg) {
            setSelectProfileImg("img/user/"+loginUser.userNo+"/"+selectProfileImg);
        }
    }, []); // 시작할 때 이미지 정보를 저장된 userProfileImg column에서 가져오므로, 앞에 경로 정보를 붙여야 함

    useEffect(() => {
        console.log(selectProfileImg);
    }, [selectProfileImg]);

    const imageUpload = async (e) => {
        const file = e.target.files[0];

        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
            toast.error("파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.");
            return;
        }

        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await tempImg(formData);
                console.log(response);
                console.log(response.data);
                if (response && response.data) {
                    setSelectProfileImg('/tempImg/'+response.data);
                    onChangeUserInfo({ target: { name: 'userProfileImg', value: response.data } });
                    onAddTempImg(response.data)
                } else {
                    toast.error("이미지 업로드에 실패했습니다.");
                }
            } catch (error) {
                toast.error("이미지 업로드에 실패했습니다");
            }
            
        }
    }

    const handleClick = () => {
        document.getElementById('profileImgInput').click();
    }

    return (
        <>
            <div className="profile__img">
                <div className="showImg" onClick={handleClick}>
                    <img src={selectProfileImg || logo_black} />
                    <input type="file" accept="image/*" id="profileImgInput"
                        onChange={imageUpload} />
                </div>
            </div>
            <div className="profile__intro">
                <textarea value={editAccount.userContent}
                    id="userContent" name="userContent"
                    onChange={(e) => onChangeUserInfo(e)}
                    readOnly={doEdit !== "userContent"}
                    onDoubleClick={() => onDoEdit("userContent")} />
            </div>
        </>
    )
}

export default UserProfile;