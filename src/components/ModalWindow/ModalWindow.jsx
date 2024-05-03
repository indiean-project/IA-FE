import ModalBackground from '../ModalBackground';
import { isModalActive } from '../../recoil/IsModalActive';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

const ModalWindow = () => {

    const setCloseButton = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setCloseButton(false)
    }



    return (
        <ModalBackground>
            <div className="modal__box">
                <button onClick={modalClose}>확인</button>
            </div>
        </ModalBackground>
    );
}

export default ModalWindow;