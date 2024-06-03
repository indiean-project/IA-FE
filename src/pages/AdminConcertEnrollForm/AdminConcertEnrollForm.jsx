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
import { searchArtistList } from '../../apis/artist/artist';
import ArtistTipLi from '../../components/ArtistTipLi';
import moment from 'moment';
import { concertEnroll } from '../../apis/concert/concertDetail';

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
        runtime: '',
        location: '',
        ticketUrl: '',
        concertLineupList:''
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
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);
    const [artistSearchVal, setArtistSearchVal] = useState('')
    const [artistSearch, setArtistSearch] = useState();
    const [concertInfoImg, setConcertInfoImg] = useState([]);
    const onClickSubmit = async () => {
        if (concertForm.concertTitle.trim() == '') {
            toast.error("콘서트 타이틀을 입력해주세요");
            return;
        }
        if (concertForm.startDate === '' || concertForm.endDate === '') {
            toast.error("콘서트 기간을 입력해주세요");
            return;
        }
        if (concertForm.location.trim() == '') {
            toast.error("장소를 입력해주세요");
            return;
        }
        if (concertForm.concertInfo.trim() == '') {
            toast.error("콘서트 소개를 입력해주세요");
            return;
        }
        if(lineup.length===0){
            toast.error('라인업을 등록해주세요.');
            return;
        }
        
        let num = 0;
        for (let i = 0; i < concertForm.concertInfo.length; i++) {
            concertForm.concertInfo.charCodeAt(i) > 127 ? num += 3 : num++;
        }
        if (num > 4000) {
            toast.error('입력 가능한 글자 수를 초과하였습니다.');
            return;
        }
        let concert = {
            ...concertForm,
            concertLineupList: lineup
          
        };
        let moveList = new Array();
        let deleteList = new Array();
        const result = await concertEnroll(concert);
        
        if (result.status === "SUCCESS") {
            concertInfoImg.forEach((item) => {
                concertForm.concertInfo.indexOf(item) != -1 ? moveList.push(item) : deleteList.push(item);
            })
            deleteList.length > 0 && await imgDelete(deleteList);
            let Cimg = moveList.length > 0 && await imgMove(moveList);
            let Kimg = await imgMove(bossImg)
            const imgResult = await imgEnroll({
                contentNo: result['data'],
                imgUrlList: Kimg['data'],
                fabcTypeEnum: 'CONCERT',
                kcTypeEnum: 'KING'
            })
            Cimg != false && await imgEnroll({
                contentNo: result['data'],
                imgUrlList: Cimg['data'],
                fabcTypeEnum: 'CONCERT',
                kcTypeEnum: 'CONTENT'
            });
            if (result.status === 'SUCCESS' && imgResult.status === 'SUCCESS') {
                toast.success('콘서트를 정상적으로 등록하였습니다.');
                navigate('/concert', { replace: true });
            }

        }else {
            toast.error('콘서트 등록에 실패하였습니다.');
        }

    }
    const onChangeConcertForm = (e) => {
        if (e.target.name === 'concertPrice' && parseInt(e.target.value) >= 1000000) {
            return;
        }
        setConcertForm({
            ...concertForm,
            [e.target.name]: e.target.name === 'concertPrice' ? e.target.value.replace(/[^0-9.]/g, '') : concertForm[e.target.name] === '' ? e.target.value.trim() : e.target.value

        })
    }
    const artistSearchList = async (text) => {
        const artist = await searchArtistList(text)
        setIsDropbox(true);
        setArtistSearch(artist.data)
    }
    const handleDropDownClick = (artist) => {
        let artistVal = {
            artistNo:artist.artistNo,
            artistName:artist.artistName,
            concertNo: ''
        }
        setLineup([...lineup, artistVal])
        setIsDropbox(false);
        setSelected(-1);
        setArtistSearchVal('')
    };

    const searchTextList = (e) => {
        if (e.target.value.trim() !== '') {
            artistSearchList(e.target.value)
        }
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
    const undefindeArtist = (unknown) => {
        let unknownArtist = {
            artistName: unknown,
            artistNo: '',
            concertNo: ''
        }
        setLineup([...lineup, unknownArtist])
        setIsDropbox(false);
        setSelected(-1);
        setArtistSearchVal('')
    }
    const onEditorChange = (content) => {
        setConcertForm({
            ...concertForm,
            concertInfo: content
        })

    }
    useEffect(() => {

    }, [bossImg, concertForm, lineup, selected])
    const deleteArtist = (point) => {
        let array = lineup
        setLineup(array.filter((_, idx) => {
            return idx !== point
        }))
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
                                maxlength={100}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 시작일</h1>
                            <FundInputBar width={"40%"}
                                name={'startDate'}
                                type={'date'}
                                value={concertForm.startDate}
                                onChangeValue={onChangeConcertForm}
                                min={moment(new Date()).format('YYYY-MM-DD')}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 종료일</h1>
                            <FundInputBar width={"40%"}
                                name={'endDate'}
                                type={'date'}
                                value={concertForm.endDate}
                                onChangeValue={onChangeConcertForm}
                                min={moment(new Date(concertForm.startDate)).format('YYYY-MM-DD')}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 가격</h1>
                            <FundInputBar width={"60%"}
                                type={'text'}
                                name={'concertPrice'}
                                value={concertForm.concertPrice}
                                onChangeValue={onChangeConcertForm}
                                min={0}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 러닝타임</h1>
                            <FundInputBar width={"60%"}
                                type={'text'}
                                name={'runtime'}
                                value={concertForm.runtime}
                                onChangeValue={onChangeConcertForm}
                                maxlength={10}
                            />
                        </div>
                        <div className='concertEnrollFrom__item'>
                            <h1>콘서트 장소</h1>
                            <FundInputBar width={"60%"}
                                type={'text'}
                                name={'location'}
                                value={concertForm.location}
                                onChangeValue={onChangeConcertForm}
                                maxlength={100}
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
                                            <img src={img} />
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
                        <div className='lineup__input__container' >
                            <input className='lineup__input' value={artistSearchVal} placeholder='뮤지션 이름을 입력하세요' onChange={(e) => { onChangeArtist(e), searchTextList(e) }}></input>
                        </div>
                        {isDrobBox && (
                            <ul>
                                {artistSearch && artistSearch.map((artist, idx) => (<ArtistTipLi
                                    key={idx}
                                    selected={selected}
                                    setSelected={setSelected}
                                    idx={idx}
                                    handleDropDownClick={handleDropDownClick}
                                    artist={artist}
                                />))}
                                <li className='undefined__artist' onClick={() => undefindeArtist(artistSearchVal)} >검색기록에 존재하지 않는 {artistSearchVal}를 등록하시겠습니까?</li>
                            </ul>
                        )}

                    </div>
                    <div className='addLineup'>

                        {(lineup != "") && (
                            lineup.map((artist, idx) => {
                                return (
                                    <div className='add__artist__container'>
                                        <div className='add__artist'>
                                            <span>{artist.artistName}</span>
                                            <div className='artist__delete__bnt' onClick={() => deleteArtist(idx)}>
                                                <XCircleFill size={35} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
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