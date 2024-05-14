import ReactQuill from 'react-quill';
import './BoardEnrollForm.scss';
import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { imgDelete, imgMove, tempImg } from '../../apis/imgFilter';
import { BoardEnroll, ColoEnroll } from '../../apis/board';
import { imgEnroll } from '../../apis/imgUrl';
import toast from 'react-hot-toast';

function BoardEnrollForm() {
    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [imgList, setImgList] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('FREE');
    const [voteInput, setVoteInput] = useState('close');
    const [coloTitle1, setColoTitle1] = useState('');
    const [coloTitle2, setColoTitle2] = useState('');

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
        'link', 'video'
    ];

    const handleChange = (content) => {
        setContent(content);
    };

    const enroll = async () => {
        let moveList = [];
        let deleteList = [];
        let trimTitle;
        let imgResult;
        let coloResult;
        let result;
        let success;

        if (title.trim() === "") {
            toast.error("제목을 입력해주세요.");
            return
        } else if (content.substring(4, content.length - 4).trim() === "") {
            toast.error("내용을 입력해주세요.");
            return
        }

        if (category === 'COLO') {
            if (coloTitle1 === '' && coloTitle2 === '') {
                toast.error("콜로세움 게시판은 투표를 만들어야 작성 가능합니다.");
                return
            }
        }
        trimTitle = title.trim();

        imgList.forEach((item) => {
            content.indexOf(item) !== -1 ? moveList.push(item) : deleteList.push(item);
        })

        if (moveList !== "") {
            imgResult = await imgMove(moveList);   // 에디터에 해당 이미지가 있을 시 tempImg에서 img폴더 경로로 이동
        }
        if (deleteList !== "") imgDelete(deleteList);   // 에디터에 해당 이미지가 없을 시 tempImg에서 해당 이미지 삭제

            result = await BoardEnroll({
                boardContent: content,
                boardTitle: trimTitle,
                contentTypeNo: category,
                member: {
                    userNo: 1
                }
            });

            result.data[1] === 'COLO' ? coloResult = await ColoEnroll({
                colLeftTitle: coloTitle1,
                colRightTitle: coloTitle2,
                board: {
                    boardNo: result.data[0]
                }
            }) : success = result.status;

        if (imgResult.data.length > 0) {
            imgEnroll({
                contentNo: result.data[0],
                imgUrlList: imgResult.data
            });

        }
        success === 'SUCCESS' || coloResult.status === "SUCCESS" ? toast.success('작성 완료') : toast.error('작성 실패');
    }

    function voteState() {
        voteInput === 'close' ? setVoteInput('open') : setVoteInput('close');
    }

    return (
        <div className="boardEnrollForm__container">
            <div className='boardEnrollForm__box'>
                <label>커뮤니티 글쓰기</label>
                <div>
                    <select onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="FREE">자유 게시판</option>
                        <option value="PROUD">아티스트 자랑하기</option>
                        <option value="COLO">콜로세움</option>
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
                        <button className={category === 'COLO' ? 'displayNone' : ''} onClick={imageHandler}>이미지 첨부</button>
                        <button className={category === 'COLO' ? '' : 'displayNone'} onClick={voteState}>투표</button>
                        <button onClick={enroll}>등록</button>
                    </div>
                    <div className={voteInput === 'open' ? 'boardEnrollForm__insert__vote' : 'displayNone'}>
                        <div><label>항목1</label><input type="text" onChange={(e) => { setColoTitle1(e.target.value) }} /></div>
                        <div><label>항목2</label><input type="text" onChange={(e) => { setColoTitle2(e.target.value) }} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
} export default BoardEnrollForm;