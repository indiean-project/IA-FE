import './Reply.scss';
import { BsChat } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { useEffect } from 'react';

function Reply({replyList}){
    const loginUser = useRecoilValue(loginUserState);

    if(!replyList) {
        return <></>
    }

    return(
        <div className='reply__container'>
            <div className='reply__count'><BsChat /> &nbsp; 댓글({replyList.length})</div>
            <div className='reply__text'>
                {replyList.map((item, index)=>{
                    return (
                        <table key={index}>
                            <thead>
                                <tr>
                                    <td className='title'>{item.nickName}</td><td>&nbsp; {item.createDate} { loginUser.userNo === item.userNo ? <><BsPencilSquare className='pointer'/> <BsTrash className='pointer'/></>:"" }</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='text' colSpan={2}>{item.replyContent}</td>{ loginUser.userId !==""? <td className='report'> 신고</td>:<td></td>}
                                </tr>
                                <tr>
                                    <td colSpan={3}><hr></hr></td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
                
                
            </div>
        </div>
    )
}export default Reply