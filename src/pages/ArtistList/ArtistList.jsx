import { useEffect, useRef, useState } from 'react';
import './ArtistList.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import ArtistItem from '../../components/ArtistItem';
import { PuffLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { selectArtist } from '../../apis/artist/artist';
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../recoil/LoginUser";
import toast from 'react-hot-toast';


function ArtistList() {
    const loginUser = useRecoilValue(loginUserState);
    const navigate = useNavigate();
    const [ref, inView] = useInView();
    const [keyword, setKeyword] = useState('');
    const [artistList, setArtistList] = useState([]);
    const [selectItem, setSelectItem] = useState({
        keyword: keyword,
        sort: 'createDate',
        size: 10
    })
    const artistEnrollMove = () =>{
        if(loginUser.userNo ===''){
            toast.error('로그인 후 이용가능 합니다.')  
            return    
        }
        if(loginUser.userRole=='ARTIST'){
            toast.error('등록된 아티스트입니다.')
            return
        }
        navigate('/artist/enroll')
        
    }
    const changeSort = (sortVal) => {
        setSelectItem({
            ...selectItem,
            sort: sortVal
        })
    }
    const [loadingCheck, setLoadingCheck] = useState(false);
    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            setSelectItem({
                ...selectItem,
                keyword: keyword
            })
        }
    }
    const list = async () => {

        const result = await selectArtist(selectItem);
        setArtistList(result)
    }
    useEffect(() => {
        if (inView) {
            setLoadingCheck(true);
            setTimeout(() => {
                setSelectItem({
                    ...selectItem,
                    size: selectItem.size + 10
                })
                setLoadingCheck(false);
            }, 1000)
        }
    }, [inView])
    useEffect(() => {
        list();
    }, [selectItem])
    useEffect(() => {
        list()
    }, [])


    return (

        <div className='artist__list__container'>
            <div className='title'>
                <h1>ARTIST LIST</h1>
                <input className='artist__search' type="text" name="keyword" value={keyword} placeholder='검색어를 입력하세요' onChange={(e) => { setKeyword(e.target.value) }} onKeyPress={(e) => { handleKeyEnter(e) }} />
            </div>
            <div className='btn__area'>
                <div>
                    <select name="sort" id="select-id" value={selectItem.sort} onChange={(e) => { changeSort(e.target.value) }}>
                        <option value="createDate">최신순</option>
                        <option value="debut">데뷔</option>
                    </select> &nbsp;
                    <span>정렬</span>
                </div>
                <div className='artistEnroll__btn'><NavLink onClick={artistEnrollMove}>아티스트 등록</NavLink></div>
            </div>
            <div className='artist__item__container'>
                {artistList!=undefined && artistList.length > 0 ? artistList.map((artist, idx) => {
                    return <ArtistItem artist={artist} key={idx} />
                }) : ""
                }
            </div>
            <div className='spinner__box'>
                <div className='spinner' ref={ref}>
                    {loadingCheck ? <PuffLoader color='#F2613F' /> : '모든 아티스트를 불러왔습니다.'}
                </div>
            </div>
        </div>

    )
} export default ArtistList