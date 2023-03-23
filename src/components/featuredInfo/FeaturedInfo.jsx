import './featuredInfo.css';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { useFetch } from '../../hooks/useFetch';
const FeaturedInfo=()=>{


const [data,isLoading,Error]=useFetch("http://127.0.0.1:3000/api/stats")





    return(
        <div className="featuredInfo">
            <div className="featuredItem">
                <span className="featuredTitle">Total reports</span>
        
           {data&& <div className="featuredMoneyContainer">
                <span className="featuredMoney">{data.totalTickets}</span>
                <span className="featuredMoneyRate"><FlagOutlinedIcon className='featuredIcon total'/></span>
            </div>}
            <span className="featuredSub">This month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Pending...</span>
        
            {data&&<div className="featuredMoneyContainer">
                <span className="featuredMoney">{data.ticketsOpen}</span>
                <span className="featuredMoneyRate"><AutorenewOutlinedIcon className='featuredIcon negative'/></span>
            </div>}
            <span className="featuredSub">This month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Fixed</span>
        
            {data&&<div className="featuredMoneyContainer">
                <span className="featuredMoney">{data.ticketsClosed}</span>
                <span className="featuredMoneyRate"><DoneOutlineOutlinedIcon className='featuredIcon'/></span>
            </div>}
            <span className="featuredSub">This month</span>
            </div>
        </div>
        
        
    )
}

export default FeaturedInfo;