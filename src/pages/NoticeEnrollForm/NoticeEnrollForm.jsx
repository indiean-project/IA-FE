import { useEffect, useMemo, useRef, useState } from "react";
import "./NoticeEnrollForm.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { tempImg } from "../../apis/user";
import { NoticeEnroll } from "../../apis/board";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../recoil/LoginUser";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function NoticeEnrollForm() {
    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [title, setTitle] = useState('');
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const location = useLocation();
    const [byte, setByte] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state !== null) {
            setTitle(location.state.noticeItem.noticeTitle);
            setContent(location.state.noticeItem.noticeContent);
        }
    }, [])


    const enroll = async () => {
        const result = await NoticeEnroll(
            location.state !== null ?
                {
                    noticeNo: location.state.noticeItem.noticeNo,
                    member: {
                        userNo: loginUser.userNo
                    },
                    noticeTitle: title,
                    noticeContent: content
                } :
                {
                    member: {
                        userNo: loginUser.userNo
                    },
                    noticeTitle: title,
                    noticeContent: content
                })
                console.log(result)
        if (result.status === "SUCCESS") {
            toast.success("등록되었습니다.");
            navigate("/notice/detail/"+result.data);
        }
    }

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link'],
                    ['clean']
                ],
            },
        }
    }, [])

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];

    const handleChange = (content) => {
        setContent(content);
        let byte = 0;
        for (let i = 0; i < content.length; i++) {
            content.charCodeAt(i) > 127 ? byte += 3 : byte++;
        }
        setByte(byte);
    };

    return (
        <div className="boardEnrollForm__container">
            <div className='boardEnrollForm__box'>
                <label>공지사항 글쓰기</label>
                <div>
                    <input type="text" placeholder='제목을 입력하세요.' onChange={(e) => { setTitle(e.target.value) }} value={title} />
                </div>
                <div>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={content}
                        onChange={handleChange}
                        ref={quillRef}
                    />
                    <div className='boardEnrollForm__byte'><div>byte : {byte} / 4000</div></div>
                    <div className='boardEnrollForm__items'>
                        <button onClick={enroll}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
} export default NoticeEnrollForm;