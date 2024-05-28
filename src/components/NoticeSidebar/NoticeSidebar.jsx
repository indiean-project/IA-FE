import { useRecoilState } from 'recoil';
import './NoticeSidebar.scss';
import { loginUserState } from '../../recoil/LoginUser';
import { useNavigate } from 'react-router-dom';

function NoticeSidebar(props) {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const navigate = useNavigate();

    const artistEnrollMove = () =>{
        if(loginUser.userNo ===''){
            toast.error('로그인 후 이용가능 합니다.')  
            return    
        }
        if(loginUser.userRole=='ARTIST'){
            toast.error('등록된 아티스트입니다.')
            return
        }
        navigate('/artist/enroll')
        
    }

    return (
        <div className="noticeSidebar__container">
            <div className='noticeSidebar__box'>
                <div className='noticeSidebar__category'>고객지원 &gt; 공지사항</div>
                <hr />
                <div className='noticeSidebar__label'>
                    <label>고객지원</label>
                </div>
                    <div className='noticeSidebar__post' onClick={()=>{props.setModal(true)}}>1:1 문의</div>
                    <div className='noticeSidebar__post' onClick={()=>{artistEnrollMove()}}>아티스트 신청하기</div>
            </div>
        </div>
    )
} export default NoticeSidebar;