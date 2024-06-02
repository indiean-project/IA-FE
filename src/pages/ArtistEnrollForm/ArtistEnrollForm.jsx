import './ArtistEnrollForm.scss'
import FundInputBar from '../../components/FundInputBar';
import { BsExclamationCircle } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { PlusSquareFill, XCircleFill } from 'react-bootstrap-icons';
import { imgDelete, tempImg, imgMove } from '../../apis/imgFilter';
import ArtistEditor from '../../components/ArtistEditor/ArtistEditor';
import { loginUserState } from '../../recoil/LoginUser';
import { useRecoilState, useRecoilValue } from 'recoil';
import { artistEnroll } from '../../apis/artist/artist';
import { imgEnroll } from '../../apis/imgUrl';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { tempImgState } from '../../recoil/tempImgStorage';


function ArtistEnrollForm() {

    const [bossImg, setBossImg] = useState(['']);
    const navigate = useNavigate()
    const loginUserInfo = useRecoilValue(loginUserState);
    const [artistForm, setArtistForm] = useState({
        userNo: loginUserInfo.userNo,
        artistName: '',
        debutDate: '',
        musicCategory: '',
        artistInfo: '',
        artistStatus: 'N',
        instagramLink: '',
        youtubeLink: ''
    })
    const [tempImgStorage, setTempImgStorage] = useRecoilState(tempImgState)

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    })

    const handleBeforeUnload = async (e) => {
        let list = new Array();
        bossImg.forEach((item) => {
            if (item != '') list.push(item);
        })
        await imgDelete(list);
    };

    useEffect(() => {
        let bList = [...bossImg]
        setTempImgStorage({
            ...tempImgStorage,
            ["bossImg"]: bList
        }
        )
    }, [bossImg])

    const onClickSubmit = async () => {
        if (artistForm.artistName.trim() == '') {
            toast.error("아티스트명을 입력해주세요");
            return;
        }
        if (artistForm.debutDate.trim() == '') {
            toast.error("데뷔일 입력해주세요");
            return;
        }
        if (artistForm.musicCategory.trim() == '') {
            toast.error("음악장르를 입력해주세요");
            return;
        }
        if (artistForm.artistInfo.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/<br>/g, "").trim()  == '') {
            toast.error("아티스트 소개를 입력해주세요");
            return;
        }
        if (artistForm.youtubeLink.indexOf('www.youtube.com') === -1 && artistForm.youtubeLink.trim() != '') {
            toast.error("잘못된 주소 입니다.");
            return;
        }
        if (artistForm.instagramLink.indexOf('www.instagram.com') === -1 && artistForm.instagramLink.trim() != '') {
            toast.error("잘못된 주소 입니다.");
            return;
        }
        const result = await artistEnroll(artistForm);
        const newImgUrl = await imgMove(bossImg)
        if (newImgUrl != undefined && newImgUrl.data.length > 0) {
            await imgEnroll({
                contentNo: result.data,
                imgUrlList: newImgUrl.data,
                fabcTypeEnum: "ARTIST",
                kcTypeEnum: "KING"
            });
        }
        toast.success('신청되셨습니다.')
        navigate('/artist');


    }

    const onChangeArtistForm = (e) => {
        setArtistForm({
            ...artistForm,
            [e.target.name]: e.target.value
        })
    }
    const imageDelete = async (img, idx) => {
        let list = new Array();
        list.push(img);
        await imgDelete(list);
        let resetList = [...bossImg];
        resetList[idx] = '';
        setBossImg(resetList);
    }
    const imageHandler = (idx) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);
            const result = await tempImg(formData); // 이미지 임시 저장
            let list = [...bossImg];
            list[idx] = result.data;
            setBossImg(list);
        }
    }

    const onEditorChange = (content) => {
        setArtistForm({
            ...artistForm,
            artistInfo: content
        })

    }
    useEffect(() => {

    }, [bossImg, artistForm])

    return (
        <div className='artistEnrollForm'>
            <div>
                <div className='alert__area'>
                    <span><BsExclamationCircle size={40} /></span><span>관리자 승인후 등록됩니다.</span>
                </div>
                <div className='artistEnrollForm__header'>
                    <h1>아티스트 신청</h1>
                </div>
                <div className='line__area'><hr /></div>
                <div className='artistEnrollForm__list__box'>
                    <div className='artistEnrollForm__list'>
                        <div className='artistEnrollFrom__item'>
                            <h1>아티스트 명</h1>
                            <FundInputBar width={"60%"}
                                name={'artistName'}
                                maxlength={50}
                                value={artistForm.artistName}
                                onChangeValue={onChangeArtistForm}
                            />
                        </div>
                        <div className='artistEnrollFrom__item'>
                            <h1>아티스트 데뷔일</h1>
                            <FundInputBar width={"40%"}
                                name={'debutDate'}
                                type={'date'}
                                value={artistForm.debutDate}
                                onChangeValue={onChangeArtistForm}
                            />
                        </div>
                        <div className='artistEnrollFrom__item'>
                            <h1>음악 장르</h1>
                            <FundInputBar width={"60%"}
                                name={'musicCategory'}
                                maxlength={50}
                                value={artistForm.musicCategory}
                                onChangeValue={onChangeArtistForm}
                            />
                        </div>
                    </div>
                    <div className="artistEnrollFrom__img">
                        <h1>대표 이미지</h1>
                        {bossImg.map((img, idx) => {
                            return (
                                <>
                                    {img != '' ?
                                        <div className='artistEnrollForm__img__input' onClick={() => imageDelete(img, idx)} key={inx}>
                                            <img src={img} />
                                            <div className='delete__icon'>
                                                <div className='delete__background'></div>
                                                <XCircleFill size={35} />
                                            </div>
                                        </div>
                                        : <div className='artistEnrollForm__img__input' onClick={() => imageHandler(idx)}>
                                            <PlusSquareFill size={35} key={idx} />
                                        </div>}
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className='artistInfo__EnrollForm'>
                    <h1>아티스트 소개 입력</h1>
                    <ArtistEditor onEditorChange={onEditorChange} />
                </div>
                <div className='linkList'>
                    <div className='artistEnrollFrom__item'>
                        <h3>Instagram Link</h3>
                        <FundInputBar width={"80%"}
                            name={'instagramLink'}
                            maxlength={100}
                            value={artistForm.instagram}
                            onChangeValue={onChangeArtistForm}
                        />
                    </div>
                    <div className='artistEnrollFrom__item'>
                        <h3>youtube Link</h3>
                        <FundInputBar width={"80%"}
                            name={'youtubeLink'}
                            value={artistForm.youtube}
                            onChangeValue={onChangeArtistForm}
                            maxlength={100}
                        />
                    </div>
                </div>
                <div className='artistEnrollForm__submit'>
                    <div className='artistEnrollForm__submit__btn' onClick={() => onClickSubmit()}>신청서 제출</div>
                </div>
            </div>
        </div>
    )
} export default ArtistEnrollForm 