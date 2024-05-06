import './ConcertItem.scss';
import test from './test.jpg'
import { NavLink } from 'react-router-dom';
const Concert = () => {
    return (
        <div>
            <div className='board__concert__list'>
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>
                                                       
                        </ul>
                    </NavLink> 
                </div> 
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                           
                        </ul>
                    </NavLink> 
                </div>     
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                           
                        </ul>
                    </NavLink> 
                </div>
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                          
                        </ul>
                    </NavLink> 
                </div> 
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                           
                        </ul>
                    </NavLink> 
                </div> 
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                           
                        </ul>
                    </NavLink> 
                </div>
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                           
                        </ul>
                    </NavLink> 
                </div> 
                <div className="concert__item">
                    <NavLink>
                        <img src={test}/>
                        <ul>
                            <li className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</li>                            
                            <li className='concert__location'>LOCATION:오방가르드</li>
                            <li className='concert__date'>2024.5.3~2024.5.3</li>                             
                        </ul>
                    </NavLink> 
                </div> 
            </div>
        </div>     
    );
};

export default Concert;