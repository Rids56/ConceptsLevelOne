import TablePagination from '@mui/material/TablePagination';

interface TablebackPaginationProps {
    page: number;
    rowsPerPage: number;
    count: number;
    handleChangePage: React.MouseEvent | null;
    handleChangeRowsPerPage: React.ChangeEvent;
}

export default function TablebackPagination(props: TablebackPaginationProps) {

    const {
        page = 1,
        rowsPerPage = 10,
        count = 100,
        handleChangePage,
        handleChangeRowsPerPage,
    } = props;
    //   const [page, setPage] = React.useState(1);
    //   const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //   const handleChangePage = (
    //     event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number,
    //   ) => {
    //     setPage(newPage);
    //   };

    //   const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    //   ) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    //   };

    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
