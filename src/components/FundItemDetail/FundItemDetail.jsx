import FundMainImage from '../FundMainImage/FundMainImage';
import './FundItemDetail.scss';
function FundItemDetail({ nav, navRef }) {
    return (
        <div className='fundItemDetail__container'>
            <div className='fundItemDetail__title' id={nav[0].id} ref={(e) => (navRef.current[0] = e)}>
                <h1>쏜애플 2024년 연말 공연 [불장난]</h1>
                <div className='fundItemDetail__title__item1'>
                    <FundMainImage />
                    <div className='fundItemDetail__title__content'>
                        <h4>목표금액</h4>
                        <h2>20,000,000원</h2>
                        <h4>펀딩금액</h4>
                        <h2>15,100,500원</h2>
                        <div></div>
                        <h4>참가자</h4>
                        <h2>152명</h2>
                    </div>
                </div>
                <div className='fundItemDetail__title__item2'>
                    <div>
                        <h4>펀딩기간</h4>
                        <h2>D-4</h2>
                    </div>
                    <div>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>
            </div>
            <div className='fundItemDetail__content'>
                <div className='fundItemDetail__item' >
                    프로젝트 소개
                </div>
                <div className='fundItemDetail__item' id={nav[1].id} ref={(e) => (navRef.current[1] = e)}>
                    아티스트 소개
                </div>
                <div className='fundItemDetail__item' id={nav[2].id} ref={(e) => (navRef.current[2] = e)}>
                    예산
                </div>
                <div className='fundItemDetail__item' id={nav[3].id} ref={(e) => (navRef.current[3] = e)}>
                    일정
                </div>
            </div>
        </div>
    );
}
export default FundItemDetail;