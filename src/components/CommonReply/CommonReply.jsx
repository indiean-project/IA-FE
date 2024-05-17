import { useState,useRef,useEffect } from 'react';
import './CommonReply.scss';
import Reply from '../Reply'
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser'; 
import toast from 'react-hot-toast';

function CommonReply(){
    const inputRef = useRef(null);
    const loginUser = useRecoilValue(loginUserState);
    const [replyText, setReplyText] = useState('');
    useEffect(() => {
        
        if (loginUser.userId ==="") {
          inputRef.current.placeholder = "로그인이 필요합니다.";
          inputRef.current.readOnly=true;
        }
      }, [])
      const clickOn = () =>{
        loginUser.userId ===""?toast.error("로그인해주세요"):null

      }
    
    
    return(
        <>
           
                <div className='Common__reply__box'>
                    <div className='Common__reply__content'>
                        <div className='reply__input'>
                            <textarea type="text"  ref={inputRef} value={replyText} rows={6} onChange={(e)=>{setReplyText(e.target.value)}} />
                            <div className='btn' onClick={clickOn}>등록</div>
                        </div>
                        <Reply></Reply>
                    </div>
                    
                </div>

        </>
    )

}export default CommonReply