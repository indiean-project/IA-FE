import { useEffect, useState } from 'react';
import './ArtistList.scss'
import { useRecoilState } from 'recoil';
import { cPage } from '../../recoil/page';
import { NavLink } from 'react-router-dom';
import ArtistItem from '../../components/ArtistItem';
import { PuffLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import {selectArtist} from '../../apis/artist/artist';

function ArtistList() {
    const [ref, inView] = useInView();
    const [artistList, setArtistList] = useState([]);
    const [sort, setSort] = useState("createDate");
    const [keyword, setKeyword] = useState("");
    const [currentPage,setCurrentPage] = useRecoilState(cPage);
    const [loadingCheck, setLoadingCheck] = useState(false);
    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            list();
        }
    }
    const list = async () => {

        const result = await selectArtist({
            page: currentPage,
            sort: sort,
            keyword: keyword
        });
        setArtistList(result.listDto)
    }
    useEffect(()=>{
        if(inView){
            setLoadingCheck(true);
            setTimeout(()=>{
                setSelectItem({
                    ...selectItem,
                    page: selectItem.page + 10
                })
                setLoadingCheck(false);
            }, 1000)
        }
    },[inView])


    return (
        
            <div className='artist__list__container'>
                <div className='title'>
                    <h1>ARTIST LIST</h1>
                    <input className='artist__search' type="text" name="keyword" placeholder='검색어를 입력하세요' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} onKeyPress={(e) => { handleKeyEnter(e) }} />
                </div>
                <div className='btn__area'>
                    <div>
                        <select name="sort" id="select-id" value={sort} onChange={(e) => { setSort(e.target.value), setCurrentPage(1) }}>
                            <option value="createDate">최신순</option>
                            <option value="debut">데뷔</option>
                        </select> &nbsp;
                        <span>정렬</span>
                    </div>
                    <div className='btnQ'><NavLink>아티스트 등록</NavLink></div>
                </div>
                <div className='artist__item__container'>
                    <ArtistItem/>
                </div>
                <div className='spinner__box'>
                    <div className='spinner' ref={ref}>
                            {loadingCheck ? <PuffLoader color='#F2613F'/> : '모든 펀딩을 불러왔습니다.' }
                    </div>
                </div>
            </div>
       
    )
} export default ArtistList