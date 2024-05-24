import './MusicBox.scss'
import test2 from './그라데이션.jpg'
import test3 from './봄이좋냐.jpg'
import test4 from './서랍.jpg'

function MusicBox({ music }) {

    return (
        <div className='music__box'>
            <div className='album__picture'>
                <img src={music.album.images[1].url} alt='' />
            </div>
            <div className='album__info'>
                <div><span className='track__info'>트랙이름 :</span><span className='track__text'>{music.name}</span></div>
                <div><span className='track__info'>앨범 명 :</span><span className='track__text'>{music.album.name}</span></div>
                <div><span className='track__info'>발매 년도 :</span><span className='track__text'>{music.album.release_date}</span></div>
                <div className='audio__area'><div><audio src={music.preview_url} controls="controls" type="audio/mp3"></audio></div></div>
            </div>
        </div>
    )
} export default MusicBox