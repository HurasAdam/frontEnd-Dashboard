import './newTicket.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export const NewTicket=()=>{

    const [newTicket,setNewTicket]=useState({title:'',priority:'',type:'',description:''})

    const handleNewTicket=(e,prop)=>{
    
const value= e.target.value;
newTicket[prop]=value
console.log(newTicket)
    }

    return(
        <div className="newTicket">
            <div className="newTicketConent">
        <div className="newTicketTop">
            <span>New Ticket</span>
            <Link to='/tickets'>
            <button>X</button>
            </Link>
        </div>
        <div className="newTicketBottom">
        <div className="newTicketItem">
            <label className='newTicketItemLabel' htmlFor="">Title</label>
            <input type="text" onChange={(e)=>handleNewTicket(e,'title')}/>
        </div>
        <div className="newTicketItem">
        <label className='newTicketItemLabel'htmlFor="">Priority</label>
            <input type="text" onChange={(e)=>handleNewTicket(e,'priority')}/>
        </div>
        <div className="newTicketItem">
        <label className='newTicketItemLabel' htmlFor="">Type</label>
            <input type="text" onChange={(e)=>handleNewTicket(e,'type')} />
        </div>
        <div className="newTicketItemDescripion">
        <label className='newTicketItemLabel' htmlFor="">Description</label>
          <textarea  name="" id="" cols="180" rows="10" onChange={(e)=>handleNewTicket(e,'description')}></textarea>
        </div>
        </div>
        <div className="newTicketAction">
            <button className='newTicketSave'>Save</button>
            <button className='newTicketCancel'>Cancel</button>
        </div>
        </div>
        </div>
    )
}