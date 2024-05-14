import { useEffect, useState } from 'react';
import './FundItem.scss';

function FundItem({ item }) {

    const [fundListItem, setFundListItem] = useState({});
    const {endDate, fundDescription, fundInfo, fundNo, fundTitle, fundType, rate, revenue, startDate, target, userNo} = fundListItem;
    const [day, setDay] = useState(0);

    let rateColor = {
        background: `linear-gradient(90deg, #E3651D ${(100*(revenue/target)).toFixed(1)}%, #FFFFFF ${(100*(revenue/target)).toFixed(1)}%)`
    };

    useEffect(() => {
        setFundListItem({ ...item });
    }, [])

    useEffect(()=>{
        const eDay = new Date(endDate);
        const today = new Date();
        let dDay = Math.abs(today.getTime() - eDay.getTime());
        dDay = Math.ceil(dDay / (1000 * 60 * 60 * 24));
        setDay(dDay);
    })

    return (
        <div className='fundItem__container'>
            <img src="http://localhost:5173/fund_temp/img1.png"/>
            <div className='fundItem__category'>{fundType} &gt; 록</div>
            <div className='fundItem__title'>{fundTitle}</div>
            <div className='fundItem__content'>{fundDescription}</div>
            <div className='fundItem__info'>
                <p>{(100*(revenue/target)).toFixed(1)}%</p>
                <p>{(+revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                <p>D-{day}</p>
            </div>
            <div className='fundItem__rate' style={rateColor}></div>
        </div>
    );
}
export default FundItem;