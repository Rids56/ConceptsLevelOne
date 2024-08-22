import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  State,
  deleteState,
  fetchState,
  fetchStateSuccess,
} from "../../../redux/Slices/State/stateSlice";
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

interface Columns {
  Header: string;
  accessor: string;
  Cell?: ({ row }: CellProps<State>) => JSX.Element;
}

const StateList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const history = useLocation();
  const updateHistory = history?.state;
  const StatesMaster = getMasterData("master")?.State;
  const CountryMaster = getMasterData("master")?.Country;
  const { states, loading, error } = useAppSelector((state) => state.state);
  const [columns, setColumns] = useState<Column<State>[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof selectedCountry>) => {
    setSelectedCountry(event.target.value);
  };

  const fetchStateList = async () => {
    dispatch(fetchState(selectedCountry));
  };

  useEffect(() => {
    if (!isEmpty(states)) {
      const primaryColumns = keys(states?.[0])?.map((e) => ({
        Header: startCase(kebabCase(e)),
        accessor: e,
      }));

      const newColumns = [
        ...primaryColumns,
        {
          Header: "Action",
          accessor: "action",
          Cell: ({ row }: CellProps<State>) => (
            <div className="actionIcons">
              <span>
                <Edit
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/stateUpdates", {
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
                    dispatch(deleteState({ id: row.original.id }));
                  }}
                />
              </span>
            </div>
          ),
        },
      ];
      setColumns(newColumns);
    }
  }, [states]);

  useEffect(() => {
    setSelectedCountry(updateHistory?.selectedCountry || "United StatesMaster");

    if (!isEmpty(StatesMaster)) {
      dispatch(fetchStateSuccess(StatesMaster));
      return;
    }

    fetchStateList();
  }, []);

  useEffect(() => {
    // updateHistory only contains edit id
    if (
      !isEmpty(StatesMaster) &&
      updateHistory?.selectedCountry === selectedCountry
    ) {
      dispatch(fetchStateSuccess(StatesMaster));
      return;
    }

    fetchStateList();
  }, [selectedCountry]);

  return (
    <>
      <Container maxWidth="xl">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>State List</h3>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Country</InputLabel>
              <Select
                value={selectedCountry}
                input={<OutlinedInput label="Name" />}
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
                {CountryMaster?.map((item: Country) => (
                  <MenuItem key={item.id} value={item.country_name}>
                    {item.country_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              color="success"
              variant="outlined"
              onClick={() =>
                navigate("/dashboard/stateUpdates", {
                  state: { currentType: "add" },
                })
              }
            >
              <Add />
              Add New State
            </Button>
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 1, my: 4 }}>
            {!isEmpty(states) ? (
              <TableList columns={columns} data={states} />
            ) : (
              <div>No Data Found</div>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default StateList;
