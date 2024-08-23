import { TablePagination } from '@mui/material';
import React, { useEffect } from 'react'
import { fetchClient } from '../../redux/Slices/Client/clientSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

type Props = {
  limit: number;
  skip: number;
  total: number;
  page?: number;
}

const Pagination = (props: Props) => {
  const { limit, skip, total } = useAppSelector(state => state.client);
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(limit);

  useEffect(() => {
    dispatch(fetchClient({ limit: rowsPerPage, skip: rowsPerPage * page , page }))
  }, [page, rowsPerPage])


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page} // arrow handle
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{ color: 'white', fontWeight: '500' }}
    />
  );
}

export default Pagination;