import './ConcertList.scss';
import Concert from '../../components/Concert';
function ConcertList(){
   
    return(
        <div className='concert__list'>
            <div className='title'>
                <h1>CONCERT LIST</h1>
                <input className='concert__search' type="text" name="" placeholder='검색어를 입력하세요'/>
            </div>
            <div className='btn__area'>
                <div>
                    <select name="score" id="select-id">
                        <option value="A">최신순</option>
                        <option value="B">지역별</option>
                        <option value="C">추천순</option>
                    </select> &nbsp;
                    <span>정렬</span>
                </div>
                <button>공연문의</button>
            </div>
            <Concert></Concert>

        </div>
       
    );
}
export default ConcertList;