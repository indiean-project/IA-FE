import ReactDOM from 'react-dom';
import './ModalBackground.scss';
import { useSetRecoilState } from 'recoil';
import { isModalActive } from '../../recoil/IsModalActive';

const ModalBackground = (props) => {
    const setModal = useSetRecoilState(isModalActive);
    return ReactDOM.createPortal(
        <div className="modalBackground" onClick={()=>setModal(false)}>
            {props.children}
        </div>,
        document.body
    );
}

export default ModalBackground;