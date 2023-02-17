import './home.css'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
const Home= ()=>{

    return(
        <div className="home">
         <FeaturedInfo/>
         <Chart></Chart>
        </div>
    )
}

export default Home;