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
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CellProps, Column } from "react-table";
import { isNotEmpty } from "../../utils";
import TableList from "../../UseReactTable/TableList";

export const fetchToken = async () => {
  const token = await getToken();
  if (isNotEmpty(token)) {
    sessionStorage.setItem("apitoken", token?.auth_token);
  }
};

const CountryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const CountryMaster = getMasterData("master")?.Country;
  const { countries, loading, error } = useAppSelector(
    (state) => state.country
  );
  const [columns, setColumns] = useState<Column<Country>[]>([]);

  const fetchCountryList = async () => {
    dispatch(fetchCountry());
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
                    });
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
  }, [countries]); //, CountryMaster, dispatch

  useEffect(() => {
    const getApiToken = sessionStorage.getItem("apitoken");
    if (isEmpty(getApiToken)) {
      fetchToken();
    }

    if (!isEmpty(CountryMaster)) {
      dispatch(fetchCountrySuccess(CountryMaster));
      return;
    }

    fetchCountryList();
  }, []);

  return (
    <>
      <Container maxWidth="xl" >
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
          <Box sx={{ width: 1, my: 2 }} >
            {!isEmpty(countries) || !isEmpty(CountryMaster) ? (
              <TableList columns={columns} data={countries || CountryMaster} />
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
