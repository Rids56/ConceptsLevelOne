import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMasterData } from "../Country/countrySlice";

export interface ClientScroll {
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

export interface ClientScrollState {
  [x: string]: unknown;
  users: [];
  clientscroll: ClientScroll[];
  loading: boolean;
  error: string | null;
  limit: number;
  skip: number;
  total: number;
}
const initialState: ClientScrollState = {
  users: [],
  clientscroll: [],
  loading: false,
  error: null,
  limit: 50,
  skip: 0,
  total: 0,
  page: 1,
};

// define slice with what action to be perform and state to handle
export const clientScrollSlice = createSlice({
  name: "clientscroll",
  initialState,
  reducers: {
    fetchClientStart: (state, action: PayloadAction<ClientScroll>) => {
      state.loading = true;
      state.error = null;
    },
    fetchClientScrollSuccess: (state, action: PayloadAction<ClientScrollState>) => {
      const response = action.payload;

      const data = response?.users?.map((item: ClientScroll) => ({
        id: item.id,
        firstName: item.firstName,
        maidenName: item.maidenName,
        lastName: item.lastName,
        username: item.username,
        password: item.password,
      }));      
      
      state.loading = false;
      addMasterData(data, "ClientScroll");

      state.clientscroll = [ ...state.clientscroll, ...data];
      state.limit = action.payload.limit;
      state.skip = action.payload.skip;
      state.total = action.payload.total;
    },
    fetchClientScrollFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },   
  },
});

//export reducers of slice
export default clientScrollSlice.reducer;

//export actions of slice
export const {
  fetchClientStart,
  fetchClientScrollSuccess,
  fetchClientScrollFailure,
} = clientScrollSlice.actions;