import './ConcertItem.scss';
import { useNavigate } from 'react-router-dom';
import baseImg from '../../assets/logo/logo_white.png';
const Concert = (props) => {
    const navigate = useNavigate();
    const handleDetailPost = ({ concert }) => {
        const concertNo = concert.concertNo;
        navigate('/concert/detail/'+concertNo);    
      };
  
    return (
        <div>
            <div className='board__concert__list'>
                {props.concertList.length >0 ? props.concertList.map((concert,idx)=>{
                    
                    return(
                        <div className="concert__item" key={idx} onClick={()=>{handleDetailPost({concert})}}>
                            <div>
                                <img src={concert.titleUrl!==null?concert.titleUrl:baseImg}/>
                                <ul>
                                    <li className='concert__title'>{concert.concertTitle}</li>                            
                                    <li className='concert__location'>LOCATION:{concert.location}</li>
                                    <li className='concert__date'>{concert.startDate}~{concert.endDate}</li>                   
                                </ul>
                            </div> 
                        </div>
                    )
                 }):""
                }
            </div>
        </div>     
    );
};

export default Concert;