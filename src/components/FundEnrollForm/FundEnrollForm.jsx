import { useEffect, useState } from 'react';
import FundInputBar from '../FundInputBar';
import './FundEnrollForm.scss';
import { PencilSquare, PlusSquareFill, Trash3 } from 'react-bootstrap-icons';
import FundEditor from '../FundEditor/FundEditor';

function FundEnrollForm({ nav, navRef }) {
    const [fundForm, setFundForm] = useState({
        fundTitle: '',
        target: '',
        category: '',
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
        deliveryYn: '',
        limitYn: '',
        limitAmount: ''
    })

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

    return (
        <div className='fundEnrollForm__container'>
            <div className='fundEnrollForm__header'>
                <h1>펀딩 신청</h1>
            </div>
            <div id={nav[0].id} ref={(e) => (navRef.current[0] = e)} className='fundEnrollForm__fundForm form'>
                <hr />
                <h2>프로젝트 소개</h2>
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
                    <h3>목표 펀딩 금액</h3>
                    <div className='fundEnrollForm__input'>
                        <FundInputBar width={"30%"}
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
                        <div className='fundEnrollForm__img__input'><PlusSquareFill size={35} /></div>
                        <div className='fundEnrollForm__img__input'><PlusSquareFill size={35} /></div>
                        <div className='fundEnrollForm__img__input'><PlusSquareFill size={35} /></div>
                        <div className='fundEnrollForm__img__input'><PlusSquareFill size={35} /></div>
                        <div className='fundEnrollForm__img__input'><PlusSquareFill size={35} /></div>
                    </div>
                </div>
                <div className='fundEnrollForm__item'>
                    <h3>프로젝트 소개</h3>
                    <FundEditor/>
                </div>
            </div>
            <div id={nav[1].id} ref={(e) => (navRef.current[1] = e)} className='fundEnrollForm__artistForm form'>
                <hr />
                <h2>아티스트 소개</h2>
                <div className='fundEnrollForm__item'>
                    <h3>아티스트 소개</h3>
                    <FundEditor/>
                </div>
            </div>
            <div id={nav[2].id} ref={(e) => (navRef.current[2] = e)} className='fundEnrollForm__rewardForm form'>
                <hr />
                <h2>리워드</h2>
                <div className='fundEnrollForm__item'>

                    <div className='fundEnrollForm__reward'>
                        <h4>R석 + 사인CD</h4>
                        <div className='fundEnrollForm__reward__box'>
                            <div className='fundEnrollForm__reward__item'>
                                <p>공연장 R석 우선 배정권/사인CD 등등 어쩌구 저쩌구...</p>
                                <p>50,500원</p>
                            </div>
                            <div>/</div>
                            <div className='fundEnrollForm__reward__amount'>60</div>
                            <div className='fundEnrollForm__reward__icon'>
                                <PencilSquare size={30} />
                            </div>
                            <div className='fundEnrollForm__reward__icon'>
                                <Trash3 size={30} />
                            </div>
                        </div>
                    </div>
                    <div className='fundEnrollForm__reward'>
                        <h4>R석 + 사인CD</h4>
                        <div className='fundEnrollForm__reward__box'>
                            <div className='fundEnrollForm__reward__item'>
                                <p>공연장 R석 우선 배정권/사인CD 등등 어쩌구 저쩌구...</p>
                                <p>50,500원</p>
                            </div>
                            <div>/</div>
                            <div className='fundEnrollForm__reward__amount'>60</div>
                            <div className='fundEnrollForm__reward__icon'>
                                <PencilSquare size={30} />
                            </div>
                            <div className='fundEnrollForm__reward__icon'>
                                <Trash3 size={30} />
                            </div>
                        </div>
                    </div>

                    <div className='fundEnrollForm__reward__add__btn'> <PlusSquareFill size={30} /> </div>
                </div>

                <div className='fundEnrollForm__reward__add__form'>
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
                            <div className='addform__item__btn'>무제한</div>
                            <div className='addform__item__btn'>제한</div>
                            <FundInputBar width={"70px"}
                                type={'number'}
                                paddingLeft={"5px"}
                                name={'limitAmount'}
                                value={rewardForm.limitAmount}
                                onChangeValue={onChangeRewardForm}
                            />
                        </div>
                    </div>
                    <div className='addform__item'>
                        <p>배송지 필요 여부</p>
                        <div className='addform__item__btn__box'>
                            <div className='addform__item__btn'>필요 없음</div>
                            <div className='addform__item__btn'>필요</div>
                        </div>
                    </div>
                </div>

            </div>
            <div id={nav[3].id} ref={(e) => (navRef.current[3] = e)} className='fundEnrollForm__budgetForm form'>
                <hr />
                <h2>예산</h2>
            </div>
            <div id={nav[4].id} ref={(e) => (navRef.current[4] = e)} className='fundEnrollForm__scheduleForm form'>
                <hr />
                <h2>일정</h2>
            </div>
        </div>
    );
}
export default FundEnrollForm;