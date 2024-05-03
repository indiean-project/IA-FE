import ReactDOM from 'react-dom';
import './ModalBackground.scss';

const ModalBackground = (props) => {
    return ReactDOM.createPortal(
        <div className="modalBackground">
            {props.children}
        </div>,
        document.body
    );
}

export default ModalBackground;