import { PencilSquare } from 'react-bootstrap-icons';

import './UserTextInfo.scss';

function UserTextInfo({ loginUser, editAccount, doEdit, onChangeUserInfo, onDoEdit }) {

    return (
        <>
            <div className="text__info">
                <div className="text__container">
                    <div className="text__box">
                        <input type="text" value={editAccount.nickname} id="nickname" name="nickname"
                            readOnly={doEdit !== "nickname"} onChange={(e) => onChangeUserInfo(e)} />
                        <button type="button" onClick={() => onDoEdit("nickname")} ><PencilSquare /></button>
                    </div>
                    <br /><br />
                    <div className="text__box">
                        <input type="text" value={editAccount.userName} id="userName" name="userName"
                            readOnly={doEdit !== "userName"} onChange={(e) => onChangeUserInfo(e)} />
                        <button type="button" onClick={() => onDoEdit("userName")}><PencilSquare /></button>
                    </div>
                    <br /><br />
                    <div className="text__box">
                        <input type="password" value={editAccount.userPwd} id="userPwd" name="userPwd"
                            readOnly={doEdit !== "userPwd" || loginUser.socialStatus !== 'N'} 
                            onChange={(e) => onChangeUserInfo(e)} disabled={loginUser.socialStatus !== 'N'} />
                        <button type="button" onClick={() => onDoEdit("userPwd")} 
                            disabled={loginUser.socialStatus !== 'N'}><PencilSquare /></button>
                    </div>
                    <br /><br />
                    <div className="text__box">
                        <input type="text" value={editAccount.phone} id="phone" name="phone"
                            readOnly={doEdit !== "phone"} onChange={(e) => onChangeUserInfo(e)} />
                        <button type="button" onClick={() => onDoEdit("phone")}><PencilSquare /></button>
                    </div>
                    <br /><br />
                    <div className="text__box">
                        <input type="text" value={editAccount.address} id="address" name="address"
                            readOnly={doEdit !== "address"} onChange={(e) => onChangeUserInfo(e)}
                            placeholder="주소 입력란" />
                        <button type="button" onClick={() => onDoEdit("address")}><PencilSquare /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserTextInfo;