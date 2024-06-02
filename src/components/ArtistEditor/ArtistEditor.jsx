import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ArtistEditor.scss'
import { useMemo, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';


function ArtistEditor({ onEditorChange, contentByte, setContentByte }) {

    const [content, setContent] = useState('');
    const quillRef = useRef();

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
        setContentByte(num);
        if (contentByte >= 4000 && content.length < text.length) {
            toast.error('입력 가능한 글자수를 초과하였습니다.')
            console.log(quillRef.current)
            setContent(content);
            return;
        }
        setContent(text);
    };
    useEffect(() => {
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
                    ['link'],
                    ['clean']
                ]

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
            <div className='byteCheck'>byte : {contentByte} / 4000</div>
        </div>
    )
} export default ArtistEditor