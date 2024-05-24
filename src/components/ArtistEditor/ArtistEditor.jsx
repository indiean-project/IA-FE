import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ArtistEditor.scss'
import { useMemo, useRef, useState, useEffect } from 'react';


function ArtistEditor({ onEditorChange }) {

    const [content, setContent] = useState('');
    const quillRef = useRef();


    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];
    const handleChange = (content) => {
        setContent(content);
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
        </div>
    )
} export default ArtistEditor