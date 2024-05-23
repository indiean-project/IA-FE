import './ArtistLineUp.scss'
import artistImg from './10cm.jpg';
import { useNavigate } from 'react-router-dom';



function ArtistLineUp({ artist }) {
    

    const navigate = useNavigate()
    const handleOnClick = (artist) => {
        if (artist !== null) {

            handleArtistPost({ artist })
        } else {
            return false;
        }
    }
    const handleArtistPost = () => {
    
        navigate('/artist/detail/' + artist.artistNo)
    };

    return (
        <div className='artist_box'>
            <div className='artist__picture'><div className={`${artist !== null ? "clickOn" : ""}`} onClick={() => { handleOnClick() }}><img src={artistImg} /></div></div>
            <span className='artist__name'>{artist.artistName}</span>
        </div>
    )
} export default ArtistLineUp