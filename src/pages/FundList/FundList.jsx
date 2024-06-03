import FundItem from '../../components/FundItem';
import Background from '../../components/Background';
import './FundList.scss';
import { ArrowDown, ArrowUp, CaretDownFill, Search } from 'react-bootstrap-icons';
import { PuffLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';
import { selectAllFund, selectSoonFund } from '../../apis/fund/fund';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import { now, shuffle } from 'lodash';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { useNavigate } from 'react-router-dom';

function FundList() {
    const loginUser = useRecoilValue(loginUserState);
    const navigate = useNavigate();
    const [fundList, setFundList] = useState([]);
    const [soonList, setSoonList] = useState([]);
    const keywordRef = useRef();
    const fundListRef = useRef();
    const [between, setBetween] = useState(true);
    const [compYnStyle, setCompYnStyle] = useState({
        true: {
            'borderBottom': '3px solid #F2613F'
        },
        false: {
            'border': 'opacity 0'
        }
    })
    const [ref, inView] = useInView();
    const [selectBox, setSelectBox] = useState([false, false]);
    const [loadingCheck, setLoadingCheck] = useState(false);
    const [searchCheck, setSearchCheck] = useState(true);
    const [selectItem, setSelectItem] = useState({
        sortName: '최신순',
        sortValue: 'fundNo',
        sort: 'DESC',
        sortCheck: true,
        page: 10,
        keyword: '',
        searchName: '전체',
        searchValue: 'all'
    })

    const standard = [
        {
            name: '최신순',
            value: 'fundNo'
        },
        {
            name: '목표액순',
            value: 'target'
        },
        {
            name: '펀딩액순',
            value: 'revenue'
        },
        {
            name: '달성률순',
            value: 'rate'
        }
    ];
    const searchItem = [
        {
            name: '전체',
            value: 'all'
        },
        {
            name: '아티스트',
            value: 'artist'
        },
        {
            name: '제목',
            value: 'fundTitle'
        },
        {
            name: '내용',
            value: 'fundContent'
        }
    ]

    const selectAllFundList = async () => {
        const list = await selectAllFund(selectItem);
        setFundList(list['data']);
    }

    const onClickSelectBox = (num) => {
        let list = selectBox;
        list[num] = selectBox[num] ? false : true;
        setSelectBox([...list]);
    }

    const onClickSelectItem = (param, idx) => {
        if (idx === 0) {
            setSelectItem({
                ...selectItem,
                searchName: param.name,
                searchValue: param.value
            })
        } else {
            setSelectItem({
                ...selectItem,
                sortName: param.name,
                sortValue: param.value
            })
        }

        let list = selectBox;
        list[idx] = false;
        setSelectBox([...list]);

    }

    const onClickSortCheck = () => {
        selectItem.sortCheck ? setSelectItem({
            ...selectItem,
            sort: 'ASC',
            sortCheck: false
        }) :
            setSelectItem({
                ...selectItem,
                sort: 'DESC',
                sortCheck: true
            })
    }

    const onClickCompYn = (value) => {
        setBetween(value);
    }

    const onClickKeywordSearch = (value) => {
        setSelectItem({
            ...selectItem,
            keyword: value
        })
        value === '' ? setSearchCheck(true) : setSearchCheck(false);
    }

    const selectSoonFundList = async () => {
        const list = await selectSoonFund();
        setSoonList(shuffle(list['data']));
    }

    useEffect(() => {
        selectSoonFundList();
    }, [])

    useEffect(() => {
        selectAllFundList();
    }, [selectItem])

    useEffect(() => {
    }, [fundList])

    useEffect(() => {
        if (inView) {
            setLoadingCheck(true);
            setTimeout(() => {
                setSelectItem({
                    ...selectItem,
                    page: selectItem.page + 10
                })
                setLoadingCheck(false);
            }, 1000)
        }
    }, [inView])

    return (
        <Background>
            <div className='fundList__container'>
                <h1>아티스트 펀딩</h1>
                <h3>아티스트를 펀딩하고 다양한 리워드를 만나보세요!</h3>
                <div className='fundList__form'>
                    <div className='fundList__form__input'>
                        <input type="text" ref={keywordRef} placeholder='키워드를 입력하세요.' />
                        <div className='fundList__form__icon' onClick={() => onClickKeywordSearch(keywordRef.current.value)}>
                            <Search size={25} />
                        </div>
                    </div>
                    <div className='select__box' onClick={() => onClickSelectBox(0)}>{selectItem.searchName}< CaretDownFill /> </div>
                    {selectBox[0] ? <div className='select__item'>
                        <table>
                            <tbody>
                                <tr onClick={() => onClickSelectItem(searchItem[0], 0)}><td>전체</td></tr>
                                <tr onClick={() => onClickSelectItem(searchItem[1], 0)}><td>아티스트</td></tr>
                                <tr onClick={() => onClickSelectItem(searchItem[2], 0)}><td>제목</td></tr>
                                <tr onClick={() => onClickSelectItem(searchItem[3], 0)}><td>내용</td></tr>
                            </tbody>
                        </table>
                    </div> : ''}
                </div>
                {searchCheck && <div className='fundList__compYn'>
                    <div style={between ? compYnStyle.true : compYnStyle.false} onClick={() => onClickCompYn(true)}>진행중</div>
                    <div style={between ? compYnStyle.false : compYnStyle.true} onClick={() => onClickCompYn(false)}>마감</div>
                </div>}
                {searchCheck && <div className='fundList__hot'>
                    <div className='fundList__hot__header'>
                        <p>마감임박 펀딩 리워드를 확인해보세요!</p>
                        {loginUser.userRole === 'ARTIST' && <div className='fundList__form__btn' onClick={() => navigate('enroll')}>
                            펀딩 신청하기
                        </div>}
                    </div>
                    {soonList.length > 0 ? <div className='fundList__hot__items'>
                        {soonList.filter((item) => soonList.indexOf(item) < 4).map((item) => {
                            return (
                                <FundItem key={item.fundNo}
                                    item={item} />
                            );
                        })}
                    </div> : <div className='fundList__not__found'>확인되는 펀딩이 없습니다.</div>}
                </div>}
                <div className='fundList__sort'>
                    <div className='select__box' onClick={() => onClickSelectBox(1)}>{selectItem.sortName} < CaretDownFill /> </div>
                    {selectBox[1] ? <div className='select__item'>
                        <table>
                            <tbody>
                                <tr onClick={() => onClickSelectItem(standard[0], 1)}><td>최신순</td></tr>
                                <tr onClick={() => onClickSelectItem(standard[1], 1)}><td>목표액순</td></tr>
                                <tr onClick={() => onClickSelectItem(standard[2], 1)}><td>펀딩액순</td></tr>
                                <tr onClick={() => onClickSelectItem(standard[3], 1)}><td>달성률순</td></tr>
                            </tbody>
                        </table>
                    </div> : ''}
                    <div className='select__sort' onClick={() => onClickSortCheck()}>
                        {selectItem.sortCheck ? <ArrowDown /> : <ArrowUp />}
                    </div>
                    <p>정렬</p>
                </div>
                {searchCheck ? <div className='fundList__general'>
                    {fundList.filter(item => between ? new Date(item.endDate) >= new Date()
                        : new Date(item.endDate) < new Date())
                        .map((item) => {
                            return (
                                <FundItem
                                    key={item.fundNo}
                                    item={item}
                                />
                            );
                        })}
                </div> :
                    <div><h3>총 {fundList.length}건의 검색 결과가 있습니다.</h3>
                        <div className='fundList__search'>
                            {fundList.map((item) => {
                                return (
                                    <FundItem
                                        key={item.fundNo}
                                        item={item}
                                    />
                                );
                            })}
                        </div>
                    </div>}
                <div className='spinner' ref={ref}>
                    {loadingCheck ? <PuffLoader color='#F2613F' /> : '모든 펀딩을 불러왔습니다.'}
                </div>
            </div>
        </Background>
    );
}
export default FundList;