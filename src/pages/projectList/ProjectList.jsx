
import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./projectList.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export const ProjectsList = () => {
    const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/projects')
  const columns = [
    { field: "id", headerName: "ID", width: 200, flex: 0.9 },
    { field: "title", headerName: "Title", width: 200, flex: 0.9 },
    { field: "status", headerName: "Status", width: 90, flex: 0.9 },
    { field: "createdAt", headerName: "Date", width: 160, flex: 0.9 },
    {
      field: "action",
      headerName: "Action",
      width: "100",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/project/${params.row.id}/`}>
              <VisibilityOutlinedIcon className="TicketListActionIcon" />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="projectList">
      <div className="actionWrapper">
        <span className="projectListHeaderTitle">Current Tickets</span>
        <Link to="/Newticket">
          <button>New project</button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <DataGrid
          autoHeight={false}
          rowHeight={40}
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  );
};
