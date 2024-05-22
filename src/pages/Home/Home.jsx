import MainColoList from "../../components/MainColoList";
import MainFundList from "../../components/MainFundList";
import './Home.scss';

function Home(){
    return(
        <div className="home__container">
            <MainFundList/>
            <MainColoList/>
        </div>
    );
}
export default Home;