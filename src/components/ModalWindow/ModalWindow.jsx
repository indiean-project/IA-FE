import ModalBackground from '../ModalBackground';
import { isModalActive } from '../../recoil/IsModalActive';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import './ModalWindow.scss';

const ModalWindow = (props) => {

    const setCloseButton = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setCloseButton({
            ...isModalActive,
            default: false
        })
    }



    return (
        <ModalBackground>
            <div className="modal__box" onClick={(e)=>e.stopPropagation()}>
                {props.children}
            </div>
        </ModalBackground>
    );
}

export default ModalWindow;