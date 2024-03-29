import { DataGrid } from "@mui/x-data-grid";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import "../adminPanel/adminPanel.css";
import { AuthContext } from "../../contexts/AuthContext";

export const AdminPanel = () => {
  const [data, error, isLoading] = useFetch("http://127.0.0.1:3000/api/user");
  const [isDisabled, setIsDisabled] = useState(true);
  const [userRole, setUserRole] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const { user } = useContext(AuthContext);


  const handleRoleUpdate = async (e) => {
    const response = await fetch(`http://127.0.0.1:3000/api/user/manageRole`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },

      body: JSON.stringify({
        selectedUser: selectedUser,
        role: userRole,
      }),
    });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150, flex: 0.4 },
    { field: "surname", headerName: "Surname", width: 50, flex: 0.5 },
    { field: "email", headerName: "Email", width: 80, flex: 0.4 },

    {
      field: "role",
      headerName: "Action",
      width: "400",
      renderCell: (params) => {
        return (
          <>
            <select
              defaultValue={params.row.role}
              className="selectRole"
              name=""
              id=""
              onChange={(e) => {
                setUserRole(e.target.value);
                setSelectedUser(params.row._id);
                console.log(params.row.role);
              }}
            >
              <option key="user" value="user">
                user
              </option>
              <option key="admin" value="admin">
                admin
              </option>
            </select>
            <button className="changeRoleBtn" onClick={handleRoleUpdate}>
              Save
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="adminPanel">
      <div className="adminPanelHeaderTitle">
      <span>Manage Roles</span>
      </div>
      <div className="dataGrid">
        {data && (
          <DataGrid
          className="DataGrid"
            autoHeight={false}
            rowHeight={40}
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            disableSelectionOnClick
            hideFooter={true}
          />
        )}
      </div>
   

    </div>
  );
};
