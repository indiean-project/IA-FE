import FundItem from '../../components/FundItem';
import Background from '../../components/Background';
import './FundList.scss';
import { CaretDownFill, Search } from 'react-bootstrap-icons';
import { PuffLoader } from 'react-spinners';

function FundList() {
    return (
        <Background>
            <div className='fundList__container'>
                <h1>아티스트 펀딩</h1>
                <h3>아티스트를 펀딩하고 다양한 리워드를 만나보세요!</h3>
                <div className='fundList__form'>
                    <div className='fundList__form__input'>
                        <input type="text" placeholder='키워드를 입력하세요.' />
                        <div className='fundList__form__icon'>
                            <Search size={25} />
                        </div>
                    </div>
                    <div className='select__box'>필터 < CaretDownFill /> </div>
                </div>
                <div className='fundList__compYn'>
                    <div>진행중</div>
                    <div>마감</div>
                </div>
                <div className='fundList__hot'>
                    <div className='fundList__hot__header'>
                        <p>마감임박 펀딩 리워드를 확인해보세요!</p>
                        <div className='fundList__form__btn'>
                            펀딩 신청하기
                        </div>
                    </div>
                    <div className='fundList__hot__items'>
                        <FundItem />
                        <FundItem />
                        <FundItem />
                        <FundItem />
                    </div>
                </div>
                <div className='fundList__sort'>
                    <div className='select__box'>최신순 < CaretDownFill /> </div>
                    <p>정렬</p>
                </div>
                <div className='fundList__general'>
                    <FundItem />
                    <FundItem />
                    <FundItem />
                    <FundItem />
                    <FundItem />
                    <FundItem />
                    <FundItem />
                    <FundItem />
                </div>
                <div className='spinner'>
                    <PuffLoader color='#F2613F' />
                </div>
            </div>
        </Background>
    );
}
export default FundList;