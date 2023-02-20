import './featuredInfo.css';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

const FeaturedInfo=()=>{

    return(
        <div className="featuredInfo">
            <div className="featuredItem">
                <span className="featuredTitle">Total reports</span>
        
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">230</span>
                <span className="featuredMoneyRate"><FlagOutlinedIcon className='featuredIcon total'/></span>
            </div>
            <span className="featuredSub">This month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Pending...</span>
        
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">150</span>
                <span className="featuredMoneyRate"><AutorenewOutlinedIcon className='featuredIcon negative'/></span>
            </div>
            <span className="featuredSub">This month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Fixed</span>
        
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">80</span>
                <span className="featuredMoneyRate"><DoneOutlineOutlinedIcon className='featuredIcon'/></span>
            </div>
            <span className="featuredSub">This month</span>
            </div>
        </div>
        
        
    )
}

export default FeaturedInfo;