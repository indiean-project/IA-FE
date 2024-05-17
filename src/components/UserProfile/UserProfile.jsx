import React, { useState } from 'react';

import { tempImg } from '../../apis/imgFilter';
import toast from 'react-hot-toast';
import './UserProfile.scss';



function UserProfile({ editAccount, doEdit, onChangeUserInfo, onDoEdit }) {

    const [selectProfileImg, setSelectProfileImg] = useState(editAccount.userProfileImg);

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
                if (response && response.userProfileImg) {
                    setSelectProfileImg(response.userProfileImg);
                } else {
                    toast.error("이미지 업로드에 실패했습니다.");
                }
            } catch (error) {
                toast.error("이미지 업로드에 실패했습니다");
            }
            
        }
    }

    return (
        <>
            <div className="profile__img">
                <div className="showImg">
                    <img src={selectProfileImg} alt="profile" />
                    <input type="file" accept="image/*"
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