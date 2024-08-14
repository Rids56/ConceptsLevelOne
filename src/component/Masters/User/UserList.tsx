import { Box, Container } from '@mui/material'
import TableList from '../../TableList'
import { useAppSelector } from '../../../redux/hooks';
import { isEmpty } from 'lodash';
import { Column } from 'react-table';
import { useState } from 'react';
import { User } from '../../../redux/Slices/User/userSlice';

const userData: User[] = [];
const userColumns: Column<User>[] = [
  {
    Header: 'Sr.no',
    accessor: 'id',
  },
  {
    Header: 'Full Name',
    accessor: 'fullName',
  },
  {
    Header: 'User Name',
    accessor: 'userName',
  },
  {
    Header: 'Password',
    accessor: 'password',
  },
];

export const UserList = () => {
  const userlist = useAppSelector(state => state.user.users) || [];
  const [userData, setUserData] = useState(userlist);

  return (
    <>
      <Container maxWidth="xl">
        <h3>User List</h3>
        <Box sx={{ width: 1, my: 4 }}>
          {
            !isEmpty(userData) ? (
              <TableList
                columns={userColumns}
                data={userData}
              />
            ) : (
              <div>No Data Found</div>
            )
          }
        </Box>
      </Container>


    </>
  )
}