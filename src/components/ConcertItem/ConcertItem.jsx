import './ConcertItem.scss';
import test from './test.jpg'
import { useNavigate } from 'react-router-dom';
const Concert = (props) => {
    const navigate = useNavigate();
    const handleDetailPost = ({ concert }) => {
        const concertNo = concert.concertNo;
        navigate('/concert/detail/'+concertNo);    
      };
    return (
        <div>
            <div className='board__concert__list'>
                {props.concertList.map((concert,idx)=>{
                    
                    return(
                        <div className="concert__item" key={idx} onClick={()=>{handleDetailPost({concert})}}>
                            <div>
                                <img src={test}/>
                                <ul>
                                    <li className='concert__title'>{concert.concertTitle}</li>                            
                                    <li className='concert__location'>LOCATION:{concert.location}</li>
                                    <li className='concert__date'>{concert.startDate}~{concert.endDate}</li>                   
                                </ul>
                            </div> 
                        </div>
                    )
                 })
                }
            </div>
        </div>     
    );
};

export default Concert;