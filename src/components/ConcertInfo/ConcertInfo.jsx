import './ConcertInfo.scss';
import poster from './poster.jpg';
import DOMPurify from 'dompurify';

function ConcertInfo({ concertInfo }) {
    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }
    return (
        <div className='concert__info__box'>
            <div className='concert__info__item'>
                <span className='concert__info__text' dangerouslySetInnerHTML={createMarkUp(concertInfo)}>
                </span>
            </div>
        </div>
    )
} export default ConcertInfo