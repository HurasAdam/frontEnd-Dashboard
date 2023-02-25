import "./ticketDetails.css";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
export const TicketDetails = () => {
  const { ticketId } = useParams();
  const [data, isLoading, error] = useFetch(
    `http://localhost:3000/api/notes/${ticketId}`
  );
const [isUpdated,setIsUpdated]=useState(false); 

  const history = useHistory();
  const handleDelete = () => {
    fetch(`http://127.0.0.1:3000/api/notes/${ticketId}`, {
      method: "DELETE",
    }).then(() => history.push("/tickets"));
  };

const handleInputChange=(e,prop)=>{
const target=e.target
const value=target.value;
data[prop]=value
setIsUpdated(true);

}
 
  const handleDataUpdate = () => {

    isUpdated?
    fetch(`http://127.0.0.1:3000/api/notes/${ticketId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),})
      .then(()=>history.push('/tickets')) :console.log('Edit data before update')
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
                {data && (
                  <input
                    type="text"
                    required
                    placeholder={data.title}
                    onChange={(e) => handleInputChange(e, "title") }
                  />
                )}
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Status</label>
                {data && <input type="text" onChange={(e)=>handleInputChange(e,'status')} placeholder={data.status}  />}
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Priority</label>
                {data && <input type="text" onChange={(e)=>handleInputChange(e,'priority')} placeholder={data.priority} />}
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Date</label>
                {data && <input type="text" onChange={(e)=>handleInputChange(e,'date')} placeholder={data.date} />}
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Description</label>
                {data && <textarea onChange={(e)=>handleInputChange(e,'description')} placeholder={data.description}></textarea>}
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
            <button onClick={handleDataUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};
