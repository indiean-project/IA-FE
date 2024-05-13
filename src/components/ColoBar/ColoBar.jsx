import "./ColoBar.scss";

function ColoBar() {
    return (
        <div className="coloBar__container">
            <label>베이스 연주는...</label>
            <div className="coloBar__bar">
                <div className="coloBar__bar__item">128
                </div>
                <div className="coloBar__bar__item">83</div>
            </div>
            <div className="coloBar__content">
                <div>핑거링이 근본이다.</div>
                <div>피킹이 진짜 연주다.</div>
            </div>
        </div>
    )
} export default ColoBar;