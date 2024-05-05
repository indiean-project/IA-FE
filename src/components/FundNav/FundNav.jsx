import { useRef } from 'react';
import './FundNav.scss';
function FundNav({nav, onClickNav}) {


    return (
        <div className='fundNav__box'>
            {
                nav.map((item, idx)=>{
                    return(
                        <div key={idx} onClick={()=>onClickNav(idx)}>
                            {item.value}
                        </div>
                    );
                })
            }
        </div>
    );
}
export default FundNav;