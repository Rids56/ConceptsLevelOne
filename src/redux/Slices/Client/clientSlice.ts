import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMasterData } from "../Country/countrySlice";

export interface Client {
  id?: number;
  firstName?: string;
  maidenName?: string;
  lastName?: string;
  username?: string;
  password?: number;
  limit?: number;
  skip?: number;
  page?: number;
  total?: number;
}

export interface ClientState {
  [x: string]: unknown;
  users: [];
  clients: Client[];
  loading: boolean;
  error: string | null;
  limit: number;
  skip: number;
  total: number;
}
const initialState: ClientState = {
  users: [],
  clients: [],
  loading: false,
  error: null,
  limit: 50,
  skip: 0,
  total: 0,
  page: 1,
};

// define slice with what action to be perform and state to handle
export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    fetchClient: (state, action: PayloadAction<Client>) => {
      state.loading = true;
      state.error = null;
    },
    fetchClientSuccess: (state, action: PayloadAction<ClientState>) => {
      const response = action.payload;

      const data = response?.users?.map((item: Client) => ({
        id: item.id,
        firstName: item.firstName,
        maidenName: item.maidenName,
        lastName: item.lastName,
        username: item.username,
        password: item.password,
      }));

      state.loading = false;
      addMasterData(data, "Client");
      state.clients = data;
      state.limit = action.payload.limit;
      state.skip = action.payload.skip;
      state.total = action.payload.total;
    },
    fetchClientFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//export reducers of slice
export default clientSlice.reducer;

//export actions of slice
export const { fetchClient, fetchClientSuccess, fetchClientFailure } =
  clientSlice.actions;
