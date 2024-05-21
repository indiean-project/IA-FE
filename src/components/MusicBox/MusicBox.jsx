import './MusicBox.scss'
import test2 from './그라데이션.jpg'
import test3 from './봄이좋냐.jpg'
import test4 from './서랍.jpg'

function MusicBox() {
    return (
        <>
            <div className='music__box'>
                <div className='album__picture'>
                    <img src={test3} />
                </div>
                <div className='album__info'>
                    <div><span className='track__info'>트랙이름 :</span><span className='track__text'>곡명입니다.</span></div>
                    <div><span className='track__info'>앨범 명 :</span><span className='track__text'>앨범명 입니다.</span></div>
                    <div><span className='track__info'>발매 년도 :</span><span className='track__text'>발매년도 입니다..</span></div>
                    <div className='audio__area'><div><audio src='' controls="controls" type="audio/mp3"></audio></div></div>
                </div>
            </div>
            <div className='music__box'>
                <div className='album__picture'>
                    <img src={test4} />
                </div>
                <div className='album__info'>
                    <div><span className='track__info'>트랙이름 :</span><span className='track__text'>곡명입니다.</span></div>
                    <div><span className='track__info'>앨범 명 :</span><span className='track__text'>앨범명 입니다.</span></div>
                    <div><span className='track__info'>발매 년도 :</span><span className='track__text'>발매년도 입니다..</span></div>
                    <div className='audio__area'><div><audio src='' controls="controls" type="audio/mp3"></audio></div></div>
                </div>
            </div>
            <div className='music__box'>
                <div className='album__picture'>
                    <img src={test2} />
                </div>
                <div className='album__info'>
                    <div><span className='track__info'>트랙이름 :</span><span className='track__text'>곡명입니다.</span></div>
                    <div><span className='track__info'>앨범 명 :</span><span className='track__text'>앨범명 입니다.</span></div>
                    <div><span className='track__info'>발매 년도 :</span><span className='track__text'>발매년도 입니다..</span></div>
                    <div className='audio__area'><div><audio src='' controls="controls" type="audio/mp3"></audio></div></div>
                </div>
            </div>
        </>
    )
} export default MusicBox