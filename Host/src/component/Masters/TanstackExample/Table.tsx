import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchClient,
} from "../../../redux/Slices/Client/clientSlice";
import { isEmpty, kebabCase, keys, startCase } from "lodash";

import Tableback from "../Table/Tableback";
import { ColumnDef } from "@tanstack/react-table";
import { Box, Container } from "@mui/material";

const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error, limit, skip } = useAppSelector(
    (state) => state.client
  );

  const [column, setColumn] = useState<ColumnDef<any>[]>([]);

  const fetchClientList = async () => {
    dispatch(fetchClient({ limit, skip }));
  };

  useEffect(() => {
    if (!isEmpty(clients)) {
      let primaryColumn = keys(clients?.[0])?.map((e) => ({
        header: startCase(kebabCase(e)),
        accessorKey: e,
      }));

      const column = primaryColumn.map((cols) => {
        if (cols.accessorKey === "password") {
          return {
            header: "Password",
            accessorKey: "password",
            cell: (row: any) => {
              return (
               row.getValue()
              );
            },
          }
        };

        return cols;
      });

      setColumn(column);
    }
  }, [clients]);

  useEffect(() => {
    fetchClientList();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 20vh);",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          my: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tableback
         data={clients} 
         columns={column} 
         pagination
         pageCount={limit}
         skip={skip}
         />       
      </Container>
    </Box>
  );
};

export default Table;
