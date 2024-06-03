
import './ArtistTipLi.scss';

function ArtistTipLi({selected, artist ,idx,setSelected,handleDropDownClick}) {
    const onOff = selected === idx? true :false;
    
    return (
        
            <li className={onOff?"classLi on":"classLi"} onClick={()=>handleDropDownClick(artist)} onMouseOver={()=>setSelected(idx)} >{artist.artistName}</li>
        
    )
} 
export default ArtistTipLi;