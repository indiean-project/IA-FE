import './Concert.scss';
import test from './test.jpg'
const Concert = () => {
    return (
        <div className='board__concert__list'>
            <div className="concert__item">
                <a>
                    <img src={test} />
                    
                </a> 
            </div>      
        </div>       
    );
};

export default Concert;