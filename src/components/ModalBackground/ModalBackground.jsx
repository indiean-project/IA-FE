import ReactDOM from 'react-dom';
import './ModalBackground.scss';
import { useSetRecoilState } from 'recoil';
import { isModalActive } from '../../recoil/IsModalActive';

const ModalBackground = ({children, onBackgroundClick}) => {
    const setModal = useSetRecoilState(isModalActive);

    const backgroundClick = (e) => {
        if(e.target === e.currentTarget) {
            setModal(false);    
            if (onBackgroundClick) {
                onBackgroundClick();
            }   // 로그인 모달창은 외부 background 클릭 시에도 홈페이지로 나가기 위해 설정함

        }
    }
    return ReactDOM.createPortal(
        <div className="modalBackground" onClick={(e)=>backgroundClick(e)}>
            {children}
        </div>,
        document.body
    );
}

export default ModalBackground;