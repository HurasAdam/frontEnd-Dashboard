import "../userList/userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";
import { useQuery } from "react-query";
import { getUsers } from "../../features/userApi/userApi";


import React from "react";




export const UserList = () => {
  const { isLoading, isError, error, data: userList } = useQuery(
    ["userList"],
    getUsers,
    {
      onSuccess: (data) => console.log(data),
    }
  );

  const columns = [
    
    { field: "name", headerName: "Name", width: 300 },
    { field: "surname", headerName: "Surname", width: 300 },
    { field: "userAvatar", headerName: "Photo", width: 150,renderCell:(params)=>{
      return(<>
      <img 
        className="userListUserImg"
      src={params?.row.userAvatar.url} alt="" />
      </>)
    } },
    { field: "email", headerName: "Email", width: 300 },
 ,
    { headerName:"Action", width:100, renderCell: (params) => {
      return (
        <>
          <Link to={`/user/${params.row._id}/`}>
            <VisibilityOutlinedIcon className="TicketListActionIcon" />
          </Link>
        </>
      );
    },
  },
    // Dodaj inne kolumny według potrzeb
  ];

  return (
    <div className="userList" style={{ height: 400, width: "100%" }}>
      <div className="userListHeaderWrapper">
      <span>Users</span>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {userList && (
        <DataGrid
        className="DataGrid"
        autoHeight={false}
        rowHeight={40}
       
        hideFooterSelectedRowCount={true}
        rows={userList&&userList}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
        hideFooter={true}
    
         
        />
      )}
    </div>
  );
};
