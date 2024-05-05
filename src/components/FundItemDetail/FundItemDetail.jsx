import './FundItemDetail.scss';
function FundItemDetail({nav, navRef}) {
    return (
        <div className='fundItemDetail__container'>
            <div className='fundItemDetail__box'>
                <div className='fundItemDetail__item' id={nav[0].id} ref={(e)=>(navRef.current[0]=e)}>
                    프로젝트 소개
                </div>
                <div className='fundItemDetail__item' id={nav[1].id} ref={(e)=>(navRef.current[1]=e)}>
                    아티스트 소개
                </div>
                <div className='fundItemDetail__item' id={nav[2].id} ref={(e)=>(navRef.current[2]=e)}>
                    예산
                </div>
                <div className='fundItemDetail__item' id={nav[3].id} ref={(e)=>(navRef.current[3]=e)}>
                    일정
                </div>
            </div>
        </div>
    );
}
export default FundItemDetail;