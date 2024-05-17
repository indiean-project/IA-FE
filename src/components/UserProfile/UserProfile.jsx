import './UserProfile.scss';

function UserProfile({editAccount, doEdit, onChangeUserInfo, onDoEdit}) {

    return (
        <>
            <div className="profile__img">
                <div className="showImg">
                <img src={editAccount.userProfileImg} alt="xxxx" />
                {/* <input type="image" /> */}
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