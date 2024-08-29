import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { CellProps, Column } from "react-table";
import {
  Country,
  fetchCountry,
  getMasterData,
} from "../../../redux/Slices/Country/countrySlice";
import {
  City,
  deleteCity,
  fetchCity,
} from "../../../redux/Slices/City/citySlice";
import { fetchState, State } from "../../../redux/Slices/State/stateSlice";
import TableList from "../../UseReactTable/TableList";
import { fetchToken } from "../Country/CountryList";

// interface Columns {
//   Header: string;
//   accessor: string;
//   Cell?: ({ row }: CellProps<City>) => JSX.Element;
// }

const CityList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const history = useLocation();
  const updateHistory = history?.state;
  const CountryMaster = getMasterData("master")?.Country || [];
  const StateMaster = getMasterData("master")?.State || [];
  const { cities, loading, error } = useAppSelector((state) => state.city);
  const { states } = useAppSelector((state) => state.state);
  const [columns, setColumns] = useState<Column<City>[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  useEffect(() => {
    const getApiToken = sessionStorage.getItem("apitoken");
    if (isEmpty(getApiToken)) {
      fetchToken();
    }

    if (isEmpty(CountryMaster)) {
      dispatch(fetchCountry());
    } else if (isEmpty(StateMaster)) {
      setSelectedCountry(CountryMaster?.[0]?.country_name);
      dispatch(fetchState(CountryMaster?.[0]?.country_name));
    }

    setSelectedCountry(CountryMaster?.[0]?.country_name);
    setSelectedState(StateMaster?.[0]?.state_name);

    fetchCityList();

  }, [])

  useEffect(() => {
    setSelectedState(StateMaster?.[0]?.state_name);
  }, [states])  

  useEffect(() => {
    // if(updateHistory?.selectedCountry === selectedCountry || updateHistory?.selectedState === selectedState) return;
    if(updateHistory?.selectedState === selectedState) return;
      
    fetchCityList();
  }, [selectedState]);

  useEffect(() => {
    if (!isEmpty(cities)) {
      const primaryColumns = keys(cities?.[0])?.map((e) => ({
        Header: startCase(kebabCase(e)),
        accessor: e,
      }));

      const newColumns = [
        ...primaryColumns,
        {
          Header: "Action",
          accessor: "action",
          Cell: ({ row }: CellProps<City>) => (
            <div className="actionIcons">
              <span>
                <Edit
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/cityUpdates", {
                      state: {
                        currentType: "edit",
                        id: row.original.id,
                        selectedCountry, selectedState
                      },
                    });
                  }}
                />
              </span>
              <span>
                <Delete
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteCity({ id: row.original.id }));
                  }}
                />
              </span>
            </div>
          ),
        },
      ];
      setColumns(newColumns);
    }
  }, [cities]);

  const handleChangeState = (event: SelectChangeEvent<typeof selectedState>) => {
    setSelectedState(event.target.value);
  };

  const handleChangeCountry = (event: SelectChangeEvent<typeof selectedCountry>) => {
    setSelectedCountry(event.target.value);
    dispatch(fetchState(event.target.value));
  };

  const fetchCityList = async () => {
    dispatch(
      fetchCity({ state_name: selectedState, country_name: selectedCountry })
    );
  };

  return (
    <>
      <Container maxWidth="xl">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>City List</h3>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Country</InputLabel>
              <Select
                value={selectedCountry}
                input={<OutlinedInput label="Country" />}
                onChange={handleChangeCountry}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 50 * 4.5 + 10,
                      width: 250,
                      overflow: "scroll",
                    },
                  },
                }}
              >
                {CountryMaster?.map((item: Country) => (
                  <MenuItem key={item.id} value={item.country_name}>
                    {item.country_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-name-label">State</InputLabel>
              <Select
                value={selectedState}
                input={<OutlinedInput label="State" />}
                onChange={handleChangeState}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 50 * 4.5 + 10,
                      width: 250,
                      overflow: "scroll",
                    },
                  },
                }}
              >
                {StateMaster?.map((item: State) => (
                  <MenuItem key={item.id} value={item.state_name}>
                    {item.state_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              color="success"
              variant="outlined"
              onClick={() =>
                navigate("/dashboard/cityUpdates", {
                  state: { currentType: "add", selectedCountry, selectedState },
                })
              }
            >
              <Add />
              Add New City
            </Button>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 1, my: 4 }}>
            {!isEmpty(cities) ? (
              <TableList columns={columns} data={cities} />
            ) : (
              <div>No Data Found</div>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default CityList;
