import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ArtistEditor.scss'
import { imgDelete, imgMove, tempImg } from '../../apis/imgFilter';
import { useMemo, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function ArtistEditor({onEditorChange, imgList, setImgList}) {
    
    const [content, setContent] = useState('');
    const quillRef = useRef();
   
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
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    const handleChange = (content) => {
        setContent(content);
    };
    useEffect(()=>{
        onEditorChange(content);
    }, [content])
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

    return (
        <div className='artistEditor__container'>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleChange}
                ref={quillRef}
            />
        </div>
    )
} export default ArtistEditor