import ModalWindow from '../ModalWindow';
import { isModalActive } from '../../recoil/IsModalActive';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import './UserDeleteModal.scss';

const UserDeleteModal = ({ onConfirm }) => {

    const setModal = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setModal(false);
    }

    return (
        <ModalWindow>
            <div className="deleteModal__container">
                <div className="deleteModal__header">
                    <h3>회원 탈퇴 확인  </h3>
                </div>
                <hr />
                <div className="deleteModal__content">
                    <p>정말로 삭제하시겠습니까?</p>
                </div>
                <div className="deleteModal__btn">
                    <div onClick={onConfirm}>탈퇴</div>
                    <div onClick={modalClose}>취소</div>
                </div>
            </div>
        </ModalWindow>
    );
}

export default UserDeleteModal;