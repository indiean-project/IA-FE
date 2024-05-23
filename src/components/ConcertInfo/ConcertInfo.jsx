import './ConcertInfo.scss';
import poster from '../../pages/ConcertDetail/poster.jpg';


function ConcertInfo({ concertInfo }) {

    return (
        <div className='concert__info__box'>
            <div className='concert__info__item'>
                <div className='concert__info__poster'><img src={poster} /></div>
                <span className='concert__info__text' dangerouslySetInnerHTML={{ __html: concertInfo }}>
                </span>
            </div>
        </div>
    )
} export default ConcertInfo