import { useEffect } from "react";
import "./ColoBar.scss";


function ColoBar({list}) {
    return (
        <div className="coloBar__container">
            <label>{list.boardTitle}</label>
            <div className="coloBar__bar">
                <div className="coloBar__bar__item">128
                </div>
                <div className="coloBar__bar__item">83</div>
            </div>
            <div className="coloBar__content">
                <div>{list.colLeftTitle}</div>
                <div>{list.colRightTitle}</div>
            </div>
        </div>
    )
} export default ColoBar;