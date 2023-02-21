import './ticketDetails.css';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

export const TicketDetails=({EditTicketData})=>{
    return(
        <div className="ticketDetails">
          <div className="ticketHeaderContainer">
          <span className='ticketHeaderIcon'><BugReportOutlinedIcon className='headerIcon'/></span>

            <h3 className='ticketHeaderTitle'>Edit Ticket</h3>
       
          </div>
          <div className="ticketDataContainer">
            <div className="ticketDataContainerLeft">
                <div className="ticketDataContainerTop">
                    <h4 className="ticketId">Ticket ID: {EditTicketData.id}</h4>
                </div>
                <div className="ticektDataBottom">
                    <form action="">
                     
                     <div className="ticketDataBottomItem">
                     <label htmlFor="">Title</label>
                        <input type="text" placeholder={EditTicketData.title} />
                     </div>
                     <div className="ticketDataBottomItem">
                     <label htmlFor="">Status</label>
                        <input type="text" placeholder={EditTicketData.status}/ >
                     </div>
                     <div className="ticketDataBottomItem">
                     <label htmlFor="">Priority</label>
                        <input type="text" placeholder={EditTicketData.priority}/>
                     </div>
                     <div className="ticketDataBottomItem">
                     <label htmlFor="">Date</label>
                        <input type="text" placeholder={EditTicketData.date}/>
                     </div>
                     <div className="ticketDataBottomItem">
                     <label htmlFor="">Description</label>
                        <textarea placeholder={EditTicketData.description} name="" id="" cols="30" rows="10"></textarea>
                     </div>
                    </form>
                </div>
            </div>
            <div className="ticketDataContainerRight">
<div className="ticketInfoTop">



<div className="ticketInfoItemsContainer">
    
        <span>Created By:</span>
   
<div className="ticketAuthorDataWrapper">
<span className='ticketInfoAuthorName'>{EditTicketData.author}</span>
<span className='ticketInfoAuthorJobTitle'>{EditTicketData.jobTitle}</span>
</div>
</div>
<img src={`../${EditTicketData.avatar}`} className='ticketInfoTopImg' alt="" />
</div>
<div className="ticketInfoBottom">
    <div className="ticketInfoBottomItem">
        <ScheduleOutlinedIcon/>
        <span>{EditTicketData.date}</span>
    </div>
    <div className="ticketInfoBottomItem">
        <FlagOutlinedIcon/>
        <span>{EditTicketData.type}</span>
        </div>
    <div className="ticketInfoBottomItem"><span></span></div>
</div>
<div className="ticketInfoButtonWrapper">
   <button>asdsfsdf</button>
</div>
            </div>
          </div>
        </div>
    )
}