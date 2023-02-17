import './featuredInfo.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const FeaturedInfo=()=>{

    return(
        <div className="featuredInfo">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
        
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$3.450</span>
                <span className="featuredMoneyRate">-14.4 <ArrowDownwardIcon className='featuredIcon negative'/></span>
            </div>
            <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
        
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$3.450</span>
                <span className="featuredMoneyRate">-14.4 <ArrowDownwardIcon className='featuredIcon negative'/></span>
            </div>
            <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
        
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$3.450</span>
                <span className="featuredMoneyRate">-14.4 <ArrowUpwardIcon className='featuredIcon'/></span>
            </div>
            <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
        
        
    )
}

export default FeaturedInfo;