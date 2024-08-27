import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { addMasterData } from "../Country/countrySlice";

export interface State {
  id?: number;
  country_name?: string;
  state_name?: string;
  // isApiData?: boolean,
}
export interface StatesState {
  states: State[];
  loading: boolean;
  error: string | null;
}
const initialState: StatesState = {
  states: [],
  loading: false,
  error: null,
};

// define slice with what action to be perform and state to handle
export const stateSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    fetchState: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchStateSuccess: (state, action: PayloadAction<State[]>) => {
      // const data = action.payload?.map((item: State, index: number) => ({
      //   id: index + 1,
      //   ...item,
      // }));
      const data = action.payload;
      state.loading = false;
      addMasterData(data, "State");
      state.states = data;
    },
    fetchStateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addState: (state, action: PayloadAction<State>) => {
      state.states?.push({
        id: state.states.length + 1,
        country_name: action.payload?.country_name,
        state_name: action.payload?.state_name,
        // isApiData: false,
      });

      state.loading = false;
      addMasterData(state.states, "State");
    },
    updateState: (state, action: PayloadAction<State>) => {
      const { id, ...updatedFields } = action.payload;
      const index = state.states.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.states[index] = {
          ...state.states[index],
          ...updatedFields,
        };

        state.loading = false;
        addMasterData(state.states, "State");
      }
    },
    deleteState: (state, action: PayloadAction<State>) => {
      const id = action.payload.id;
      const data = state.states?.filter((item) => item.id != id);

      state.loading = false;
      state.states = data;
      addMasterData(state.states, "State");
    },
  },
});

//export reducers of slice
export default stateSlice.reducer;

//export actions of slice
export const {
  fetchState,
  fetchStateSuccess,
  fetchStateFailure,
  addState,
  updateState,
  deleteState,
} = stateSlice.actions;
