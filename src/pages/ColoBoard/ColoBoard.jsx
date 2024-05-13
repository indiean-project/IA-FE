import { NavLink } from "react-router-dom";
import BoardSidebar from "../../components/BoardSidebar";
import ColoBar from "../../components/ColoBar";
import "./ColoBoard.scss";

function ColoBoard() {
    return (

        <div className="coloBoard__container">
            <div className="coloBoard__box">
                <BoardSidebar />
                <div className="coloBoard__items">
                    <div className="coloBoard__item1">
                        <div>
                            <label>콜로세움</label>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="boardNo">최신순</option>
                                <option value="">인기순</option>
                            </select>
                        </div>
                    </div>
                    <div className='coloBoard__item1'>
                        <div className='coloBoard__category'>커뮤니티 &gt; 콜로세움</div>
                        <div className='coloBoard__btn'><NavLink to={"/board/enroll"}>글쓰기</NavLink></div>
                    </div>
                    <hr />
                    <div className="coloBoard__items__area">
                        <div className="coloBoard__item2">
                            <div>No3469</div>
                            <div>user01</div>
                            <div>2024-04-23</div>
                            <div>아이콘 아이콘</div>
                        </div>
                        <ColoBar />
                    </div>
                </div>
            </div>
        </div>

    )
} export default ColoBoard;