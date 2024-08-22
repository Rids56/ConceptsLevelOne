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
import TableList from "../../TableList";
import { isEmpty, kebabCase, keys, startCase } from "lodash";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { CellProps, Column } from "react-table";
import {
  Country,
  getMasterData,
} from "../../../redux/Slices/Country/countrySlice";
import {
  City,
  deleteCity,
  fetchCity,
  fetchCitySuccess,
} from "../../../redux/Slices/City/citySlice";
import { State } from "../../../redux/Slices/State/stateSlice";

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
  const CityMaster = getMasterData("master")?.City;
  const CountryMaster = getMasterData("master")?.Country;
  const StateMaster = getMasterData("master")?.State;
  const { cities, loading, error } = useAppSelector((state) => state.city);
  const [columns, setColumns] = useState<Column<City>[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof selectedCountry>) => {
    setSelectedState(event.target.value);
  };

  const fetchCityList = async () => {
    dispatch(
      fetchCity({ state_name: selectedState, country_name: selectedCountry })
    );
  };

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
                        selectedCountry,
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

  useEffect(() => {
    setSelectedCountry(
      updateHistory?.selectedCountry || CountryMaster?.[0]?.country_name
    );
    setSelectedState(
      updateHistory?.selectedState || StateMaster?.[0]?.state_name
    );

    if (!isEmpty(CityMaster)) {
      dispatch(fetchCitySuccess(CityMaster));
      return;
    }

    fetchCityList();
  }, []);

  useEffect(() => {
    if (!isEmpty(CityMaster)) {
      dispatch(fetchCitySuccess(CityMaster));
      return;
    }

    fetchCityList();
  }, [selectedCountry, selectedState]);

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
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 50 * 4.5 + 10,
                      width: 250,
                      overflow: "scroll",
                    },
                  },
                }}
                // disabled={true}
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
                onChange={handleChange}
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
                  state: { currentType: "add" },
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
