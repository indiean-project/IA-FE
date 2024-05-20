import ModalBackground from '../ModalBackground';
import { isModalActive } from '../../recoil/IsModalActive';
import {loginUserState} from '../../recoil/LoginUser';
import { useRecoilValue, useSetRecoilState  } from 'recoil'
import { useNavigate } from 'react-router-dom';

import './LoginModal.scss';

const LoginModal = () => {

    const navigate = useNavigate();

    const loginUserInfo = useRecoilValue(loginUserState);
    const setCloseButton = useSetRecoilState(isModalActive);

    const modalClose = () => {
        // setCloseButton({
        //     ...isModalActive,
        //     default: false
        // })   => default 항목이 LoginUser처럼 여러값이 아니라면 굳이 spread 연산자 ... 쓸 필요 X
        setCloseButton(false);
        console.log(isModalActive);
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
                    <p>{loginUserInfo.nickname}님 방문 환영합니다!</p>
                </div>
                <br/>
                <div>
                    <button onClick={()=>modalClose()}>확인</button>
                </div>
            </div>
        </ModalBackground>
    );
}

export default LoginModal;