import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  Client,
  // deleteClient,
  fetchClient,
} from "../../../redux/Slices/Client/clientSlice";
import { Box, CircularProgress, Container } from "@mui/material";
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { Column } from "react-table";
import TableList from "../../UseReactTable/TableList";
import BottomBar from "../../BottomBar";

const ClientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error, limit, total, skip } = useAppSelector(
    (state) => state.client
  );
  const [columns, setColumns] = useState<Column<Client>[]>([]);

  const fetchClientList = async () => {
    dispatch(fetchClient({ limit, skip }));
  };

  useEffect(() => {
    if (!isEmpty(clients)) {
      const columns = keys(clients?.[0])?.map((e) => ({
        Header: startCase(kebabCase(e)),
        accessor: e,
      }));

      setColumns(columns);
    }
  }, [clients]);

  useEffect(() => {
    fetchClientList();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 20vh);',
        width: '100%',
      }}
    >
      <Container maxWidth="xl"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          my: 2,
          // py: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Client List</h3>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 1, my: 2 }} >
            {!isEmpty(clients) ? (
              <TableList columns={columns} data={clients} />
            ) : (
              <div>No Data Found</div>
            )}
          </Box>
        )}
      </Container>
      <BottomBar />
    </Box>
  );
};

export default ClientList;
