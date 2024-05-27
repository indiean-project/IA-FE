
import './ArtistTipLi.scss';

function ArtistTipLi({selected, item ,idx,setSelected,handleDropDownClick}) {
    const onOff = selected === idx? true :false;
    
    return (
        
            <li className={onOff?"on":""} onClick={()=>handleDropDownClick(item)} onMouseOver={()=>setSelected(idx)} >{item}</li>
        
    )
} 
export default ArtistTipLi;