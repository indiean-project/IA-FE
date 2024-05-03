import './Concert.scss';
import test from './test.jpg'
import { NavLink } from 'react-router-dom';
const Concert = () => {
    return (
        <div className='board__concert__list'>
            <div className="concert__item">
                <NavLink>
                    <img src={test}/>
                    <div className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</div>
                    <br></br>
                    <div className='concert__date'>START:2024년 5월 3일 금요일</div>
                    <div className='concert__date'>END:2024년 5월 3일 금요일</div>
                    <br></br>
                    <div className='concert__location'>LOCATION:오방가르드</div>
                </NavLink> 
            </div> 
            <div className="concert__item">
                <NavLink>
                    <img src={test}/>
                    <div className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</div>
                    <br></br>
                    <div className='concert__date'>START:2024년 5월 3일 금요일</div>
                    <div className='concert__date'>END:2024년 5월 3일 금요일</div>
                    <br></br>
                    <div className='concert__location'>LOCATION:오방가르드</div>
                </NavLink> 
            </div>     
            <div className="concert__item">
                <NavLink>
                    <img src={test}/>
                    <div className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</div>
                    <br></br>
                    <div className='concert__date'>START:2024년 5월 3일 금요일</div>
                    <div className='concert__date'>END:2024년 5월 3일 금요일</div>
                    <br></br>
                    <div className='concert__location'>LOCATION:오방가르드</div>
                </NavLink> 
            </div>
            <div className="concert__item">
                <NavLink>
                    <img src={test}/>
                    <div className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</div>
                    <br></br>
                    <div className='concert__date'>START:2024년 5월 3일 금요일</div>
                    <div className='concert__date'>END:2024년 5월 3일 금요일</div>
                    <br></br>
                    <div className='concert__location'>LOCATION:오방가르드</div>
                </NavLink> 
            </div> 
            <div className="concert__item">
                <NavLink>
                    <img src={test}/>
                    <div className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</div>
                    <br></br>
                    <div className='concert__date'>START:2024년 5월 3일 금요일</div>
                    <div className='concert__date'>END:2024년 5월 3일 금요일</div>
                    <br></br>
                    <div className='concert__location'>LOCATION:오방가르드</div>
                </NavLink> 
            </div> 
            <div className="concert__item">
                <NavLink>
                    <img src={test}/>
                    <div className='concert__title'>부산 6eyes 내한 with 소음발광, 칩앤스위트</div>
                    <br></br>
                    <div className='concert__date'>START:2024년 5월 3일 금요일</div>
                    <div className='concert__date'>END:2024년 5월 3일 금요일</div>
                    <br></br>
                    <div className='concert__location'>LOCATION:오방가르드</div>
                </NavLink> 
            </div>           
        </div>       
    );
};

export default Concert;