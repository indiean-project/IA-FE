import { useEffect, useRef, useState } from 'react';
import './FundMainImage.scss';
function FundMainImage() {
    const imgRef = useRef([]);
    const [imgItem, setImgItem] = useState([
        "http://localhost:5173/fund_temp/img1.png",
        "http://localhost:5173/fund_temp/img2.png",
        "http://localhost:5173/fund_temp/img3.png",
        "http://localhost:5173/fund_temp/img4.png",
        "http://localhost:5173/fund_temp/img5.png"
    ])
    const [imgNum, setImgNum] = useState(0);

    return (
        <div className='fundMainImage__container'>
            <div className='fundMainImage__thumb'>
                {imgItem.map((item, idx) => {
                    return (
                            <img key={idx} src={item} onClick={() => setImgNum(idx)} />
                    );
                })}
            </div>
            <div className='FundMainImage__main'>
                <img src={imgItem[imgNum]} />
            </div>
        </div>
    );
}
export default FundMainImage;