
import './ArtistTipLi.scss';

function ArtistTipLi({selected, item ,idx,setSelected}) {
    const onOff = selected === idx? true :false;
    
    return (
        
            <li className={onOff?"on":""} onMouseOver={()=>setSelected(idx)} >{item}</li>
        
    )
} 
export default ArtistTipLi;