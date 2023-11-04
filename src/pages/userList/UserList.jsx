import "../userList/userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ThemeContext } from '../../contexts/ThemeContext'
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";

export const UserList = () => {
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    pageSize: 10,
    users: 0,
  });

  
  const {theme}=useContext(ThemeContext)
  const prev = pageState.page <= 1 || pageState.total <= 1;
  const next = pageState.total <= 1 || pageState.page === pageState.total;

  const handleSelectPage = (e, action) => {
    e.preventDefault();

    setPageState({ ...pageState, page: action });
  };

  const [data, error, isLoading] = useFetch(
    `http://127.0.0.1:3000/api/user?page=${pageState.page}`
  );

  useEffect(() => {
    if (data) {
      setPageState({
        ...pageState,
        total: data.total,
        pageSize: data.pageSize,
        users: data.users,
      });
    }
  }, [data]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  const columns = [
  
    {
      field: `name`,
      headerName: " Username",
      width: 250,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListUserImg"
              src={params.row.userAvatar}
              alt=""
            />
            {`${params.row.name} ${params.row.surname}`}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180, flex: 0.5 },

    {
      field: "role",
      headerName: "Role",
      width: 150,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/userDetails/${params.row._id}`,
              }}
            >
              <button
                // onClick={() => handleEditUser(params.row.id)}
                className="userListEdit"
              >
                View
              </button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
          <div id={theme.mode} className="userListHeaderTitleContainer"> <span className="userListHeaderTitle">Current users</span></div>
      {data && (
        <DataGrid
          className="DataGrid"
          autoHeight={false}
          getRowId={(row) => row._id}
          rows={data.users}
          columns={columns}
          pageSize={10}
        rowsPerPageOptions={[10]}
          disableSelectionOnClick
          hideFooter={true}
         
        />
      )}
<PaginationNavbar pageState={pageState} handleSelectPage={handleSelectPage} theme={theme}/>
    </div>
  );
};
