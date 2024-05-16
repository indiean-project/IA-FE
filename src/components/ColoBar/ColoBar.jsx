import "./ColoBar.scss";


function ColoBar({list}) {
    let left = list.colLeftCount !== 0 ? list.colLeftCount/(list.colLeftCount + list.colRightCount)*100 - 5 : 0;
    let right = list.colRightCount !== 0 ? left + 10 : 100;
    let refColor = {
        background: `linear-gradient(90deg, #E3651D ${left}%, #D19E39, #BED754 ${right}%)`
    }
    return (
        <div className="coloBar__container">
            <label>{list.boardTitle}</label>
            <div className="coloBar__bar" style={refColor}>
                <div className="coloBar__bar__item">{list.colLeftCount}</div>
                <div className="coloBar__bar__item">{list.colRightCount}</div>
            </div>
            <div className="coloBar__content">
                <div>{list.colLeftTitle}</div>
                <div>{list.colRightTitle}</div>
            </div>
        </div>
    )
} export default ColoBar;