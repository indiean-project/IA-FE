import './FundItem.scss';

function FundItem(){
    return(
        <div className='fundItem__container'>
            <img src="http://localhost:5173/fund_temp/img1.png"/>
            <div className='fundItem__category'>공연 &gt; 록</div>
            <div className='fundItem__title'>쏜애플 2024년 연말 공연 [불장난]</div>
            <div className='fundItem__content'>오직 쏜애플의 팬들만을 위한 오프라인 공연 [불장난]과 신곡 발표를 함께 만나볼...</div>
            <div className='fundItem__info'>
                <p>72%</p>
                <p>15,100,500원</p>
                <p>D-5</p>
            </div>
            <div className='fundItem__rate'></div>
        </div>
    );
}
export default FundItem;