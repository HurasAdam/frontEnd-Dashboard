import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const UserList = ({ setUserData }) => {
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    pageSize: 10,
    users: 0,
  });

  const prev = pageState.page <= 1 || pageState.total <= 1;
  const next = pageState.total <= 1 || pageState.page === pageState.total;

  const selectPage = (e, action) => {
    e.preventDefault();

    setPageState({ ...pageState, page: action });
  };

  const [data, error, isLoading] = useFetch(
    `http://127.0.0.1:3000/api/user?page=${pageState.page}`
  );

  const handleEditUser = (id) => {
    const targetedUser = data.filter((user) => user.id === id);
    const [user] = targetedUser;
  };

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

  console.log(data);
  const columns = [
    { field: "_id", headerName: "ID", width: 70, flex: 1 },
    {
      field: `name`,
      headerName: " Username",
      width: 250,
      flex: 1,
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
    { field: "email", headerName: "Email", width: 180, flex: 1 },

    {
      field: "role",
      headerName: "Role",
      width: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/user/${params.row._id}`,
              }}
            >
              <button
                onClick={() => handleEditUser(params.row.id)}
                className="userListEdit"
              >
                View
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
    <div className="userList">
      {data && (
        <DataGrid
          className="dataGrid"
          autoHeight={true}
          getRowId={(row) => row._id}
          rows={data.users}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          hideFooter={true}
        />
      )}
      <div className="userListButtonsContainer">
        <button disabled={next} className={`${next}`} onClick={(e) => selectPage(e, pageState.page + 1)}>Next</button>
        <button disabled={prev} className={`${prev}`} onClick={(e) => selectPage(e, pageState.page - 1)}>Prev</button>
      </div>
    </div>
  );
};

export default UserList;
