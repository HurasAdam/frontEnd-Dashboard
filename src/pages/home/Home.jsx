import "./home.css";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { CircleChart } from "../../components/circleChart/CircleChart";
import { circleChartdata } from "../../dummyData";
import reportData from "../../dummyData";
import {Donut} from '../../components/donutChart/Donut'
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
const Home = () => {
  const [data, isLoading, Error] = useFetch("http://127.0.0.1:3000/api/stats");
  const [stats, setStats] = useState();
  const { theme, dispatch } = useContext(ThemeContext);


  useEffect(() => {
    if (data) {
      const tickets = data.filter(
        (ob) =>
          ob.name === "ticketsOpen" ||
          ob.name === "ticketsClosed" ||
          ob.name === "totalTickets"
      );
      const type = data.filter(
        (ob) =>
          ob.name === "Bug" ||
          ob.name === "Enhancement" ||
          ob.name === "Question"
      );

      setStats({ ...stats, tickets: [...tickets], type: [...type] });
    }
  }, [data]);

  return (
    <div className="home" id={theme.mode}>
      <div className="mainDash">
        <div className="mainDash-top">
        <FeaturedInfo
          data={
            stats &&
            stats.tickets.reduce((obj, item) => {
              obj[item.name] = item.value;
              return obj;
            }, {})
          }
        />
        </div>
        <div className="homeWidgets">
          <WidgetLarge stats={stats} />
       
        </div>
      </div>
      <div className="homeCharts">
        {/* <Chart data={reportData} title='Report Analytics'grid dataKey='Total Reports' dataKey2='Pending Reports' dataKey3='Fiexed Reports'></Chart> */}
  <Donut></Donut>
  <WidgetSmall />
      </div>
    </div>
  );
};

export default Home;
