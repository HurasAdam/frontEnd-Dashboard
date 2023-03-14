
import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./projectList.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";


export const ProjectsList = () => {
    const [data,isLoading,error]=useFetch('http://127.0.0.1:3000/api/projects')

    console.log(data)
  const columns = [
    { field: "id", headerName: "ID", width: 200, flex: 0.7 },
    { field: "title", headerName: "Title", width: 300, flex: 0.9 },
    { field: "status", headerName: "Status", width: 50, flex: 0.5 },
    { field: "createdAt", headerName: "Date", width: 140, flex: 0.7 },
    {
      field: "action",
      headerName: "Action",
      width: "100",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/projects/${params.row.id}/`}>
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
        <span className="projectListHeaderTitle">Current Projects</span>
        <Link to="/NewProject">
          <button>New project</button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <DataGrid

          autoHeight={true}
          rowHeight={40}
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      )}
    </div>
  );
};
