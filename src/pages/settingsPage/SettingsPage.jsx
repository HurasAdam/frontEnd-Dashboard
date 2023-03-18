import { DataGrid } from "@mui/x-data-grid"
import { useFetch } from "../../hooks/useFetch";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import "../settingsPage/settingsPage.css"


export const SettingsPage=()=>{

const [data,error,isLoading]=useFetch('http://127.0.0.1:3000/api/user')

console.log(data)
const roles=['user','admin']
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
              <select className="selectRole" name="" id="">
             {roles.map((user)=>{
                return(
                    <option value="">{user}</option>
                )
             })}
              </select>
              
              </>
            );
          },
        },
      ];


    return(
<div className="settingsPage">
{data&&
<DataGrid

autoHeight={true}
rowHeight={40}
getRowId={(row) => row._id}
rows={data}
columns={columns}
pageSize={10}
rowsPerPageOptions={[10]}
checkboxSelection={false}
disableSelectionOnClick
/>
}
</div>

    )
}