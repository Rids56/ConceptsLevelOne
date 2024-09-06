import { Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import '../../../assets/styles/tableback.less'

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: boolean;
  pageCount: number;
  skip: number;
}

const Tableback = <T,>(props: TableProps<T>) => {
  const {
    data,
    columns,
    pageCount= 50,
    pagination= true,
    skip=0,
  } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount,
  });

  const handlePageChange = () => {

  }

  return (
    <>
      <Paper>
        <Table className={"tanstackTable"}>
          {/* Header Part */}
          <TableHead className={"tanstackTableHead"}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {/* Body Part */}
          <TableBody className={"tanstackTableBody"}>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>


        </Table>
        {pagination && pageCount &&
          (<Pagination count={pageCount} page={Math.floor(skip / pageCount) + 1} onChange={handlePageChange} />)
        }
      </Paper>
    </>
  );
};

export default Tableback;
