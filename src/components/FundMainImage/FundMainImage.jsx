import { useEffect, useRef, useState } from 'react';
import './FundMainImage.scss';
import defaultImg from '../../assets/default/defaultImg.png'
function FundMainImage({ imgItem }) {
    const [imgNum, setImgNum] = useState(0);
    const defaultImgList = [defaultImg, defaultImg, defaultImg, defaultImg, defaultImg]


    return (
        <div className='fundMainImage__container'>
            <div className='fundMainImage__thumb'>
                {(imgItem != undefined? imgItem : defaultImgList).map((item, idx) => {
                    return (
                            <img key={idx} src={item != null ? item.substring(item.indexOf('public') - 1) : defaultImg} onClick={() => setImgNum(idx)} />
                    );
                })}
            </div>
            <div className='FundMainImage__main'>
                {imgItem != undefined && <img src={imgItem.length != 0 ? imgItem[imgNum].substring(imgItem[imgNum].indexOf('public') - 1): defaultImg} />}
            </div>
        </div>
    );
}
export default FundMainImage;