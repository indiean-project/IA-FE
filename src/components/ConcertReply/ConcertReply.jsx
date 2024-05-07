import { useState } from 'react';
import './ConcertReply.scss';

function ConcertReply(){
    
    const [replyText, setReplyText] = useState('');
    
    
    return(
        <div className='concert__reply__box'>
             <div className='concert__reply__content'>
                <textarea type="text" name="" value={replyText} rows={6} onChange={(e)=>{setReplyText(e.target.value)}} />
                <div className='btn'><span>등록</span></div>
            </div>
        </div>
    )

}export default ConcertReply