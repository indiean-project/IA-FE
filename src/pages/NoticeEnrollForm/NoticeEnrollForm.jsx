import { useEffect, useMemo, useRef, useState } from "react";
import "./NoticeEnrollForm.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { tempImg } from "../../apis/imgFilter";
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
        if (title.trim() === "") {
            toast.error("제목을 입력해주세요.");
            return
        } else if (content.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/<br>/g, "").trim() === "") {
            toast.error("내용을 입력해주세요.");
            return
        }

        if (byte > 4000) {
            toast.error("입력 가능한 글자수를 초과하였습니다.");
            return
        }
        
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
        if (result.status === "SUCCESS") {
            toast.success("등록되었습니다.");
            navigate("/notice/detail/" + result.data);
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

    const handleChange = (text) => {
        let num = 0;

        if (text.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/<br>/g, "") === "") {
            text = "";
        }

        for (let i = 0; i < text.length; i++) {
            text.charCodeAt(i) > 127 ? num += 3 : num++;
        }
        setByte(num);

        if (byte >= 4000 && content.length < text.length) {
            toast.error("입력 가능한 글자수를 초과하였습니다.");
            setContent(content);
            return;
        }

        setContent(text);
    };

    return (
        <div className="boardEnrollForm__container">
            <div className='boardEnrollForm__box'>
                <label>공지사항 글쓰기</label>
                <div>
                    <input maxLength={30} type="text" placeholder='제목을 입력하세요.' onChange={(e) => { setTitle(e.target.value) }} value={title} />
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