import './ConcertItem.scss';
import test from './test.jpg'
import { NavLink } from 'react-router-dom';
const Concert = (props) => {
    return (
        <div>
            <div className='board__concert__list'>
                {props.concertList.map((item,idx)=>{
                    
                    return(
                        <div className="concert__item" key={idx}>
                            <NavLink >
                                <img src={test}/>
                                <ul>
                                    <li className='concert__title'>{item.concertTitle}</li>                            
                                    <li className='concert__location'>LOCATION:{item.location}</li>
                                    <li className='concert__date'>{item.startDate}~{item.endDate}</li>                   
                                </ul>
                            </NavLink> 
                        </div>
                    )
                 })
                }
            </div>
        </div>     
    );
};

export default Concert;