import { useState,useRef,useEffect } from 'react';
import './CommonReply.scss';
import Reply from '../Reply'
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser'; 

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
    
    
    return(
        <>
           
                <div className='Common__reply__box'>
                    <div className='Common__reply__content'>
                        <div className='reply__input'>
                            <textarea type="text"  ref={inputRef} value={replyText} rows={6} onChange={(e)=>{setReplyText(e.target.value)}} />
                            <div className='btn'><span>등록</span></div>
                        </div>
                        <Reply></Reply>
                    </div>
                    
                </div>

        </>
    )

}export default CommonReply