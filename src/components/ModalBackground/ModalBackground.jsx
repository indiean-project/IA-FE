import ReactDOM from 'react-dom';
import './ModalBackground.scss';
import { useSetRecoilState } from 'recoil';
import { isModalActive } from '../../recoil/IsModalActive';

const ModalBackground = (props) => {
    const setModal = useSetRecoilState(isModalActive);

    const backgroundClick = (e) => {
        if(e.target === e.currentTarget) {
            setModal(false);
        }
    }
    return ReactDOM.createPortal(
        <div className="modalBackground" onClick={(e)=>backgroundClick(e)}>
            {props.children}
        </div>,
        document.body
    );
}

export default ModalBackground;