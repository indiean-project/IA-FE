import FundItem from '../../components/FundItem';
import Background from '../../components/Background';
import './FundList.scss';
import { ArrowDown, ArrowUp, CaretDownFill, Search } from 'react-bootstrap-icons';
import { PuffLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';
import { selectAllFund } from '../../apis/fund';

function FundList() {
    const [fundList, setFundList] = useState([]);
    const fundListRef = useRef();
    const [selectBox, setSelectBox] = useState(false);
    const [selectItem, setSelectItem] = useState({
        value: '최신순',
        standard: 'fundNo',
        sort: 'DESC',
        sortCheck: true
    })

    const selectAllFundList = async()=>{
        console.log(selectItem);
        const list = await selectAllFund(selectItem);
        console.log(list);
        setFundList(list['data']);
    }

    const onClickSelectBox = ()=>{
        selectBox? setSelectBox(false) : setSelectBox(true);
    }

    const onClickSelectItem = (value)=>{
        switch (value) {
            case '최신순' :
                setSelectItem({
                    ...selectItem,
                    value: value,
                    standard: 'fundNo'
                });
                break;
            case '목표액순' :
                setSelectItem({
                    ...selectItem,
                    value: value,
                    standard: 'target'
                });
                break;
            case '펀딩액순' :
                setSelectItem({
                    ...selectItem,
                    value: value,
                    standard: 'revenue'
                });
                break;
            case '달성률순' :
                setSelectItem({
                    ...selectItem,
                    value: value,
                    standard: 'rate'
                });
                break;
        }
        setSelectItem({
            ...selectItem,
            value: value
        });
        
        setSelectBox(false);
        selectAllFundList();
    }

    const onClickSortCheck = ()=>{
        selectItem.sortCheck? setSelectItem({
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
    
    useEffect(()=>{
        selectAllFundList();        
    },[])

    return (
        <Background>
            <div className='fundList__container'>
                <h1>아티스트 펀딩</h1>
                <h3>아티스트를 펀딩하고 다양한 리워드를 만나보세요!</h3>
                <div className='fundList__form'>
                    <div className='fundList__form__input'>
                        <input type="text" placeholder='키워드를 입력하세요.' />
                        <div className='fundList__form__icon'>
                            <Search size={25} />
                        </div>
                    </div>
                    <div className='select__box'>필터 < CaretDownFill /> </div>
                </div>
                <div className='fundList__compYn'>
                    <div>진행중</div>
                    <div>마감</div>
                </div>
                <div className='fundList__hot'>
                    <div className='fundList__hot__header'>
                        <p>마감임박 펀딩 리워드를 확인해보세요!</p>
                        <div className='fundList__form__btn'>
                            펀딩 신청하기
                        </div>
                    </div>
                    <div className='fundList__hot__items'>
                        <FundItem />
                        <FundItem />
                        <FundItem />
                        <FundItem />
                    </div>
                </div>
                <div className='fundList__sort'>
                    <div className='select__box' onClick={()=>onClickSelectBox()}>{selectItem.value} < CaretDownFill /> </div>
                    {selectBox? <div className='select__item'>
                        <table>
                            <tr onClick={()=>onClickSelectItem('최신순')}>최신순</tr>
                            <tr onClick={()=>onClickSelectItem('목표액순')}>목표액순</tr>
                            <tr onClick={()=>onClickSelectItem('펀딩액순')}>펀딩액순</tr>
                            <tr onClick={()=>onClickSelectItem('달성률순')}>달성률순</tr>
                        </table>
                    </div> : ''}
                    <div className='select__sort' onClick={()=>onClickSortCheck()}>
                    {selectItem.sortCheck? <ArrowDown/> :<ArrowUp/>}
                    </div>
                    <p>정렬</p>
                </div>
                <div className='fundList__general'>
                    {fundList.map((item)=>{
                        return(
                            <FundItem
                                key={item.fundNo}
                                fundTitle={item.fundTitle}
                                fundType={item.fundType}
                                fundDescription={item.fundDescription}
                                target={item.target}
                                revenue={item.revenue}
                            />
                        );
                    })}
                </div>
                <div className='spinner'>
                    <PuffLoader color='#F2613F' />
                </div>
            </div>
        </Background>
    );
}
export default FundList;