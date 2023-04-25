import "./newTicket.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";

export const NewTicket = () => {
  const [newTicket, setNewTicket] = useState({});
  const [choseProject,setChoseProject]=useState()
 
  const navigate = useNavigate();
  const [data, isLoading, error] = useFetch(
    "http://127.0.0.1:3000/api/projects?projects=userProjects"
  );
  console.log(data);

  const { user } = useContext(AuthContext);

  const handleNewTicket = (e, prop) => {
    const value = e.target.value;
    newTicket[prop] = value;
   
 
  };


  const handleAddTicket = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ ...newTicket, author: user.email,project:choseProject.value }),
    });

    if (response.ok) {
      navigate("/tickets");
    }
  };

  return (
    <div className="newTicket">
      <div className="newTicketConent">
        <div className="newTicketTop">
          <span>New Ticket</span>
          <Link to="/tickets">
            <button>X</button>
          </Link>
        </div>
        <div className="newTicketBottom">
          <div className="newTicketItem">
            <label htmlFor="">Choose project</label>
            {data && (
              <Select
              onChange={setChoseProject}
                options={data.map((ob) => {
                  return { value: ob.id, label: ob.projectTitle };
                })}
              ></Select>
            )}
          </div>
          <div className="newTicketItem">
            <label className="newTicketItemLabel" htmlFor="">
              Title
            </label>
            <input type="text" onChange={(e) => handleNewTicket(e, "title")} />
          </div>
          <div className="newTicketItem">
            <div className="newTicketItemWrapper">
            <div className="newTicketItemSelectWrapper">
            <label className="newTicketItemLabel" htmlFor="">
              Priority
            </label>
        
          <select  onChange={(e)=>handleNewTicket(e,'priority')}>
          <option value="" disabled selected>None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          </div>
          <div className="newTicketItemSelectWrapper">
          <label className="newTicketItemLabel" htmlFor="">
              Type
            </label>
            <select 
            onChange={(e)=>handleNewTicket(e,'type')}
            >
              <option value="" disabled selected>None</option>
<option value="Bug">Bug</option>
<option value="Enhancement">Enhancement</option>
<option value="Question">Question</option>

            </select>
            </div>
          </div>
  
          <div className="newTicketItemDescripion">
            <label className="newTicketItemLabel" htmlFor="">
              Description
            </label>
            <textarea
              name=""
              id=""
              rows={25}
              onChange={(e) => handleNewTicket(e, "description")}
            ></textarea>
          </div>
          </div>
        </div>
        <div className="newTicketAction">
          <button className="newTicketSave" onClick={handleAddTicket}>
            Save
          </button>
          <button
            className="newTicketCancel"
            onClick={() => navigate("/tickets")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
