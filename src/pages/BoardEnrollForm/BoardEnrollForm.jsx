import ReactQuill from 'react-quill';
import './BoardEnrollForm.scss';
import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { imgDelete, imgMove, tempImg } from '../../apis/imgFilter';
import { boardEnroll, imgEnroll } from '../../apis/boardEnroll';
import toast from 'react-hot-toast';

function BoardEnrollForm() {
    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [imgList, setImgList] = useState([]);
    const [title, setTitle] = useState('');

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const result = await tempImg(formData); // 이미지 임시 저장

            let imgTag = `<img src="../public/tempImg/${result.data}" alt="${result.data}"/>`;

            setContent(prevContent => prevContent + imgTag);

            setImgList(imgList => [...imgList, result.data]);
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
                    ['link', 'image'],
                    ['clean']
                ],
                handlers: {
                    image: imageHandler
                },
            },
        }
    }, [])

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const handleChange = (content) => {
        setContent(content);
    };

    const enroll = async () => {
        let moveList = [];
        let deleteList = [];
        let trimTitle;
        let imgResult;

        if (title.trim() === "") {
            toast.error("제목을 입력해주세요.");
        } else if (content.substring(4, content.length - 4).trim() === "") {
            toast.error("내용을 입력해주세요.");
        } else {
            trimTitle = title.trim();

            imgList.forEach((item) => {
                content.indexOf(item) !== -1 ? moveList.push(item) : deleteList.push(item);
            })

            if (moveList !== "") {
                imgResult = await imgMove(moveList);   // 에디터에 해당 이미지가 있을 시 tempImg에서 img폴더 경로로 이동
            }
            if (deleteList !== "") imgDelete(deleteList);   // 에디터에 해당 이미지가 없을 시 tempImg에서 해당 이미지 삭제

            const result = await boardEnroll({
                boardContent: content,
                boardTitle: trimTitle,
                member: {
                    userNo: 1   // 로그인 한 userNo로 수정예정
                }
            })

            if (imgResult.data.length > 0) {
                imgEnroll({
                    contentNo: result.data,
                    imgUrlList: imgResult.data
                });
            }


        }
    }

    return (
        <div className="boardEnrollForm__container">
            <div className='boardEnrollForm__box'>
                <label>커뮤니티 글쓰기</label>
                <div>
                    <select>
                        <option value="">자유 게시판</option>
                        <option value="">아티스트 자랑하기</option>
                        <option value="">콜로세움</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder='제목을 입력하세요.' onChange={(e) => { setTitle(e.target.value) }} />
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
                    <div className='boardEnrollForm__items'>
                        <button onClick={imageHandler}>이미지 첨부</button>
                        <button onClick={enroll}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
} export default BoardEnrollForm;