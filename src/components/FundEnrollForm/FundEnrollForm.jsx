import { useEffect, useState } from 'react';
import FundInputBar from '../FundInputBar';
import './FundEnrollForm.scss';
import { PencilSquare, PlusSquareFill, Trash3, Trash3Fill, XCircleFill, XSquareFill } from 'react-bootstrap-icons';
import FundEditor from '../FundEditor/FundEditor';
import { imgDelete, imgMove, tempImg } from '../../apis/imgFilter';
import SelectBar from '../SelectBar/SelectBar';
import { fundEnroll } from '../../apis/fund/fund';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import moment from 'moment';

function FundEnrollForm({ nav, navRef }) {
    const loginUserInfo = useRecoilValue(loginUserState);
    const [fundForm, setFundForm] = useState({
        userNo: loginUserInfo.userNo,
        fundTitle: '',
        fundDescription: '',
        target: '',
        category: '선택',
        startDate: '',
        endDate: '',
        fundInfo: '',
        artistInfo: '',
        budgetInfo: '',
        scheduleInfo: ''
    });
    const [rewardForm, setRewardForm] = useState({
        rewardName: '',
        rewardPrice: '',
        rewardInfo: '',
        deliveryYn: 'N',
        limitYn: 'N',
        limitAmount: ''
    })
    const [rewardList, setRewardList] = useState([]);
    const [addReward, setAddReward] = useState(false);
    const [fundInfoImgList, setFundInfoImgList] = useState([]);
    const [artistInfoImgList, setArtistInfoImgList] = useState([]);
    const [bossImg, setBossImg] = useState(['', '', '', '', '']);

    const category = [
        {label:'공연', value: 'CONCERT'},
        {label:'굿즈', value: 'GOODS'},
        {label:'앨범', value: 'ALBUM'},
        {label:'팬미팅', value: 'FANMEETING'},
    ]

    const onChangeFundForm = (e) => {
        setFundForm({
            ...fundForm,
            [e.target.name]: e.target.value
        })
    }
    const onChangeRewardForm = (e) => {
        setRewardForm({
            ...rewardForm,
            [e.target.name]: e.target.value
        })
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
    const imageDelete = async (img, idx) => {
        let list = new Array();
        list.push(img);
        await imgDelete(list);

        let resetList = [...bossImg];
        resetList[idx] = '';
        setBossImg(resetList);
    }
    const onClickRewardBtn = (check, yn) => {
        check ? setRewardForm({ ...rewardForm, limitYn: yn })
            : setRewardForm({ ...rewardForm, deliveryYn: yn });
    }
    const onClickRewardSubmit = (check) => {
        if (check) {
            let list = [...rewardList];
            list.push(rewardForm);
            setRewardList(list);
        }
        setRewardForm({
            rewardName: '',
            rewardPrice: '',
            rewardInfo: '',
            deliveryYn: 'N',
            limitYn: 'N',
            limitAmount: ''
        })
        setAddReward(false);
    }
    const onClickDeleteReward = (idx) => {
        let list = [...rewardList];
        list.splice(idx, 1);
        setRewardList(list);
    }

    const onEditorChange = (content, FACheck) => {
        if (FACheck === 'F') {
            setFundForm({
                ...fundForm,
                fundInfo: content
            })
        } else {
            setFundForm({
                ...fundForm,
                artistInfo: content
            })
        }
    }

    const onChangeCategory = (item)=>{
        setFundForm({
            ...fundForm,
            category: item
        })
    }

    const onClickSubmit = async()=>{
        let moveList = new Array();
        let deleteList = new Array();
        let bossImgList = new Array();

        fundInfoImgList.forEach((item)=>{
            fundForm.fundInfo.indexOf(item) != -1? moveList.push(item) : deleteList.push(item);
        })
        artistInfoImgList.forEach((item)=>{
            fundForm.artistInfo.indexOf(item) != -1? moveList.push(item) : deleteList.push(item);
        })
        bossImg.filter((item)=>item != '').forEach((item)=>{
            bossImgList.push(item);
        })

        // moveList.length > 0 && await imgMove(moveList);
        // deleteList.length > 0 && await imgDelete(deleteList);
        // await imgMove(bossImgList);
        
        let paymentDate = new Date(fundForm.endDate);
        paymentDate.setDate(paymentDate.getDate() + 1);

        let fund = {
            ...fundForm,
            reward: rewardList,
            paymentDate: moment(paymentDate).format('YYYY-MM-DD')
        };
        const result = await fundEnroll(fund);
        console.log(fund);
        console.log(result);
    }

    useEffect(() => {
        
    }, [bossImg, rewardList, fundForm])

    return (
        <div className='fundEnrollForm__container'>
            <div className='fundEnrollForm__header'>
                <h1>펀딩 신청</h1>
            </div>
            <div id={nav[0].id} ref={(e) => (navRef.current[0] = e)} className='fundEnrollForm__fundForm form'>
                <hr />
                <h2>프로젝트 소개</h2>
                <div className='fundEnrollForm__item'>
                    <h3>카테고리</h3>
                    <SelectBar list={category} onChangeValue={onChangeCategory} />
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>프로젝트 제목</h3>
                    <FundInputBar width={"99%"}
                        paddingLeft={"5px"}
                        name={'fundTitle'}
                        value={fundForm.fundTitle}
                        onChangeValue={onChangeFundForm}
                    />
                </div>
                <div className='fundEnrollForm__item'>
                    <div>
                    <h3>프로젝트 설명</h3><p>*썸네일에 제목과 함께 노출되는 문구입니다.</p>
                    </div>
                    <FundInputBar width={"99%"}
                        paddingLeft={"5px"}
                        name={'fundDescription'}
                        value={fundForm.fundDescription}
                        onChangeValue={onChangeFundForm}
                    />
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>목표 펀딩 금액</h3>
                    <div className='fundEnrollForm__input'>
                        <FundInputBar width={"30%"}
                            type={'number'}
                            paddingLeft={"5px"}
                            name={'target'}
                            value={fundForm.target}
                            onChangeValue={onChangeFundForm}
                        />
                        <p>원</p>
                    </div>
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>펀딩 종류 선택</h3>
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>펀딩 기간</h3>
                    <div className='fundEnrollForm__input'>
                        <FundInputBar width={"20%"}
                            type={'date'}
                            paddingLeft={"5px"}
                            name={'startDate'}
                            value={fundForm.startDate}
                            onChangeValue={onChangeFundForm}
                        />
                        <p>부터</p>
                        <FundInputBar width={"20%"}
                            type={'date'}
                            paddingLeft={"5px"}
                            name={'endDate'}
                            value={fundForm.endDate}
                            onChangeValue={onChangeFundForm}
                        />
                        <p>까지</p>
                    </div>
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>대표 사진</h3>
                    <div className='fundEnrollForm__img'>
                        {bossImg.map((img, idx) => {
                            return (
                                <>
                                    {img != '' ?
                                        <div className='fundEnrollForm__img__input' onClick={() => imageDelete(img, idx)}>
                                            <img src={'../public/tempImg/' + img} />
                                            <div className='delete__icon'>
                                                <div className='delete__background'></div>
                                                <XCircleFill size={35} />
                                            </div>
                                        </div>
                                        : <div className='fundEnrollForm__img__input' onClick={() => imageHandler(idx)}>
                                            <PlusSquareFill size={35} key={idx} />
                                        </div>}
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>프로젝트 소개</h3>
                    <FundEditor onEditorChange={onEditorChange}
                                FACheck={'F'}
                                imgList={fundInfoImgList}
                                setImgList={setFundInfoImgList} />
                </div>
            </div>
            <div id={nav[1].id} ref={(e) => (navRef.current[1] = e)} className='fundEnrollForm__artistForm form'>
                <hr />
                <h2>아티스트 소개</h2>
                <div className='fundEnrollForm__item'>
                    <h3>아티스트 소개</h3>
                    <FundEditor onEditorChange={onEditorChange}
                                FACheck={'A'}
                                imgList={artistInfoImgList}
                                setImgList={setArtistInfoImgList} />
                </div>
            </div>
            <div id={nav[2].id} ref={(e) => (navRef.current[2] = e)} className='fundEnrollForm__rewardForm form'>
                <hr />
                <h2>리워드</h2>
                <div className='fundEnrollForm__item'>
                    {rewardList.map((reward, idx) => {
                        return (
                            <div className='fundEnrollForm__reward' key={idx}>
                                <h4>{reward.rewardName}</h4>
                                <div className='fundEnrollForm__reward__box'>
                                    <div className='fundEnrollForm__reward__item'>
                                        <p>{reward.rewardInfo}</p>
                                        <p>{reward.rewardPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                                    </div>
                                    <div>/</div>
                                    <div className='fundEnrollForm__reward__amount'>{reward.limitYn === 'Y' ? reward.limitAmount : '∞'}</div>
                                    <div className='fundEnrollForm__reward__icon' onClick={() => onClickDeleteReward(idx)}>
                                        <Trash3 size={30} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                    <div className='fundEnrollForm__reward__add__btn' onClick={() => setAddReward(true)}> <PlusSquareFill size={30} /> </div>
                </div>

                {addReward && <div className='fundEnrollForm__reward__add__form'>
                    <hr />
                    <h3>리워드 추가</h3>
                    <div className='addform__item'>
                        <p>리워드 이름</p>
                        <FundInputBar width={"98%"}
                            paddingLeft={"5px"}
                            name={'rewardName'}
                            value={rewardForm.rewardName}
                            onChangeValue={onChangeRewardForm}
                        />
                    </div>
                    <div className='addform__item'>
                        <p>리워드 설명</p>
                        <FundInputBar width={"98%"}
                            paddingLeft={"5px"}
                            name={'rewardInfo'}
                            value={rewardForm.rewardInfo}
                            onChangeValue={onChangeRewardForm}
                        />
                    </div>
                    <div className='addform__item'>
                        <p>리워드 금액</p>
                        <div className='addform__item__price'>
                            <FundInputBar width={"30%"}
                                type={'number'}
                                paddingLeft={"5px"}
                                name={'rewardPrice'}
                                value={rewardForm.rewardPrice}
                                onChangeValue={onChangeRewardForm}
                            />
                            <p>원</p>
                        </div>
                    </div>
                    <div className='addform__item'>
                        <p>리워드 제공 수량</p>
                        <div className='addform__item__btn__box'>
                            <div className={rewardForm.limitYn === 'N' ?
                                'addform__item__btn__active' :
                                'addform__item__btn__disabled'
                            } onClick={() => onClickRewardBtn(true, 'N')}>무제한</div>
                            <div className={rewardForm.limitYn === 'Y' ?
                                'addform__item__btn__active' :
                                'addform__item__btn__disabled'
                            } onClick={() => onClickRewardBtn(true, 'Y')}>제한</div>
                            <FundInputBar width={"70px"}
                                type={'number'}
                                paddingLeft={"5px"}
                                name={'limitAmount'}
                                value={rewardForm.limitAmount}
                                onChangeValue={onChangeRewardForm}
                                disabled={rewardForm.limitYn === 'N'}
                            />
                        </div>
                    </div>
                    <div className='addform__item'>
                        <p>배송지 필요 여부</p>
                        <div className='addform__item__btn__box'>
                            <div className={rewardForm.deliveryYn === 'N' ?
                                'addform__item__btn__active' :
                                'addform__item__btn__disabled'
                            } onClick={() => onClickRewardBtn(false, 'N')}>필요 없음</div>
                            <div className={rewardForm.deliveryYn === 'Y' ?
                                'addform__item__btn__active' :
                                'addform__item__btn__disabled'
                            } onClick={() => onClickRewardBtn(false, 'Y')}>필요</div>
                        </div>
                    </div>
                    <div className='addform__submit'>
                        <div className='addform__submit__btn' onClick={() => onClickRewardSubmit(false)}>취소</div>
                        <div className='addform__submit__btn' onClick={() => onClickRewardSubmit(true)}>등록</div>
                    </div>
                </div>}

            </div>
            <div id={nav[3].id} ref={(e) => (navRef.current[3] = e)} className='fundEnrollForm__budgetForm form'>
                <hr />
                <h2>예산</h2>
                <div className='fundEnrollForm__textarea'>
                    <textarea name="budgetInfo" onChange={(e) => onChangeFundForm(e)} >{fundForm.budgetInfo}</textarea>
                </div>
            </div>
            <div id={nav[4].id} ref={(e) => (navRef.current[4] = e)} className='fundEnrollForm__scheduleForm form'>
                <hr />
                <h2>일정</h2>
                <div className='fundEnrollForm__textarea'>
                    <textarea name="scheduleInfo" onChange={(e) => onChangeFundForm(e)} >{fundForm.scheduleInfo}</textarea>
                </div>
            </div>
            <div className='fundEnrollForm__submit'>
                <div className='fundEnrollForm__submit__btn' onClick={()=>onClickSubmit()}>신청서 제출</div>
            </div>
        </div>
    );
}
export default FundEnrollForm;