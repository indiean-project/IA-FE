import ModalBackground from '../ModalBackground';
import { isModalActive } from '../../recoil/IsModalActive';
import {loginUserState} from '../../recoil/LoginUser';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';

import './LoginModal.scss';

const LoginModal = () => {

    const navigate = useNavigate();

    const loginUserInfo = useRecoilValue(loginUserState);
    const setCloseButton = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setCloseButton(false)
        navigate("/");
    }



    return (
        <ModalBackground>
            <div className="modal__box">
                <div className="loginmodal__notice">
                    <p>알림</p>
                </div>
                <hr/>
                <div>
                    <p>{loginUserInfo.userId}님 방문 환영합니다!</p>
                </div>
                <br/>
                <div>
                    <button onClick={modalClose}>확인</button>
                </div>
            </div>
        </ModalBackground>
    );
}

export default LoginModal;