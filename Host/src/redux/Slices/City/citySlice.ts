import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { addMasterData } from "../Country/countrySlice";

export interface City {
  id?: number;
  country_name?: string;
  state_name?: string;
  city_name?: string;
  // isApiData?: boolean,
}
export interface CitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
}
const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

// define slice with what action to be perform and state to handle
export const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    fetchCity: (state, action: PayloadAction<City>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCitySuccess: (state, action: PayloadAction<City[]>) => {
      const data = action.payload;
      addMasterData(data, "City");
      state.cities = data;
      state.loading = false;
    },
    fetchCityFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCity: (state, action: PayloadAction<City>) => {
      state.cities?.push({
        id: state.cities?.length + 1,
        country_name: action.payload?.country_name,
        state_name: action.payload?.state_name,
        city_name: action.payload?.city_name,
      });
      addMasterData(state.cities, "City");
      state.loading = false;
    },
    updateCity: (state, action: PayloadAction<City>) => {
      const { id, ...updatedFields } = action.payload;
      const index = state.cities.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cities[index] = {
          ...state.cities[index],
          ...updatedFields,
        };

        state.loading = false;
        addMasterData(state.cities, "City");
      }
    },
    deleteCity: (state, action: PayloadAction<City>) => {
      const id = action.payload.id;
      const data = state.cities?.filter((item) => item.id != id);

      state.loading = false;
      state.cities = data;
      addMasterData(state.cities, "City");
    },
  },
});

//export reducers of slice
export default citySlice.reducer;

//export actions of slice
export const {
  fetchCity,
  fetchCitySuccess,
  fetchCityFailure,
  addCity,
  updateCity,
  deleteCity,
} = citySlice.actions;
