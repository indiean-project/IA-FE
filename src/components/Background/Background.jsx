import './Background.scss';
function Background(props){
    return(
        <div className='background__container'>
            <div className='background__box'>
            {props.children}
            </div>
        </div>
    );
}
export default Background;