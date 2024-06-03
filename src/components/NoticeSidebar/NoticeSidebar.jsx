import { useRecoilState } from 'recoil';
import './NoticeSidebar.scss';
import { loginUserState } from '../../recoil/LoginUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { artistConfirmation } from '../../apis/artist/artist';
import { useEffect, useState } from 'react';

function NoticeSidebar(props) {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const navigate = useNavigate();
    const [comfiramationVal, setComfiramation] = useState(null);

    useEffect(()=>{
        comfiramation();
    }, [])

    const comfiramation = async () => {
        const comfiramationList = await artistConfirmation(loginUser.userNo)
        setComfiramation(comfiramationList)
    }

    const artistEnrollMove = () =>{
        if(loginUser.userNo ===''){
            toast.error('로그인 후 이용가능 합니다.')  
            return    
        }
        if (comfiramationVal !==null &&comfiramationVal.status === "SUCCESS") {
            toast.error(comfiramationVal.data)
            return
        } else {
            navigate('/artist/enroll');
        }
        
    }

    const questionMove = () => {
        if(loginUser.userNo === '') {
            toast.error('로그인 후 이용가능 합니다.');
            return
        }
        props.setModal(true)
    }

    return (
        <div className="noticeSidebar__container">
            <div className='noticeSidebar__box'>
                <div className='noticeSidebar__category'>고객지원 &gt; 공지사항</div>
                <hr />
                <div className='noticeSidebar__label'>
                    <label>고객지원</label>
                </div>
                    <div className='noticeSidebar__post' onClick={()=>{questionMove()}}>1:1 문의</div>
                    <div className='noticeSidebar__post' onClick={()=>{artistEnrollMove()}}>아티스트 신청하기</div>
            </div>
        </div>
    )
} export default NoticeSidebar;