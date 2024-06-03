import './ArtistLineUp.scss'
import { useNavigate } from 'react-router-dom';
import baseImg from '../../assets/default/defaultImg.png';



function ArtistLineUp({ artist }) {
    
    const navigate = useNavigate()
    const handleOnClick = () => {
        if (artist.artistNo !== 0) {

            handleArtistPost()
        } else {
            return false;
        }
    }
    const handleArtistPost = () => {
    
        navigate('/artist/detail/' + artist.artistNo)
    };

    return (
        <div className='artist_box'>
            <div className='artist__picture'><div className={`${artist.artistNo !== 0 ? "clickOn" : ""}`} onClick={() => { handleOnClick() }}><img src={artist.titleUrl !== null?artist.titleUrl:baseImg}/></div></div>
            <span className='artist__name'>{artist.artistName}</span>
        </div>
    )
} export default ArtistLineUp