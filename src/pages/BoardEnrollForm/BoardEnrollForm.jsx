import ReactQuill from 'react-quill';
import './BoardEnrollForm.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { imgDelete, imgMove, tempImg } from '../../apis/imgFilter';
import { BoardEnroll, ColoEnroll } from '../../apis/board';
import { imgEnroll } from '../../apis/imgUrl';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { boardPoint } from '../../recoil/boardPoint';
import { loginUserState } from '../../recoil/LoginUser';

function BoardEnrollForm() {
    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [imgList, setImgList] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [voteInput, setVoteInput] = useState('close');
    const [coloTitle1, setColoTitle1] = useState('');
    const [coloTitle2, setColoTitle2] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [byte, setByte] = useState(0);

    useEffect(() => {
        const categoryState = location.state.category === "자유게시판" ? "FREE" : location.state.category === "콜로세움" ? "COLO" : "PROUD";
        setCategory(categoryState);
        if (location.state.boardItem !== undefined) {
            const item = location.state.boardItem;
            setTitle(item.boardTitle);
            setContent(item.boardContent);
            location.state.boardCategory === "free" ? setCategory("FREE") :
                location.state.boardCategory === "proud" ? setCategory("PROUD") :
                    location.state.boardCategory === "colo" ? setCategory("COLO") : "";
            if (location.state.boardCategory === "colo") {
                setVoteInput("open");
                setColoTitle1(item.colLeftTitle);
                setColoTitle2(item.colRightTitle);
            }
            let byte = 0;
            for (let i = 0; i < item.boardContent.length; i++) {
                item.boardContent.charCodeAt(i) > 127 ? byte += 3 : byte++;
            }
            setByte(byte);
        }
    }, [location.state])

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

            let imgTag = `<img src="/public/tempImg/${result.data}" alt="${result.data}"/>`;

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
        'link', 'image'
    ];

    const handleChange = (content) => {
        setContent(content);
        let byte = 0;
        for (let i = 0; i < content.length; i++) {
            content.charCodeAt(i) > 127 ? byte += 3 : byte++;
        }
        setByte(byte);
    };

    const enroll = async () => {
        let moveList = [];
        let deleteList = [];
        let trimTitle;
        let imgResult;
        let coloResult;
        let result;
        let success;
        let colstate;

        if (title.trim() === "") {
            toast.error("제목을 입력해주세요.");
            return
        } else if (content.substring(3, content.length - 4).trim() === "" || content.substring(3, content.length - 4).trim() === "<br>") {
            toast.error("내용을 입력해주세요.");
            return
        }

        if (category === 'COLO') {
            if (coloTitle1 === '' && coloTitle2 === '') {
                toast.error("콜로세움 게시판은 투표를 만들어야 작성 가능합니다.");
                return
            }
            if (byte > 500) {
                toast.error("글자수가 넘어갔습니다.");
                return
            }
        } else {
            if (byte > 4000) {
                toast.error("글자수가 넘어갔습니다.");
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

        result = await BoardEnroll(
            location.state.boardItem !== undefined ? {
                boardNo: location.state.boardItem.boardNo,
                boardContent: content,
                boardTitle: trimTitle,
                contentTypeNo: category,
                member: {
                    userNo: loginUser.userNo
                }
            } :
                {
                    boardContent: content,
                    boardTitle: trimTitle,
                    contentTypeNo: category,
                    member: {
                        userNo: loginUser.userNo
                    }
                }
        );

        result.data[1] === 'COLO' && location.state.boardItem === undefined ? coloResult = await ColoEnroll({
            colLeftTitle: coloTitle1,
            colRightTitle: coloTitle2,
            board: {
                boardNo: result.data[0]
            }
        }) : result.data[1] === 'COLO' && location.state.boardItem !== undefined ? colstate = "SUCCESS" : success = result.status;

        if (imgResult.data.length > 0) {
            imgEnroll({
                contentNo: result.data[0],
                imgUrlList: imgResult.data,
                fabcTypeEnum: "BOARD",
                kcTypeEnum: "CONTENT"
            });

        }

        if (success === 'SUCCESS') {
            if (category === "FREE") {
                setBoardCategory("free");
                navigate("/board/detail/" + result.data[0]);
            } else if (category === "PROUD") {
                setBoardCategory("proud");
                navigate("/board/detail/" + result.data[0]);
            }
            location.state.boardItem !== undefined ? toast.success('수정 완료') : toast.success('작성 완료');
        } else if ((coloResult !== undefined && coloResult.status === "SUCCESS") || colstate === "SUCCESS") {
            location.state.boardItem !== undefined ? toast.success('수정 완료') : toast.success('작성 완료');
            navigate("/board/colo", { state: { state: "SUCCESS" } });
        } else {
            toast.error('작성 실패');
        }
    }

    function voteState() {
        voteInput === 'close' ? setVoteInput('open') : setVoteInput('close');
    }

    return (
        <div className="boardEnrollForm__container">
            <div className='boardEnrollForm__box'>
                <label>커뮤니티 글쓰기</label>
                <div>
                    <select value={category} onChange={(e) => { setCategory(e.target.value) }} disabled={location.state.boardItem !== undefined ? true : false}>
                        <option value="FREE">자유 게시판</option>
                        <option value="PROUD">아티스트 자랑하기</option>
                        <option value="COLO">콜로세움</option>
                    </select>
                </div>
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
                    <div className='boardEnrollForm__byte'><div>byte : {byte} / {category==="COLO" ? 500 : 4000}</div></div>
                    <div className='boardEnrollForm__items'>
                        <button className={category === 'COLO' ? 'displayNone' : ''} onClick={imageHandler}>이미지 첨부</button>
                        <button className={category === 'COLO' ? '' : 'displayNone'} onClick={voteState}>투표</button>
                        <button onClick={enroll}>등록</button>
                    </div>
                    <div className={voteInput === 'open' ? 'boardEnrollForm__insert__vote' : 'displayNone'}>
                        <div><label>항목1</label><input type="text" onChange={(e) => { setColoTitle1(e.target.value) }}
                            value={coloTitle1} readOnly={location.state.boardItem !== undefined ? true : false} /></div>

                        <div><label>항목2</label><input type="text" onChange={(e) => { setColoTitle2(e.target.value) }}
                            value={coloTitle2} readOnly={location.state.boardItem !== undefined ? true : false} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
} export default BoardEnrollForm;