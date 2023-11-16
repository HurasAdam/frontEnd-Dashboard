import "./ticketsList.css";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { ObjectDateToString } from "../../utils/ObjectDateToString";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { getTicketList } from "../../features/ticketApi/ticketApi";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";
import { AuthContext } from "../../contexts/AuthContext";
import noDataPlaceholder from "../../../public/img/empty.png";
import { useQuery, useQueryClient } from "react-query";
export const TicketsList = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    pageSize: 10,
    tickets: "",
  });

  const handleSelectPage = (e, action) => {
    e.preventDefault();
    setPageState({ ...pageState, page: action });
  };

  const noRowsOverlayStyle = {
    background: `url(${noDataPlaceholder})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: "0.3",
  };

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data:tickets,
  } = useQuery(["tickets"], getTicketList, {});


  const columns = [
    { field: "title", headerName: "Title", width: 200, flex: 0.9 },
    { field: "type", headerName: "Type", width: 100, flex: 0.9 },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => {
        return (
          <button className={params.row.status}>{params.row.status}</button>
        );
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 90,
      renderCell: (params) => {
        return (
          <button className={params.row.priority}>{params.row.priority}</button>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 160,
      flex: 0.5,
      valueFormatter: ({ value }) => ObjectDateToString(value.split(",")[0]),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/tickets/${params.row.id}/`}>
              <VisibilityOutlinedIcon className="TicketListActionIcon" />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="ticketsList" id={theme.mode}>
      <div className="actionWrapper">
        <span className="ticketListHeaderTitle">Current Tickets</span>
        <Link to="/Newticket">
          <button className="newTicketButton" id={theme.mode}>
            New ticket
          </button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {tickets ? (
        <DataGrid
          className="DataGrid"
          autoHeight={false}
          rowHeight={40}
          hideFooterSelectedRowCount={true}
          rows={tickets}
          getRowId={(row) => row.id}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
          hideFooter={true}
        
        />
      ) : null}
      <PaginationNavbar
        pageState={pageState}
        handleSelectPage={handleSelectPage}
        theme={theme}
      />
    </div>
  );
};
