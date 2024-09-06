<!-- Basic structure of tanstack table -->
<!-- https://dev.to/serhatgenc/creating-a-reusable-table-component-with-react-table-and-material-ui-10jd -->
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";

interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
}

const Tableback: React.FC<TableProps> = ({ data, columns, ...props }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Paper>
        <Table>
          {/* Header Part */}
          <TableHead>
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
          <TableBody>
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
      </Paper>
    </>
  );
};

export default Tableback;
