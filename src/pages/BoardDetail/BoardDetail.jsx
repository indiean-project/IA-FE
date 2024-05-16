import CommonReply from '../../components/CommonReply/CommonReply';
import './BoardDetail.scss';
import { MdThumbUp } from "react-icons/md";

function BoardDetail() {
    return (
        <div className='boardDetail__container'>
            <div className='boardDetail__box'>
                <div>user01</div>
                <div>2024-05-16</div>
                <div className='boardDetail__item'>
                    <div>조회 : 854</div>
                    <div>추천 : 46</div>
                </div>
            </div>
            <hr />
            <div className='boardDetail__box'>
                <div>자유게시판</div>
                <div className='boardDetail__item'>
                    <div>수정</div>
                    <div>삭제</div>
                    <div>목록</div>
                    <div>신고</div>
                </div>
            </div>
            <div className='boardDetaill__title'>
                <label>샘플용 제목</label>
                <p>asdsadasdasd</p>
            </div>
            <div className='boardDetail__like__area'>
                <div className="boardDetail__like">
                    <div><MdThumbUp /></div>
                    <div>5</div>
                </div>
            </div>
            <CommonReply/>
        </div>
    )
} export default BoardDetail;