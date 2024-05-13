import './FundItem.scss';

function FundItem({fundTitle, fundType, fundDescription, target, revenue}){

    let rateColor = {
        background: `linear-gradient(90deg, #E3651D ${(100*(revenue/target)).toFixed(1)}%, #FFFFFF ${(100*(revenue/target)).toFixed(1)}%)`
    };

    return(
        <div className='fundItem__container'>
            <img src="http://localhost:5173/fund_temp/img1.png"/>
            <div className='fundItem__category'>{fundType} &gt; 록</div>
            <div className='fundItem__title'>{fundTitle}</div>
            <div className='fundItem__content'>{fundDescription}</div>
            <div className='fundItem__info'>
                <p>{(100*(revenue/target)).toFixed(1)}%</p>
                <p>{(+revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                <p>D-5</p>
            </div>
            <div className='fundItem__rate' style={rateColor}></div>
        </div>
    );
}
export default FundItem;