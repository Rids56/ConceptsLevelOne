import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Country {
  id?: number;
  country_name: string;
  country_short_name: string;
  country_phone_code: number;
}
export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}
const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const addMasterData = (value: unknown, key: string) => {
  // Step 1: Retrieve existing 'master' from session storage
  const master = sessionStorage.getItem("master");
  let masterObj;

  if (master) {
    // Parse the existing 'master' object
    masterObj = JSON.parse(master);
  } else {
    // If 'master' does not exist, initialize it as an empty object
    masterObj = {};
  }

  // Step 2: Update the 'Country' array in the 'master' object
  masterObj[key] = value;

  // Step 3: Store the updated 'master' object back in session storage
  sessionStorage.setItem("master", JSON.stringify(masterObj));
};

export const getMasterData = (key: string) => {
  // Step 1: Retrieve existing 'master' from session storage
  const master = sessionStorage.getItem(key);
  let masterObj;

  if (master) {
    // Parse the existing 'master' object
    masterObj = JSON.parse(master);
  } else {
    // If 'master' does not exist, initialize it as an empty object
    masterObj = {};
  }
  return masterObj;
};

// define slice with what action to be perform and state to handle
export const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    fetchCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCountrySuccess: (state, action: PayloadAction<Country[]>) => {
      const data = action.payload?.map((item: Country, index: number) => ({
        id: index + 1,
        ...item,
      }));

      state.loading = false;
      addMasterData(data, "Country");
      state.countries = data;
    },
    fetchCountryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCountry: (state, action: PayloadAction<Country>) => {
      state.countries?.push({
        id: state.countries.length + 1,
        country_name: action.payload?.country_name,
        country_short_name: action.payload.country_short_name,
        country_phone_code: action.payload.country_phone_code,
      });

      state.loading = false;
      addMasterData(state.countries, "Country");
    },
    updateCountry: (state, action: PayloadAction<Country>) => {
      const { id, ...updatedFields } = action.payload;

      const index = state.countries.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.countries[index] = {
          ...state.countries[index],
          ...updatedFields,
        };

        state.loading = false;
        addMasterData(state.countries, "Country");
      }
    },
    deleteCountry: (state, action: PayloadAction<Country>) => {
      const id = action.payload.id;
      const data = state.countries?.filter((item) => item.id != id);
      state.countries = data;
    },
  },
});

//export reducers of slice
export default countrySlice.reducer;

//export actions of slice
export const {
  fetchCountry,
  fetchCountrySuccess,
  fetchCountryFailure,
  addCountry,
  updateCountry,
  deleteCountry,
} = countrySlice.actions;
