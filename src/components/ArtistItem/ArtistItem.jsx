import './ArtistItem.scss'
import IU from './iu.jpg'
import chuu from './chuu.png'
import { useNavigate } from 'react-router-dom'

function ArtistItem({artist}) {
    const navigate = useNavigate();
    const handleDetailPost = (artistNo)=>{
        navigate('/artist/detail/'+artistNo);
    }

    return (
            <div className="artist__item__box" onClick={()=>{handleDetailPost(artist.artistNo)}}>
                <div className='artist__img'>
                    <img src={chuu} />
                </div>
                <ul>
                    <li className='artist__title'>이름 </li>
                    <li className='artist__info'>{artist.artistName}</li>
                    <li className='artist__title'>데뷔 </li>
                    <li className='artist__info'>{artist.debutDate}</li>
                    <li className='artist__title'><span className='artist__title'>장르: </span>&nbsp;<span> {artist.musicCategory}</span></li>
                </ul>
            </div> 
    )
} export default ArtistItem