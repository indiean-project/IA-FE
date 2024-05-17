import { PencilSquare } from 'react-bootstrap-icons';

import './UserTextInfo.scss';

function UserTextInfo({editAccount, doEdit, onChangeUserInfo, onDoEdit}) {

    return (
        <>
            <div className="text__info">
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
        </>
    )
}

export default UserTextInfo;