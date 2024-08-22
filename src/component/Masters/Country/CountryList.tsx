import React, { useEffect, useState } from "react";
import { getToken } from "../../../assets/CommonApi/countryToken";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  Country,
  deleteCountry,
  fetchCountry,
  fetchCountrySuccess,
  getMasterData,
} from "../../../redux/Slices/Country/countrySlice";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import TableList from "../../TableList";
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CellProps, Column } from "react-table";

interface Columns {
  Header: string;
  accessor: string;
  Cell?: ({ row }: CellProps<Country>) => JSX.Element;
}

const CountryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const Countries = getMasterData("master")?.Country;
  const { countries, loading, error } = useAppSelector(
    (state) => state.country
  );
  const [columns, setColumns] = useState<Column<Country>[]>([]);

  const fetchCountryList = async () => {
    dispatch(fetchCountry());
  };

  const fetchToken = async () => {
    const token = await getToken();
    if (token) {
      sessionStorage.setItem("apitoken", token?.auth_token);
    }
  };

  useEffect(() => {
    if (!isEmpty(countries)) {
      const primaryColumns = keys(countries?.[0])?.map((e) => ({
        Header: startCase(kebabCase(e)),
        accessor: e,
      }));

      const columns = [
        ...primaryColumns,
        {
          Header: "Action",
          accessor: "action",
          Cell: ({ row }: CellProps<Country>) => (
            <div className="actionIcons">
              <span>
                <Edit
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/countryUpdates", {
                      state: { currentType: "edit", id: row.original.id },
                    })
                  }}
                />
              </span>
              <span>
                <Delete
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteCountry({ id: row.original.id }));
                  }}
                />
              </span>
            </div>
          ),
        },
      ];
      setColumns(columns);
    }
  }, [countries]); //, Countries, dispatch

  useEffect(() => {
    const getApiToken =  sessionStorage.getItem("apitoken");
    if (!getApiToken) {
      fetchToken();
    }

    if (!isEmpty(Countries)) {
      dispatch(fetchCountrySuccess(Countries));
      return;
    }

    // if (!getApiToken) {
    //   fetchToken();
    // }
    fetchCountryList();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Country List</h3>
          <Button
            color="success"
            variant="outlined"
            onClick={() =>
              navigate("/dashboard/countryUpdates", {
                state: { currentType: "add" },
              })
            }
          >
            <Add />
            Add New Country
          </Button>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 1, my: 4 }}>
            {!isEmpty(countries) || !isEmpty(Countries) ? (
              <TableList columns={columns} data={countries || Countries} />
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
