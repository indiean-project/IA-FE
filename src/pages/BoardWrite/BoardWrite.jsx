import ReactQuill from 'react-quill';
import './BoardWrite.scss';
import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

function BoardWrite() {
    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [imgList, setImgList] = useState([]);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            // const result = await tempImg(formData);  이미지 임시 저장

            let imgTag = `<img src="../public/tempImg/${result}" alt="${result}"/>`;

            setContent(prevContent => prevContent + imgTag);

            setImgList(imgList => [...imgList, result]);
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
                    ['link', 'image', 'video'],
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
        console.log(content);
    };

    const enroll = () => {
        let moveList = [];
        let deleteList = [];

        imgList.forEach((item) => {
            if (content.indexOf(item) !== -1) {
                moveList.push(item);
            } else {
                deleteList.push(item);
            }
        })

        if (moveList !== "") {
            // imgMove(moveList);   // 에디터에 해당 이미지가 있을 시 temp에서 img폴더 경로로 이동
        }
        if (deleteList !== "") {
            // imgDelete(deleteList);   // 에디터에 해당 이미지가 없을 시 temp에서 해당 이미지 삭제
        }

    }


    return (
        <div className="boardWrite__container">
            <div className='boardWrite__box'>
                <label>커뮤니티 글쓰기</label>
                <div>
                    <select>
                        <option value="">자유 게시판</option>
                        <option value="">아티스트 자랑하기</option>
                        <option value="">콜로세움</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder='제목을 입력하세요.' />
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
                    <div className='boardWrite__items'>
                        <button>이미지 첨부</button>
                        <button onClick={enroll}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )

} export default BoardWrite;