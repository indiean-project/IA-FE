import { useEffect, useRef, useState } from 'react';
import './FundMainImage.scss';
function FundMainImage({ imgList }) {
    const imgRef = useRef([]);
    const [imgItem, setImgItem] = useState([])
    const [imgNum, setImgNum] = useState(0);

    useEffect(()=>{
        console.log(imgList);

    }, [])

    return (
        <div className='fundMainImage__container'>
            {imgItem.length != 0 && <div className='fundMainImage__thumb'>
                {imgItem.map((item, idx) => {
                    return (
                            <img key={idx} src={item.substring(item.indexOf('public') - 1)} onClick={() => setImgNum(idx)} />
                    );
                })}
            </div>}
            <div className='FundMainImage__main'>
                {imgItem.length != 0 && <img src={imgItem[imgNum]} />}
            </div>
        </div>
    );
}
export default FundMainImage;