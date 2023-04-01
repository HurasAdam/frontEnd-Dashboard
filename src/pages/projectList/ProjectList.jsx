import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./projectList.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const ProjectsList = () => {
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    pageSize: 10,
    projects: 0,
  });

  const prev = pageState.page <= 1 || pageState.total <= 1;
  const next = pageState.total <= 1 || pageState.page === pageState.total;

  const [data, isLoading, error] = useFetch(
    `http://127.0.0.1:3000/api/projects?page=${pageState.page}`
  );
  const { user } = useContext(AuthContext);

  const selectPage = (e, action) => {
    e.preventDefault();
    setPageState({ ...pageState, page: action });
  };

  useEffect(() => {
    if (data) {
      setPageState({
        ...pageState,
        total: data.total,
        pageSize: data.pageSize,
        projects: data.projects.length,
      });
    }
  }, [data]);

  console.log(data);

  const columns = [
    { field: "title", headerName: "Title", width: 300, flex: 0.4 },
    { field: "status", headerName: "Status", width: 50, flex: 0.2 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 140,
      flex: 0.5,
      valueFormatter: ({ value }) =>
        `${value.Day}/${value.Month}/${value.Year}`,
    },
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
        {user.role === "admin" ? (
          <Link to="/NewProject">
            <button>New project</button>
          </Link>
        ) : null}
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <DataGrid
          autoHeight={true}
          rowHeight={40}
          rows={data.projects}
          columns={columns}
          checkboxSelection={false}
          disableSelectionOnClick
          hideFooter={true}
        />
      )}
      <div className="navButtonsContainer">
        <button
          className={`${next}`}
          disabled={next}
          onClick={(e) => selectPage(e, pageState.page + 1)}
        >
          Next
        </button>
        <button
          className={`${prev}`}
          disabled={prev}
          onClick={(e) => selectPage(e, pageState.page - 1)}
        >
          Prev
        </button>
        {data && (
          <span>
            Page:{pageState.page}of {pageState.total}
          </span>
        )}
      </div>
    </div>
  );
};
