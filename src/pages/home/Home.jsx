import './home.css'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { CircleChart } from '../../components/circleChart/CircleChart';
import {circleChartdata} from '../../dummyData'
import reportData from '../../dummyData';
import WidgetSmall from '../../components/widgetSmall/WidgetSmall';
import WidgetLarge from '../../components/widgetLarge/WidgetLarge';
import { ThemeContext } from "../../contexts/ThemeContext"
import { useContext } from 'react';
const Home= ()=>{
   const {theme,dispatch}=useContext(ThemeContext)
   
    return(
        <div className="home" id={theme.mode}>
         <FeaturedInfo/>
         <div className="homeCharts">
         <Chart data={reportData} title='Report Analytics'grid dataKey='Total Reports' dataKey2='Pending Reports' dataKey3='Fiexed Reports'></Chart>
        <CircleChart data={circleChartdata} title='circle'></CircleChart>
         </div>
        
        <div className="homeWidgets">
            <WidgetSmall/>
            <WidgetLarge/>
        </div>
   
        </div>
    )
}

export default Home;