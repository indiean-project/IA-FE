import { useEffect, useRef, useState } from 'react';
import './FundNav.scss';
function FundNav({nav, onClickNav, fundNavRef}) {


    return (
        <div className='fundNav__box'>
            {
                nav.map((item, idx)=>{
                    return(
                        <div key={idx} 
                            onClick={()=>onClickNav(idx)}
                            ref={(e)=>(fundNavRef.current[idx]=e)}>
                            {item.value}
                        </div>
                    );
                })
            }
        </div>
    );
}
export default FundNav;