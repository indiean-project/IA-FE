import BoardSidebar from "../../components/BoardSidebar";
import ColoBar from "../../components/ColoBar";
import "./ColoBoard.scss";

function ColoBoard() {
    return (

        <div className="coloBoard__container">
            <div className="coloBoard__box">
                <BoardSidebar />
                <div className="coloBoard__area">
                    <div>
                        <label>콜로세움</label>
                    </div>
                    <div>
                        <select name="" id="">
                            <option value="boardNo">최신순</option>
                            <option value="">인기순</option>
                        </select>
                    </div>
                    <div className="coloBoard__items">
                        <ColoBar />
                    </div>
                </div>
            </div>
        </div>

    )
} export default ColoBoard;