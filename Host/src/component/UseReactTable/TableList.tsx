import { useTable, useSortBy, Column } from 'react-table';
import '../../assets/styles/tablestyle.less'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Define the props for the Table component
interface TableListProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

// Table Component
const TableList = <T extends object>({ columns, data }: TableListProps<T>) => {
  // Define the table instance with typing
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>({ columns, data }, useSortBy);

  return (
    <>
      <table {...getTableProps()} className='tableContainer'>
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {/* {console.log('column',column, column?.isSorted, column?.isSortedDesc)} */}
                  {column.render('Header')}
                  <span>
                    {column?.isSorted ?
                      (column?.isSortedDesc ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      ))
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      borderBottom: 'solid 1px #c6c6c6',
                      // background: 'papayawhip',
                    }}
                    key={cell.column.id}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableList;
