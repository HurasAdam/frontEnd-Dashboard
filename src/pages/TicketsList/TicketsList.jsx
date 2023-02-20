import "./ticketsList.css";

import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { userRows, ticketRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const TicketsList = ({ setEditTicketData }) => {
  const [data, setData] = useState(ticketRows);

  useEffect(()=>{
    getTicket()
  })

const getTicket=()=>{
  fetch('http://127.0.0.1:3000/api/notes/')
  .then((res)=>res.json())
  .then((res)=>console.log(res))
  // .then((res)=>setData(res))
}

  const handleEditUser = (id) => {
    const targetedUser = data.filter((user) => user.id === id);
    const [user] = targetedUser;
    setEditTicketData(user);
    console.log(user);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150, flex: 1 },
    { field: "title", headerName: " Title", width: 280, flex: 1 },
    { field: "status", headerName: "Status", width: 120, flex: 1 },
    { field: "priority", headerName: "Priority", width: 160, flex: 1 },
    { field: "date", headerName: "Date", width: 170, flex: 1 },
    {
      field: "author",
      headerName: "Author",
      width: 250,
      flex: 1,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.author}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/tickets/${params.row.id}`,
              }}
            >
              <button
                onClick={() => handleEditUser(params.row.id)}
                className="userListEdit"
              >
                Edit
              </button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete "
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="ticketsList">
      <div className="actionWrapper">
        <span className="ticketListHeaderTitle">Current Tickets</span>
        <Link to='/Newticket'>
        <button>New ticket</button>
        </Link>
      </div>

      <DataGrid
        autoHeight={true}
        className="dataGrid"
        rows={data}
        columns={columns}
        pageSize={13}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
