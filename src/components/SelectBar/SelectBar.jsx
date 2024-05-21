import { useEffect, useState } from 'react';
import './SelectBar.scss';
import { CaretDownFill } from 'react-bootstrap-icons';

function SelectBar({ list, onChangeValue }) {

    const [selectList, setSelectList] = useState([]);
    const [openCheck, setOpenCheck] = useState(false);
    const [label, setLabel] = useState('선택');

    useEffect(() => {
        setSelectList(list);
    }, [])

    const onClickOpenCheck= ()=>{
        openCheck ? setOpenCheck(false) : setOpenCheck(true);
    }
    const onClickLabel = (item)=>{
        setLabel(item);
        setOpenCheck(false);
    }

    return (
        <div className='selectBar__container'>
            <div className='selectBar__btn' onClick={()=>onClickOpenCheck()}>
                {label} <CaretDownFill />
            </div>
            {openCheck && <div className='selectBar__table'>
            {selectList.map((item, idx) => {
                return (
                    <div key={idx} className='selectBar__item' onClick={()=>[onChangeValue(item.value), onClickLabel(item.label)]}>{item.label}</div>
                );
            })}
            </div>}
        </div >
    );
}
export default SelectBar;