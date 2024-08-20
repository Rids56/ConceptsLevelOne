import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CountryState {
    countries: [];
    loading: boolean;
    error: string | null;
}

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
}

// define slice with what action to be perform and state to handle
export const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        fetchCountry: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCountrySuccess: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.countries = action.payload;
        },
        fetchCountryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

//export reducers of slice
export default countrySlice.reducer;

//export actions of slice
export const { fetchCountry, fetchCountrySuccess, fetchCountryFailure } = countrySlice.actions;