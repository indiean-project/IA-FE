import './Reply.scss';
import { BsChat } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';

function Reply(){
    
    const loginUser = useRecoilValue(loginUserState);
    return(
        <div className='reply__container'>
            <div className='reply__count'><BsChat /> &nbsp; 댓글()</div>
            <div className='reply__text'>
                <table>
                    <thead>
                        <tr>
                            <td className='title'>user01</td><td>&nbsp; 2024.04.23 { loginUser.userId ===""? <><BsPencilSquare className='pointer'/> <BsTrash className='pointer'/></>:"" }</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text' colSpan={2}>sdfsdfsdsdfgsdffsdfssdfgsdfdfsdgsdgsdgsd</td>{ loginUser.userId !==""? <td className='report'> 신고</td>:<td></td>}
                        </tr>
                        <tr>
                            <td colSpan={3}><hr></hr></td>
                        </tr>
                    </tbody>
                </table>
                
                
            </div>
        </div>
    )
}export default Reply