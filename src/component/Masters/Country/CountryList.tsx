import React, { useEffect, useState } from "react";
import { getToken } from "../../../assets/CommonApi/countryToken";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchCountry } from "../../../redux/Slices/Country/countrySlice";
import { Box, CircularProgress, Container } from "@mui/material";
import TableList from "../../TableList";
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { AddCircle, Delete, Edit } from "@mui/icons-material";

const CountryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector(
    (state) => state.country
  );
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchCountryList = async () => {
    console.log("error", error);
    dispatch(fetchCountry());
  };

  const fetchToken = async () => {
    const token = await getToken();
    if (token) {
      sessionStorage.setItem("apitoken", token?.auth_token);
    }
  };

  useEffect(() => {
    const primaryColumns = keys(countries?.[0])?.map((e) => ({
      Header: startCase(kebabCase(e)),
      accessor: e,
    }));

    const columns = [
      ...primaryColumns,
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="actionIcons">
            <span>
              <AddCircle />
            </span>
            <span>
              <Edit />
            </span>
            <span>
              <Delete />
            </span>
          </div>
        ),
      },
    ];

    setColumns(columns);
    setData(countries);
  }, [countries, dispatch]);

  useEffect(() => {
    const getApiToken = sessionStorage.getItem("apitoken");
    if (!getApiToken) {
      fetchToken();
    }
    fetchCountryList();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <h3>Country List</h3>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 1, my: 4 }}>
            {!isEmpty(data) ? (
              <TableList columns={columns} data={data} />
            ) : (
              <div>No Data Found</div>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default CountryList;
