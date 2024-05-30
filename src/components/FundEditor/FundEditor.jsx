import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FundEditor.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { tempImg } from '../../apis/imgFilter';
import toast from 'react-hot-toast';

function FundEditor({ onEditorChange, FACheck, imgList, setImgList }) {

    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [contentByte, setContentByte] = useState(0);

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
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const handleChange = (text) => {
        let num = 0;
        for (let i = 0; i < text.length; i++) {
            text.charCodeAt(i) > 127 ? num += 3 : num++;
        }
        setContentByte(num);
        if (contentByte >= 4000 && content.length < text.length) {
            toast.error('입력 가능한 글자수를 초과하였습니다.')
            setContent(content);
            return;
        }
        setContent(text);
    };

    useEffect(() => {
        onEditorChange(content, FACheck);
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
        <div className='fundEditor__container'>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleChange}
                ref={quillRef}
            />
            <div className='byteCheck'>byte : {contentByte} / 4000</div>
        </div>
    );
}
export default FundEditor;