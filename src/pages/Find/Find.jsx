import { useState } from 'react';

import FindDiv from '../../components/FindDiv';
import FindUserId from '../../components/FindUserId';
import FindUserPwd from '../../components/FindUserPwd';
import './Find.scss'

function Find() {

    const [findState, setFindState] = useState('');

    return (
        <>
            <div className="find__container">
                <FindDiv onPage={findState} setFindState={setFindState} />
                {findState === 'userId' && <FindUserId />}
                {findState === 'userPwd' && <FindUserPwd />}
            </div>
        </>    
    )
}
export default Find;
