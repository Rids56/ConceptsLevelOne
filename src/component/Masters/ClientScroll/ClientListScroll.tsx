import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, CircularProgress, Container } from "@mui/material";
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { Column } from "react-table";
import TableList from "../../UseReactTable/TableList";
import { ClientScroll, fetchClientStart } from "../../../redux/Slices/Client/clientScrollSlice";

const ClientListScroll: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clientscroll, loading, error, limit, total, skip } = useAppSelector(
    (state) => state.clientscroll
  );
  const [columns, setColumns] = useState<Column<ClientScroll>[]>([]);

  const fetchClientList = async (newSkip: 0) => {
    dispatch(fetchClientStart({ limit: 20, skip: newSkip }));
  };

  useEffect(() => {
    (total === 0) && fetchClientList(0);
  }, []);

  useEffect(() => {
    if (!isEmpty(clientscroll)) {
      const columns = keys(clientscroll?.[0])?.map((e) => ({
        Header: startCase(kebabCase(e)),
        accessor: e,
      }));

      setColumns(columns);
    }
  }, [clientscroll]);

  //Infinite scroll start
  const handleScroll = () => {
    if (
      (window.innerHeight + window.scrollY >= document.body.scrollHeight) && !loading && (clientscroll.length < total)
    ) {
      fetchClientList(skip + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [clientscroll, loading, skip, limit, total]);
   //Infinite scroll end 

  return (
    <>
      <Container maxWidth="xl" >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Client List</h3>
        </div>

        {loading && (
          <Box sx={{ width: 'auto', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="error" />
            <CircularProgress color="warning" />
            <CircularProgress color="success" />
          </Box>
        )}

        <Box sx={{ width: 1, my: 2 }} >
          {!isEmpty(clientscroll) ? (
            <>
              <TableList columns={columns} data={clientscroll} />
              {loading && (
                <Box sx={{ width: 'auto', display: 'flex', justifyContent: 'start', my: 2 }}>
                  <h4>Fetching data .........</h4>
                  <CircularProgress color="error" />
                  <CircularProgress color="warning" />
                  <CircularProgress color="success" />
                </Box>
              )}
            </>
          ) : (
            <>
              {!loading && (<div>No Data Found</div>)}
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ClientListScroll;
