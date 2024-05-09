import ModalBackground from '../ModalBackground';
import { isModalActive } from '../../recoil/IsModalActive';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

const ModalWindow = (props) => {

    const setCloseButton = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setCloseButton(false)
    }



    return (
        <ModalBackground>
            <div className="modal__box">
                {props.children}
            </div>
        </ModalBackground>
    );
}

export default ModalWindow;