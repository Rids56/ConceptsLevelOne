import { Box, Button, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { isEmpty } from "lodash";
import { Column } from "react-table";
import { deleteUser, User } from "../../../redux/Slices/User/userSlice";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TableList from "../../UseReactTable/TableList";

export const UserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userlist = useAppSelector((state) => state.user.users) || [];
  const userColumns: Column<User>[] = [
    {
      Header: "Sr.no",
      accessor: "id",
    },
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "User Name",
      accessor: "userName",
    },
    {
      Header: "Password",
      accessor: "password",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="actionIcons">
          <span>
            <Edit
              style={{ cursor: "pointer" }}
              onClick={() => navigate('/dashboard/userUpdates', { state: { currentType: 'edit', id: row.original.id } })}
            />
          </span>
          <span>
            <Delete
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(deleteUser({ id: row.original.id }))
              }}
            />
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>User List</h3>
          <Button color="success" variant='outlined' onClick={() => navigate('/dashboard/userUpdates', { state: { currentType: 'add' } })}>
            <Add />Add New User
          </Button>
        </div>

        <Box sx={{ width: 1, my: 4 }}>
          {!isEmpty(userlist) ? (
            <TableList columns={userColumns} data={userlist} />
          ) : (
            <div>No Data Found</div>
          )}
        </Box>
      </Container >
    </>
  );
};
