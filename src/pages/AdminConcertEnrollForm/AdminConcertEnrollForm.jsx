import './AdminConcertEnrollForm.scss'

import FundInputBar from '../../components/FundInputBar';
import { BsExclamationCircle } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react';
import { PlusSquareFill, XCircleFill } from 'react-bootstrap-icons';
import { imgDelete, tempImg, imgMove } from '../../apis/imgFilter';
import { loginUserState } from '../../recoil/LoginUser';
import { useRecoilValue } from 'recoil';
import { imgEnroll } from '../../apis/imgUrl';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConcertEditor from '../../components/ConcertEditor';
import { searchArtistList } from '../../apis/admin'
import ArtistTipLi from '../../components/ArtistTipLi';

function AdminConcertEnrollForm() {
    const navigate = useNavigate()
    const inputRef = useRef();
    const [lineup, setLineup] = useState([]);
    const [isDrobBox, setIsDropbox] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [concertForm, setConcertForm] = useState({
        concertTitle: '',
        startDate: '',
        endDate: '',
        concertInfo: '',
        concertPrice: '',
        location: '',
        ticketUrl: ''
    })
    useEffect(() => {
        const handleClickOutside = (e) => {

            if (
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setIsDropbox(false);
            }
        };
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);
    const [artistSearchVal, setArtistSearchVal] = useState('')
    const [artistSearch, setArtistSearch] = useState(['a', 'b', 'c']);
    const [concertInfoImg, setConcertInfoImg] = useState([]);
    const onClickSubmit = async () => {
        // if (artistFrom.artistName.trim() == '') {
        //     toast.error("아티스트명을 입력해주세요");
        //     return;
        // }
        // if (artistFrom.debutDate.trim() == '') {
        //     toast.error("데뷔일 입력해주세요");
        //     return;
        // }
        // if (artistFrom.musicCategory.trim() == '') {
        //     toast.error("음악장르를 입력해주세요");
        //     return;
        // }
        // if (artistFrom.artistInfo.trim() == '') {
        //     toast.error("아티스트 소개를 입력해주세요");
        //     return;
        // }
        // const result = await artistEnroll(artistFrom);
        // const newImgUrl = await imgMove(bossImg)
        // if (newImgUrl != undefined && newImgUrl.data.length > 0) {
        //     await imgEnroll({
        //         contentNo: result.data,
        //         imgUrlList: newImgUrl.data,
        //         fabcTypeEnum: "ARTIST",
        //         kcTypeEnum: "KING"
        //     });
        // }
        // toast.success('콘서트 등록이 성공적으로 완료되었습니다.')
        // navigate('/concert');
    }
    const onChangeConcertForm = (e) => {
        setConcertForm({
            ...concertForm,
            [e.target.name]: e.target.value
        })
    }
    const artistSearchList = async () => {
        const artist = await searchArtistList()
        setIsDropbox(true);
        setArtistSearch(artist)
    }
    const handleDropDownClick = (artist) => {

        let copyLineup = lineup
        console.log(artist)
        setLineup(...copyLineup, artist);
        setIsDropbox(false);
        setSelected(-1);
        setArtistSearchVal('')
    };
    useEffect(() => {
        
        if (artistSearchVal.trim() != '') {
            //artistSearchList()
        }
    }, [artistSearchVal])
    const onChangeLindupForm = (e) => {

    }

    const onChangeArtist = (e) => {
        setIsDropbox(true);
        setArtistSearchVal(e.target.value);

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
    const onEditorChange = (content) => {
        setConcertForm({
            ...concertForm,
            concertInfo: content
        })

    }
    useEffect(() => {

    }, [bossImg, concertForm, lineup, selected])
    const deleteArtist = () =>{
        
    }
    return (
        <div className='concertEnrollForm'>
            <div>
                <div className='alert__area'>
                    <span><BsExclamationCircle size={40} /></span><span>콘서트 등록 페이지입니다.</span>
                </div>
                <div className='concertEnrollForm__header'>
                    <h1>콘서트 등록</h1>
                </div>
                <div className='line__area'><hr /></div>
                <div className='concertEnrollForm__list__box'>
                    <div className='concertEnrollForm__list'>
                        <div className='concertEnrollFrom__item'>
                            <h1>CONCERT TITLE</h1>
                            <FundInputBar width={"60%"}
                                name={'concertTitle'}
                                value={concertForm.concertTitle}
                                onChangeValue={onChangeConcertForm}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 시작일</h1>
                            <FundInputBar width={"40%"}
                                name={'startDate'}
                                type={'date'}
                                value={concertForm.startDate}
                                onChangeValue={onChangeConcertForm}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 종료일</h1>
                            <FundInputBar width={"40%"}
                                name={'endDate'}
                                type={'date'}
                                value={concertForm.endDate}
                                onChangeValue={onChangeConcertForm}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 가격</h1>
                            <FundInputBar width={"60%"}
                                name={'concertPrice'}
                                value={concertForm.concertPrice}
                                onChangeValue={onChangeConcertForm}
                            />
                        </div>
                    </div>
                    <div className="concertEnrollFrom__img">
                        <h1>콘서트 포스터</h1>
                        {bossImg.map((img, idx) => {
                            return (
                                <>
                                    {img != '' ?
                                        <div className='concertEnrollForm__img__input' onClick={() => imageDelete(img, idx)}>
                                            <img src={'../public/tempImg/' + img} />
                                            <div className='delete__icon'>
                                                <div className='delete__background'></div>
                                                <XCircleFill size={35} />
                                            </div>
                                        </div>
                                        : <div className='concertEnrollForm__img__input' onClick={() => imageHandler(idx)}>
                                            <PlusSquareFill size={35} key={idx} />
                                        </div>}
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className='concertInfo__EnrollForm'>
                    <h1>콘서트 소개 입력</h1>
                    <ConcertEditor onEditorChange={onEditorChange} imgList={concertInfoImg}
                        setImgList={setConcertInfoImg} />
                </div>
                <div className='concert__lineup' ref={inputRef}>
                    <h1>라인업 등록</h1>
                    <div>
                        <div className='lineup__input__container'>
                            <input className='lineup__input' value={artistSearchVal} placeholder='뮤지션 이름을 입력하세요' onChange={(e) => { onChangeArtist(e) }}></input>
                        </div>
                        {isDrobBox && (
                            <ul>
                                {artistSearch.map((artist, idx) => (<ArtistTipLi
                                    key={idx}
                                    selected={selected}
                                    setSelected={setSelected}
                                    idx={idx}
                                    handleDropDownClick={handleDropDownClick}
                                    item={artist}
                                />))}
                            </ul>
                        )}
                    </div>
                    <div className='addLineup'>

                        {<div className='add__artist__container'>
                            <div className='add__artist'>
                                <span>이름주루루루루루루루</span>
                                <div className='artist__delete__bnt' onClick={()=>{()=>deleteArtist(idx)}}>
                                    <XCircleFill size={35} />
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='linkList'>
                    <div className='concertEnrollFrom__item'>
                        <h3>콘서트 티켓판매 링크가 있다면 입력해주세요.</h3>
                        <FundInputBar width={"80%"}
                            name={'ticketUrl'}
                            value={concertForm.ticketUrl}
                            onChangeValue={onChangeConcertForm}
                        />
                    </div>
                </div>
                <div className='concertEnrollForm__submit'>
                    <div className='concertEnrollForm__submit__btn' onClick={() => onClickSubmit()}>등록</div>
                </div>
            </div>
        </div>
    )
} export default AdminConcertEnrollForm