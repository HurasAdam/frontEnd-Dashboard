import "./ticketDetails.css";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { useParams,useHistory } from "react-router-dom";
export const TicketDetails = () => {

  const { ticketId } = useParams();
const history=useHistory();
  const handleDelete = () => {
    fetch(`http://127.0.0.1:3000/api/notes/${ticketId}`, {
      method: "DELETE",
    }).then(() => history.push('/tickets')
    );
  };

  return (
    <div className="ticketDetails">
      <div className="ticketHeaderContainer">
        <span className="ticketHeaderIcon">
          <BugReportOutlinedIcon className="headerIcon" />
        </span>

        <h3 className="ticketHeaderTitle">Edit Ticket</h3>
      </div>
      <div className="ticketDataContainer">
        <div className="ticketDataContainerLeft">
          <div className="ticketDataContainerTop">
            <h4 className="ticketId">Ticket ID:{ticketId}</h4>
          </div>
          <div className="ticektDataBottom">
            <form action="">
              <div className="ticketDataBottomItem">
                <label htmlFor="">Title</label>
                <input type="text" />
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Status</label>
                <input type="text" />
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Priority</label>
                <input type="text" />
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Date</label>
                <input type="text" />
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Description</label>
                <textarea></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="ticketDataContainerRight">
          <div className="ticketInfoTop">
            <div className="ticketInfoItemsContainer">
              <span>Created By:</span>

              <div className="ticketAuthorDataWrapper">
                <span className="ticketInfoAuthorName"></span>
                <span className="ticketInfoAuthorJobTitle"></span>
              </div>
            </div>
            <img src="" className="ticketInfoTopImg" alt="" />
          </div>
          <div className="ticketInfoBottom">
            <div className="ticketInfoBottomItem">
              <ScheduleOutlinedIcon />
              <span></span>
            </div>
            <div className="ticketInfoBottomItem">
              <FlagOutlinedIcon />
              <span></span>
            </div>
            <div className="ticketInfoBottomItem">
              <span></span>
            </div>
          </div>
          <div className="ticketInfoButtonWrapper">
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
