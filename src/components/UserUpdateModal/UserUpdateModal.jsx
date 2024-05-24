import ModalWindow from '../ModalWindow';
import { isModalActive } from '../../recoil/IsModalActive';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import './UserUpdateModal.scss';

const UserUpdateModal = ({updateInfo, errorMsg}) => {

    const setModal = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setModal(false);
    }

    return (
        <ModalWindow>
            <div className="updateModal__container">
                <div className="updateModal__header">
                    <h3>알림</h3>
                </div>
                <hr />
                <div className="updateModal__content">
                    {updateInfo == true && <p>회원 정보 수정 완료</p>}
                    {updateInfo == false && <p>{errorMsg} : 회원 정보 수정 실패</p>}
                </div>
                <div onClick={()=>modalClose()}>확인</div>
            </div>
        </ModalWindow>
    );
}

export default UserUpdateModal;