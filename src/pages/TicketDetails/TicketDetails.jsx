import "./ticketDetails.css";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
export const TicketDetails = () => {
  const { ticketId } = useParams();
  const [isDisabled,setIsDisabled]=useState(true)
  const [updateError, setUpdateError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, isLoading, error] = useFetch(
    `http://localhost:3000/api/notes/${ticketId}`
  );
 
console.log(data)
  const handleDelete = async () => {
    const respone = await fetch(`http://127.0.0.1:3000/api/notes/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (respone.ok) {
      navigate("/tickets");
    }
  };

  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions=["Open","Closed"]

  const handleInputChange = (e, prop) => {
    const target = e.target;
    const value = target.value;
    data[prop] = value;
    console.log(data);
  };

  const handleDataUpdate = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/notes/${ticketId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      navigate("/tickets");
    }
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
          {data && (
            <div className="ticketDataContainerTop">
              <p>Project: {data.project.title}</p>
              <p>Project Leader: {`${data.project.createdBy.name} ${data.project.createdBy.surname}`}</p>
              <p className="ticketId">Ticket ID:{ticketId}</p>
            </div>
          )}
          <div className="ticektDataBottom">
            <form action="">
              <div className="ticketDataBottomItem">
                <label htmlFor="">Title</label>
                {data && (
                  <input
                  disabled={isDisabled}
                    type="text"
                    required
                    defaultValue={data.title}
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                )}
              </div>
              <div className="ticketDataBottomItem">
              <div className="ticketDataBottomItemWrapper">
                <div className="ticketDataBottomItemWrapper-select">
                  <label htmlFor="">Priority</label>

                  {data && (
                    <select
                    disabled={isDisabled}
                      className="selectTicketPriority"
                      onChange={(e) => handleInputChange(e, "priority")}
                      defaultValue={data.priority}
                    >
                      <option disabled selected>
                        {data.priority}
                      </option>

                      {data &&
                        priorityOptions
                          .filter((o) => o !== data.priority)
                          .map((option) => {
                            return <option key={option}>{option}</option>;
                          })}
                    </select>
                  )}
                </div>
                <div className="ticketDataBottomItemWrapper-select">
                <label htmlFor="">Status</label>
                {data&&<select 
                onChange={(e) => handleInputChange(e, "status")} 
                defaultValue={data.status}  
                className="selectTicketPriority"
                disabled={isDisabled}
                >
                <option disabled selected>{data.status}</option>
                 {statusOptions.filter((o)=>o!==data.status).map((option)=>{
                  return( 
                    <option>{option}</option>
                  )
                 })}

                </select>}
              </div>
              </div>
              </div>
              <div className="ticketDataBottomItem">
                <label htmlFor="">Description</label>
                {data && (
                  <textarea
                    onChange={(e) => handleInputChange(e, "description")}
                    defaultValue={data.description}
                    disabled={isDisabled}
                  ></textarea>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="ticketDataContainerRight">
          <div className="ticketInfoTop">
            <div className="ticketInfoItemsContainer">
              {data&&<span>Created By:{`${data.author.name} ${data.author.surname}`}</span>}

              <div className="ticketAuthorDataWrapper">
                <span className="ticketInfoAuthorName"></span>
                <span className="ticketInfoAuthorJobTitle"></span>
              </div>
            </div>
            {data&&<img src={data.author.userAvatar} className="ticketInfoTopImg" alt="" />}
          </div>
          <div className="ticketInfoBottom">
            <div className="ticketInfoBottomItem">
              <div className="ticketInfoBottomItem-span">
                <span>
                  <ScheduleOutlinedIcon />
                  Created:
                </span>
                {data && <span>{`${data.createdAt.Day}/${data.createdAt.Month}/${data.createdAt.Year}`}</span>}
              </div>

              <div className="ticketInfoBottomItem-span">
                <span>
                  <HistoryOutlinedIcon />
                  Updated:
                </span>
                {data && <span>{data.updatedAt}</span>}
              </div>
            </div>
            <div className="ticketInfoBottomItem">
              <div className="ticketInfoBottomItem-span">
                <span>
                  {" "}
                  <FlagOutlinedIcon />
                  Type:
                </span>
                {data && <span>{data.type}</span>}
              </div>
            </div>
            <div className="ticketInfoBottomItem">
              <span></span>
            </div>
          </div>
          {user.role==='admin'?<div className="ticketInfoButtonWrapper">
            <button onClick={handleDelete}>Delete</button>
           {isDisabled?<button onClick={()=>setIsDisabled(false)}>Edit</button>:<button disabled={isDisabled} onClick={()=>{setIsDisabled(true);handleDataUpdate()}}>Update</button>}
          </div>:null}
        </div>
      </div>
    </div>
  );
};
