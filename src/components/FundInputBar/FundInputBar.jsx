import { useEffect, useRef } from 'react';
import './FundInputBar.scss';

function FundInputBar({width, type, paddingLeft, name, value, onChangeValue, disabled}) {

    const style = {
        width: width,
        paddingLeft: paddingLeft
    }

    return (
        <div className="fund__input" style={style}>
            <input type={type} 
                    name={name} 
                    value={value} 
                    onChange={(e)=>onChangeValue(e)}
                    disabled={disabled}/>
        </div>
    );
}
export default FundInputBar;