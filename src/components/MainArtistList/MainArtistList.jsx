import { NavLink, useNavigate } from 'react-router-dom';
import './MainArtistList.scss';
import img from '../../assets/default/defaultImg.png';
import { useEffect, useState } from 'react';
import { getHomeArtist } from '../../apis/artist/artist';

function MainArtistList() {

    const [artistList, setArtistList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getArtist();
    },[])

    const getArtist = async()=>{
        const list = await getHomeArtist();
        setArtistList(list['data']);
    }

    return (
        <div className='mainArtistList__container'>
            <div className='mainArtistList__header'>
                <h1>아티스트 둘러보기</h1>
                <NavLink to={'/artist'}>아티스트 더보기</NavLink>
            </div>
            <div className='mainArtistList__items'>
                {
                    artistList != undefined ? artistList.map((item) => {
                        return (
                            <div key={item.artistNo} className='mainArtistList__item'>
                                <div className='mainArtistList__img'>
                                    <div onClick={()=>navigate('/artist/detail/'+item.artistNo)}>페이지 방문하기</div>
                                    <img src={item.imgUrl === null ? img : item.imgUrl} />
                                </div>
                                <p>{item.artistName}</p>

                            </div>
                        );
                    })
                : <div className='mainArtistList__info'><h2>현재 등록된 아티스트가 없습니다.😂</h2></div> }
            </div>
        </div>
    );
}
export default MainArtistList;