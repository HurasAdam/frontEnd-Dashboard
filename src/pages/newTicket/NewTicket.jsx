import "./newTicket.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ThemeContext } from '../../contexts/ThemeContext'
import { useQuery } from "react-query";
import { getProjectListByMembership } from "../../features/projectApi/projectApi";
import { mutationHandler } from "../../shared/mutationHandler";
import { createTicket } from "../../features/ticketApi/ticketApi";
export const NewTicket = () => {
  const [newTicket, setNewTicket] = useState({});
  const [selectedProject,setSelectedProject]=useState('');
  const [title,setTitle]=useState('');
  const [priority,setPriority]=useState('');
  const [type,setType]=useState('');
  const [description,setDescription]=useState('');
 
  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery(["userProjects"], getProjectListByMembership, {});

  const createMutation=mutationHandler(createTicket,()=>{
    navigate('/tickets')
  })


const handleCreate=(e,{selectedProject,title,priority,type,description},mutation)=>{
  e.preventDefault();
const {value:project,label}=selectedProject
mutation.mutate({project,title,priority,type,description})

}



  const navigate = useNavigate();
  // const [data, isLoading, error] = useFetch(
  //   "http://127.0.0.1:3000/api/projects?projects=userProjects"
  // );
 

  const { user } = useContext(AuthContext);
const {theme}=useContext(ThemeContext)
  const handleNewTicket = (e, prop) => {
    const value = e.target.value;
    newTicket[prop] = value;
   
 
  };


  // const handleAddTicket = async () => {
  //   const response = await fetch("http://127.0.0.1:3000/api/notes", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify({ ...newTicket, author: user.email,project:choseProject.value }),
  //   });

  //   if (response.ok) {
  //     navigate("/tickets");
  //   }
  // };

  return (
    <div className="newTicket" id={theme.mode}>
       
          <h2>New Ticket</h2>
       
      <div className="newTicketConent">
       <div className="newTicketTop">
          <Link to="/tickets">
            <button>X</button>
          </Link>
          </div>
        <div className="newTicketBottom">
          <div className="newTicketItem">
            <label htmlFor="">Choose project</label>
            {data && (
              <Select
              onChange={setSelectedProject}
                options={data.map((ob) => {
                  return { value: ob.id, label: ob.title };
                })}
              ></Select>
            )}
          </div>
          <div className="newTicketItem">
            <label className="newTicketItemLabel" htmlFor="">
              Title
            </label>
            <input type="text" minLength={5} maxLength={50} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div className="newTicketItem">
            <div className="newTicketItemWrapper">
            <div className="newTicketItemSelectWrapper">
            <label className="newTicketItemLabel" htmlFor="">
              Priority
            </label>
        
          <select  onChange={(e)=>setPriority(e.target.value)}>
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
            onChange={(e)=>setType(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            
          </div>
     
          </div>
        </div>
        <div className="newTicketAction">
          <button 
          className="newTicketSave" 
          onClick={(e)=>handleCreate(e,{selectedProject,title,priority,type,description},createMutation)}
          
          >
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
