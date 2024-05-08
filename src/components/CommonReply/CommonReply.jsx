import { useState } from 'react';
import './CommonReply.scss';
import Reply from '../Reply'

function CommonReply(){
    
    const [replyText, setReplyText] = useState('');
    
    
    return(
        <>
           
                <div className='Common__reply__box'>
                    <div className='Common__reply__content'>
                        <div className='reply__input'>
                            <textarea type="text" name="" value={replyText} rows={6} onChange={(e)=>{setReplyText(e.target.value)}} />
                            <div className='btn'><span>등록</span></div>
                        </div>
                        <Reply></Reply>
                    </div>
                    
                </div>

        </>
    )

}export default CommonReply