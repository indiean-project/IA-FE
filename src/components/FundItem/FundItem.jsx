import { useEffect, useState } from 'react';
import './FundItem.scss';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../assets/default/defaultImg.png'

function FundItem({ item }) {

    const [fundListItem, setFundListItem] = useState({});
    const { endDate, fundDescription, fundInfo, fundNo, fundTitle, fundType, rate, revenue, startDate, target, userNo, imgUrl, artistName } = fundListItem;
    const [day, setDay] = useState(0);
    const navigate = useNavigate();

    let rateColor = {
        background: `linear-gradient(90deg, #E3651D ${(100 * (revenue / target)).toFixed(1)}%, #FFFFFF ${(100 * (revenue / target)).toFixed(1)}%)`
    };

    const onClickFundItem = ()=>{
        navigate('/funding/detail/'+fundNo, {state: {value: day}});
    }

    useEffect(() => {
        setFundListItem({ ...item });
    }, [])

    useEffect(() => {
        const eDay = new Date(endDate);
        const today = new Date();
        let dDay = eDay.getTime() - today.getTime();
        dDay = Math.ceil(dDay / (1000 * 60 * 60 * 24));
        setDay(dDay);
    })

    useEffect(()=>{

    },[fundListItem])

    return (
        <div className='fundItem__container' onClick={()=>onClickFundItem()}>
            <div className='fundItem__hover'>자세히 보기</div>
            <img src={imgUrl != null ? imgUrl.substring(imgUrl.indexOf('public') - 1) : defaultImg} />
            <div className='fundItem__category'><div>{fundType}</div><div className='fundItem__artistName'>{artistName}</div></div>
            <div className='fundItem__title'>{fundTitle}</div>
            <div className='fundItem__content'>{fundDescription}</div>
            <div className='fundItem__info'>
                <div>
                    <p>{(100 * (revenue / target)).toFixed(1)}%</p>
                    <div></div>
                    <p>{(+revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
                <p>{day<=-1? '마감': 'D-'+day}</p>
            </div>
            <div className='fundItem__rate' style={rateColor}></div>
        </div>
    );
}
export default FundItem;