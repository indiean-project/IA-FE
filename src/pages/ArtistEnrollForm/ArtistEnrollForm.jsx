import './ArtistEnrollForm.scss'
import FundInputBar from '../../components/FundInputBar';
import { BsExclamationCircle } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { PlusSquareFill, XCircleFill } from 'react-bootstrap-icons';
import { imgDelete, tempImg,imgMove } from '../../apis/imgFilter';
import ArtistEditor from '../../components/ArtistEditor/ArtistEditor';
import { loginUserState } from '../../recoil/LoginUser';
import { useRecoilValue } from 'recoil';
import { artistEnroll } from '../../apis/artist/artist';
import { imgEnroll } from '../../apis/imgUrl';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ArtistEnrollForm() {
    const navigate = useNavigate()
    const loginUserInfo = useRecoilValue(loginUserState);
    const [artistFrom, setArtistFrom] = useState({
        userNo: loginUserInfo.userNo,
        artistName: '',
        debutDate: '',
        musicCategory: '',
        artistInfo: '',
        artistStatus: 'N',
        instagram: '',
        youtube: ''
    })
    const onClickSubmit = async () => {
        if (artistFrom.artistName.trim() == '') {
            toast.error("아티스트명을 입력해주세요");
            return;
        }
        if (artistFrom.debutDate.trim() == '') {
            toast.error("데뷔일 입력해주세요");
            return;
        }
        if (artistFrom.musicCategory.trim() == '') {
            toast.error("음악장르를 입력해주세요");
            return;
        }
        if (artistFrom.artistInfo.trim() == '') {
            toast.error("아티스트 소개를 입력해주세요");
            return;
        }
        const result = await artistEnroll(artistFrom);
        const newImgUrl = await imgMove(bossImg)
        if (newImgUrl!= undefined&&newImgUrl.data.length > 0) {
            imgEnrollResult = await imgEnroll({
                contentNo:  result.data,
                imgUrlList: newImgUrl.data,
                fabcTypeEnum: "ARTIST",
                kcTypeEnum:"KING"
            });
        }
        toast.success('신청되셨습니다.')
        navigate('/artist');
        

    }

    const onChangeArtistForm = (e) => {
        setArtistFrom({
            ...artistFrom,
            [e.target.name]: e.target.value
        })
    }
    const [bossImg, setBossImg] = useState(['']);
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
    const [artistInfoImgList, setArtistInfoImgList] = useState([]);
    const onEditorChange = (content) => {
        setArtistFrom({
            ...artistFrom,
            artistInfo: content
        })

    }
    useEffect(() => {

    }, [bossImg, artistFrom])

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
                                value={artistFrom.artistName}
                                onChangeValue={onChangeArtistForm}
                            />
                        </div>
                        <div className='artistEnrollFrom__item'>
                            <h1>아티스트 데뷔일</h1>
                            <FundInputBar width={"40%"}
                                name={'debutDate'}
                                type={'date'}
                                value={artistFrom.debutDate}
                                onChangeValue={onChangeArtistForm}
                            />
                        </div>
                        <div className='artistEnrollFrom__item'>
                            <h1>음악 장르</h1>
                            <FundInputBar width={"60%"}
                                name={'musicCategory'}
                                value={artistFrom.musicCategory}
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
                                        <div className='artistEnrollForm__img__input' onClick={() => imageDelete(img, idx)}>
                                            <img src={'../public/tempImg/' + img} />
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
                            name={'instagram'}
                            value={artistFrom.instagram}
                            onChangeValue={onChangeArtistForm}
                        />
                    </div>
                    <div className='artistEnrollFrom__item'>
                        <h3>youtube Link</h3>
                        <FundInputBar width={"80%"}
                            name={'youtube'}
                            value={artistFrom.youtube}
                            onChangeValue={onChangeArtistForm}
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